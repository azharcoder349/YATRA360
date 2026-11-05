/**
 * Local Explorer AI — Intelligent Conversational Knowledge Base
 * 
 * Provides rich, factual, culturally respectful guidance without requiring an external API key.
 */

import { INITIAL_DESTINATIONS } from '../data/destinations';

export function queryRuleBasedGuide(userMessage, currentDestination = null) {
  const query = userMessage.toLowerCase().trim();

  // If a destination context is supplied, prioritize destination-specific responses
  if (currentDestination) {
    if (query.includes('history') || query.includes('origin') || query.includes('who built') || query.includes('century')) {
      return {
        reply: `### Historical Background: ${currentDestination.name}\n\n${currentDestination.history}\n\n**Authentic Lore:**\n${currentDestination.story}\n\n*Note: Verified historical details are referenced from ASI and archeological documentation.*`,
        context: currentDestination.name,
        source: 'Verified Heritage Records'
      };
    }

    if (query.includes('special') || query.includes('why visit') || query.includes('unique') || query.includes('hidden')) {
      return {
        reply: `### Why ${currentDestination.name} is Extraordinary\n\n${currentDestination.whySpecial}\n\n${currentDestination.shortDescription}\n\n**Curator's Insight:** Most commercial tours bypass this gem for crowded tourist traps. Visiting here offers serenity, rare photography, and intimate connection with local history.`,
        context: currentDestination.name,
        source: 'Curator Assessment'
      };
    }

    if (query.includes('food') || query.includes('eat') || query.includes('restaurant') || query.includes('dish') || query.includes('cuisine')) {
      return {
        reply: `### Local Flavors Near ${currentDestination.name}\n\n${currentDestination.localFood}\n\n**Traveler Tip:** Seek out small family-run eateries and roadside tea-stalls. Their ingredients are harvested nearby and support local farmers directly.`,
        context: currentDestination.name,
        source: 'Regional Culinary Guide'
      };
    }

    if (query.includes('time') || query.includes('when to visit') || query.includes('season') || query.includes('month') || query.includes('weather')) {
      return {
        reply: `### Best Time & Visiting Hours\n\n- **Recommended Season:** ${currentDestination.bestTimeToVisit}\n- **Opening Timings:** ${currentDestination.timings}\n- **Entry Details:** ${currentDestination.entryFee}\n\n**Pro-Tip:** Arrive at dawn for the most enchanting light and quietest ambiance.`,
        context: currentDestination.name,
        source: 'Visitor Practical Guide'
      };
    }

    if (query.includes('tip') || query.includes('dress') || query.includes('wear') || query.includes('photo') || query.includes('camera') || query.includes('safety')) {
      return {
        reply: `### Responsible Travel Tips for ${currentDestination.name}\n\n` + 
          currentDestination.travelTips.map(t => `- ${t}`).join('\n') + 
          `\n\nRemember: Leave no trace and respect local traditions!`,
        context: currentDestination.name,
        source: 'Field Etiquette Guide'
      };
    }
  }

  // General search in destinations database
  const matchedDest = INITIAL_DESTINATIONS.find(d => 
    query.includes(d.name.toLowerCase()) || 
    query.includes(d.city.toLowerCase()) || 
    query.includes(d.district.toLowerCase())
  );

  if (matchedDest) {
    return {
      reply: `### ${matchedDest.name} (${matchedDest.city}, ${matchedDest.state})\n\n**${matchedDest.tagline}**\n\n${matchedDest.shortDescription}\n\n- **Why It's Special:** ${matchedDest.whySpecial}\n- **Best Season:** ${matchedDest.bestTimeToVisit}\n- **Local Delicacy:** ${matchedDest.localFood}\n\nWould you like more details on its history, travel tips, or navigation?`,
      context: matchedDest.name,
      source: 'ExploreLocal Curated Database'
    };
  }

  // Thematic queries
  if (query.includes('temple') || query.includes('shrine') || query.includes('spiritual')) {
    return {
      reply: `### Sacred Hidden Temples You Should Discover\n\nIndia has thousands of spiritually profound, lesser-visited temples beyond the bustling pilgrimage hubs:\n\n1. **Lepakshi Veerabhadra Temple** (Andhra Pradesh) — Famous for its hanging stone pillar and monolithic Nandi.\n2. **Bateshwar Temples** (Madhya Pradesh) — A cluster of 200 restored 8th-century Gurjara-Pratihara shrines in Chambal ravines.\n3. **Jageshwar Dham** (Uttarakhand) — 124 ancient Nagara stone shrines sheltered by giant deodar pines.\n\n*Tip: Modest dress covering shoulders and knees is appreciated at all sacred heritage shrines.*`,
      context: 'Temples',
      source: 'Spiritual Heritage'
    };
  }

  if (query.includes('stepwell') || query.includes('baori') || query.includes('water')) {
    return {
      reply: `### The Genius of Ancient Stepwells (Baoris)\n\nStepwells were not just water reservoirs; they were subterranean social sanctuaries and marvels of mathematical engineering:\n\n- **Chand Baori (Abhaneri, Rajasthan)** is among the deepest in the world with 3,500 geometric steps across 13 tiers.\n- They kept surrounding subterranean temperatures 5–6°C cooler than the searing desert heat above.\n- When visiting, notice the stone cooling corridors and carved deities meant to bless the water.`,
      context: 'Stepwells & Water Architecture',
      source: 'Hydraulic Heritage'
    };
  }

  if (query.includes('near me') || query.includes('nearby') || query.includes('location') || query.includes('gps')) {
    return {
      reply: `### Finding Gems Near You\n\nYou can click the **"Explore Near Me"** button at the top of the page! We use your browser's Geolocation API to calculate exact distances to hidden destinations.\n\nIf you prefer not to share GPS coordinates, you can also select one of our city presets (such as Pune, Jaipur, Bengaluru, or Almora) from the dropdown on the Near Me page.`,
      context: 'Geolocation',
      source: 'Navigation Assistance'
    };
  }

  if (query.includes('contribute') || query.includes('add') || query.includes('submit') || query.includes('my village')) {
    return {
      reply: `### Become a Local Heritage Contributor\n\nWe would love your help! You can submit hidden spots from your hometown using the **"Add Hidden Gem"** button in the navigation bar.\n\nEvery submission is preserved in your local session and marked as **"Pending Verification"** so travelers know it's a fresh community discovery awaiting archival review. Help put your local culture on the map!`,
      context: 'Community Contribution',
      source: 'Community Portal'
    };
  }

  // Default helpful response
  return {
    reply: `Hello! I am **Local Explorer AI**, your companion for uncovering India's lesser-known cultural treasures, sacred temples, stepwells, crater lakes, and living artisan villages.\n\nHere are some questions you can ask me:\n- *"What is special about the hanging pillar at Lepakshi?"*\n- *"Tell me the history of Chand Baori stepwell."*\n- *"Which hidden destinations can I visit near Pune or Jaipur?"*\n- *"What local dishes should I try in Bundelkhand or Kumaon?"*\n- *"What is the best season to see the flamingos at Bhigwan?"*`,
    context: 'General Guide',
    source: 'ExploreLocal Assistant'
  };
}

