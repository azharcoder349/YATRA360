/**
 * Gemini AI Integration & Fallback Service
 * 
 * Works with an optional Gemini API Key (from env or user storage)
 * If no key is present or on any network failure, transparently uses the
 * rich deterministic rule-based engine.
 */

import { getStoredApiKey } from './storage';
import { generateRuleBasedItinerary } from './ruleBasedPlanner';
import { queryRuleBasedGuide } from './ruleBasedGuide';

export function getEffectiveApiKey() {
  const customKey = getStoredApiKey();
  if (customKey && customKey.trim().length > 5) {
    return customKey.trim();
  }
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey !== 'your_gemini_api_key_here' && envKey.trim().length > 5) {
    return envKey.trim();
  }
  return null;
}

export function isGeminiKeyConfigured() {
  return Boolean(getEffectiveApiKey());
}

/**
 * Generate AI Trip Itinerary
 */
export async function generateAiItinerary(params) {
  const apiKey = getEffectiveApiKey();

  // If no API key configured, use intelligent rule engine immediately
  if (!apiKey) {
    console.log('[ExploreLocal AI] Running intelligent rule-based itinerary generator (No API key required)');
    const itinerary = generateRuleBasedItinerary(params);
    return itinerary;
  }

  // Attempt live Gemini API call
  try {
    const prompt = `
You are a senior cultural tourism architect and local travel expert for ExploreLocal, an authentic tourism startup.
Generate a structured, authentic travel itinerary in JSON format for the following request:
- Starting City: ${params.startCity || 'Jaipur'}
- Target Area / Theme: ${params.destinationArea || 'Nearby Hidden Cultural Places'}
- Available Time: ${params.timeAvailable || 'full-day'}
- Budget Level: ${params.budgetLevel || 'moderate'}
- Interests: ${(params.interests || []).join(', ')}
- Travel Style: ${params.travelStyle || 'culture-seeker'}

Strict rules:
1. Emphasize lesser-known, offbeat, or culturally profound sites over overcrowded tourist hotspots.
2. Provide real places with accurate geographic context.
3. Suggest authentic regional local food (not generic pizza/burgers).
4. Give realistic time slots and cost breakdowns in INR (₹).

Return ONLY valid JSON matching this schema (no markdown fences, just pure JSON):
{
  "id": "gemini-${Date.now()}",
  "title": "Title of Itinerary",
  "subtitle": "Inspiring subtitle",
  "generatedBy": "Gemini 1.5 Flash AI",
  "isAiFallback": false,
  "engine": "gemini_api",
  "summary": "2-3 sentences overview of the experience",
  "stops": [
    {
      "order": 1,
      "time": "08:00 AM - 10:30 AM",
      "phase": "Morning Discovery",
      "title": "Place Name",
      "location": "Town, District",
      "duration": "2 Hours",
      "distanceNote": "Approx distance from origin",
      "whatToDo": "Specific engaging activity",
      "whySpecial": "What makes this offbeat and memorable",
      "foodRecommendation": "Local breakfast specialty",
      "estimatedCost": "₹100"
    }
  ],
  "budgetBreakdown": {
    "tier": "${params.budgetLevel}",
    "totalEstimated": 2400,
    "transportation": 1000,
    "foodAndBeverages": 800,
    "ticketsAndGuides": 400,
    "souvenirsAndBuffer": 200,
    "currency": "INR (₹)",
    "disclaimer": "Live estimated based on local prevailing rates"
  },
  "localFoodHighlights": ["Dish 1", "Dish 2"],
  "responsibleTravelTips": ["Tip 1", "Tip 2", "Tip 3"]
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('No candidate content returned by Gemini API');
    }

    // Clean JSON response
    const cleanJson = candidateText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/g, '')
      .trim();

    const parsed = JSON.parse(cleanJson);
    parsed.generatedBy = 'Google Gemini 1.5 Flash AI';
    parsed.engine = 'gemini_api';
    parsed.isAiFallback = false;
    return parsed;
  } catch (err) {
    console.warn('[ExploreLocal AI] Gemini API call failed or key invalid, falling back smoothly to rule-based engine:', err.message);
    const fallbackPlan = generateRuleBasedItinerary(params);
    fallbackPlan.fallbackNotice = `Switched to offline rule-based engine (${err.message})`;
    return fallbackPlan;
  }
}

/**
 * Ask Local Guide AI
 */
export async function askLocalGuideAi(messages, currentDestination = null) {
  const apiKey = getEffectiveApiKey();
  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';

  // If no key configured, use rule-based knowledge engine
  if (!apiKey) {
    const result = queryRuleBasedGuide(lastUserMsg, currentDestination);
    return {
      text: result.reply,
      engine: 'rule_based',
      engineLabel: 'ExploreLocal Intelligent Knowledge Base',
      sourceContext: result.source
    };
  }

  // Attempt live Gemini call
  try {
    const destContext = currentDestination ? `
CURRENT DESTINATION IN FOCUS:
- Name: ${currentDestination.name}
- Location: ${currentDestination.city}, ${currentDestination.district}, ${currentDestination.state}
- Category: ${currentDestination.category}
- Summary: ${currentDestination.shortDescription}
- Why Special: ${currentDestination.whySpecial}
- History: ${currentDestination.history}
- Local Folklore: ${currentDestination.story}
- Best Season: ${currentDestination.bestTimeToVisit}
- Timings: ${currentDestination.timings}
- Local Flavors: ${currentDestination.localFood}
` : 'NO SPECIFIC DESTINATION IN FOCUS. Answer about authentic offbeat Indian cultural tourism.';

    const systemPrompt = `
You are "Local Explorer AI", a knowledgeable, warm, and culturally respectful local tourism guide for ExploreLocal.
Your mission is to help travelers discover lesser-known heritage spots, temples, crater lakes, stepwells, and living craft traditions across India.

Rules:
1. Always be welcoming and enthusiastic about local culture and sustainable travel.
2. If the user asks about the destination in focus, use the provided context accurately.
3. Clearly distinguish between verified historical facts and local folklore/legends.
4. Keep replies structured, concise, and easy to read using markdown bullet points and bold highlights.
5. Emphasize respect for local communities, dress codes, and non-intrusive photography.

${destContext}
`;

    // Map conversation messages
    const formattedContents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'Understood. I am ready to assist travelers as the Local Explorer AI with authentic, culturally grounded insights.' }] }
    ];

    // Add recent conversation history (up to last 6 messages)
    const recent = messages.slice(-6);
    for (const msg of recent) {
      formattedContents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: formattedContents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 1000,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API HTTP ${response.status}`);
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      throw new Error('Empty response from Gemini API');
    }

    return {
      text: replyText,
      engine: 'gemini_api',
      engineLabel: 'Google Gemini 1.5 Flash AI',
      sourceContext: currentDestination ? currentDestination.name : 'Gemini Knowledge Base'
    };
  } catch (err) {
    console.warn('[ExploreLocal AI] Guide chat fallback to rule engine:', err.message);
    const result = queryRuleBasedGuide(lastUserMsg, currentDestination);
    return {
      text: result.reply,
      engine: 'rule_based',
      engineLabel: 'ExploreLocal Intelligent Knowledge Base (Fallback)',
      sourceContext: result.source
    };
  }
}

