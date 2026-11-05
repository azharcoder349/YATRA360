/**
 * Intelligent Rule-Based Trip Planner Engine
 * 
 * Generates structured, realistic itineraries with real destination context,
 * approximate travel times, authentic regional food suggestions, and clear budget breakdowns.
 */

import { INITIAL_DESTINATIONS } from '../data/destinations';

export function generateRuleBasedItinerary({
  startCity = 'Jaipur',
  destinationArea = 'Nearby Heritage & Nature',
  timeAvailable = 'full-day', // 'half-day', 'full-day', 'weekend'
  budgetLevel = 'moderate',   // 'budget', 'moderate', 'heritage'
  interests = ['temples', 'historical'],
  travelStyle = 'culture-seeker'
}) {
  const isWeekend = timeAvailable === 'weekend' || timeAvailable === '3-days';
  const isHalfDay = timeAvailable === 'half-day';

  // Filter relevant gems based on interest or general quality
  const relevantGems = INITIAL_DESTINATIONS.filter(d => 
    interests.includes(d.category) || d.status === 'verified'
  );

  // Pick suitable anchor destinations
  const anchor1 = relevantGems[0] || INITIAL_DESTINATIONS[0];
  const anchor2 = relevantGems[1] || INITIAL_DESTINATIONS[1];
  const anchor3 = relevantGems[2] || INITIAL_DESTINATIONS[2];

  // Budget calculations
  const budgetPresets = {
    budget: { base: 800, food: 350, travel: 400, guide: 200, tierName: 'Budget Backpacker' },
    moderate: { base: 2200, food: 850, travel: 1100, guide: 500, tierName: 'Comfort Explorer' },
    heritage: { base: 4500, food: 1600, travel: 2200, guide: 1200, tierName: 'Heritage Immersion' }
  };
  const multiplier = isWeekend ? 2.5 : isHalfDay ? 0.6 : 1.0;
  const currentBudget = budgetPresets[budgetLevel] || budgetPresets.moderate;

  const totalCost = Math.round((currentBudget.base * multiplier) / 50) * 50;
  const travelCost = Math.round((currentBudget.travel * multiplier) / 50) * 50;
  const foodCost = Math.round((currentBudget.food * multiplier) / 50) * 50;
  const entryCost = Math.round((currentBudget.guide * multiplier) / 50) * 50;
  const bufferCost = totalCost - travelCost - foodCost - entryCost;

  // Build timeline stops
  const stops = [];

  // Morning stop
  stops.push({
    order: 1,
    time: '08:00 AM – 10:30 AM',
    phase: 'Morning Discovery',
    title: `Heritage Walk & Discovery at ${anchor1.name}`,
    location: `${anchor1.city}, ${anchor1.district}`,
    duration: '2.5 Hours',
    distanceNote: `~25–40 km drive from ${startCity}`,
    whatToDo: `Arrive early to beat the daytime heat. Walk through the main courtyards, study the stone relief carvings, and converse with local caretakers.`,
    whySpecial: anchor1.whySpecial,
    foodRecommendation: `Morning breakfast at a village spot: fresh hot Kachori, Poha, or Idli with piping hot Masala Chai.`,
    estimatedCost: '₹50–₹100 (Snacks & Parking)',
    destinationRef: anchor1.id
  });

  // Midday / Cultural stop
  if (!isHalfDay) {
    stops.push({
      order: 2,
      time: '11:15 AM – 01:30 PM',
      phase: 'Living Culture & Artisans',
      title: `Artisan Cluster & Architecture at ${anchor2.name}`,
      location: `${anchor2.city}, ${anchor2.district}`,
      duration: '2 Hours',
      distanceNote: `~35 km scenic countryside transit`,
      whatToDo: `Witness traditional craftsmanship, marvel at ancient rainwater or stone-cutting techniques, and document folk architectural details.`,
      whySpecial: anchor2.whySpecial,
      foodRecommendation: `Traditional lunch: ${anchor2.localFood || 'Authentic regional thali featuring locally grown seasonal produce and home-churned ghee.'}`,
      estimatedCost: '₹250–₹400 per person for an authentic regional thali',
      destinationRef: anchor2.id
    });

    // Afternoon relaxation & tea
    stops.push({
      order: 3,
      time: '02:30 PM – 04:30 PM',
      phase: 'Afternoon Immersion',
      title: 'Local Bazaars, Stepwells & Community Encounters',
      location: `${anchor1.city} Rural Market Outskirts`,
      duration: '1.5 Hours',
      distanceNote: '~10 km local transit',
      whatToDo: 'Meet local elder storytellers, sample regional sweet delicacies, and support women-led self-help handicraft stalls.',
      whySpecial: 'Direct financial support to rural makers with no commercial platform middlemen.',
      foodRecommendation: 'Fresh sugarcane juice or buttermilk (Chaas) with roasted cumin seeds.',
      estimatedCost: '₹150 (Handmade souvenirs & refreshments)',
      destinationRef: null
    });
  }

  // Evening / Golden hour
  stops.push({
    order: stops.length + 1,
    time: '05:00 PM – 06:45 PM',
    phase: 'Sunset & Cultural Reflection',
    title: `Golden Hour Solitude at ${anchor3.name}`,
    location: `${anchor3.city}, ${anchor3.state}`,
    duration: '1.5 Hours',
    distanceNote: '~20 km transit towards return route',
    whatToDo: 'Watch the evening shadows lengthen across ancient stone spires or natural cliff edges. Participate respectfully if evening conch Aarti is underway.',
    whySpecial: anchor3.whySpecial,
    foodRecommendation: `Sunset refreshment: ${anchor3.localFood?.split(',')[0] || 'Local roasted spiced snacks'} with ginger tea.`,
    estimatedCost: 'Free / ₹30 tea stall',
    destinationRef: anchor3.id
  });

  return {
    id: `plan-${Date.now()}`,
    title: `Curated ${timeAvailable === 'weekend' ? 'Weekend Escape' : 'Hidden Journey'} from ${startCity}`,
    subtitle: `Customized for ${travelStyle} travelers passionate about ${interests.join(' & ')}`,
    generatedBy: 'ExploreLocal Intelligent Rule Engine (Offline & Private)',
    isAiFallback: true,
    engine: 'rule_based',
    parameters: {
      startCity,
      destinationArea,
      timeAvailable,
      budgetLevel,
      interests,
      travelStyle
    },
    summary: `This thoughtful itinerary prioritizes authentic cultural immersion and tranquility over commercial tourist herds. By exploring ${anchor1.name} and ${anchor2.name}, you directly support rural heritage caretakers and experience historical engineering wonders at their peaceful best.`,
    stops,
    budgetBreakdown: {
      tier: currentBudget.tierName,
      totalEstimated: totalCost,
      transportation: travelCost,
      foodAndBeverages: foodCost,
      ticketsAndGuides: entryCost,
      souvenirsAndBuffer: Math.max(100, bufferCost),
      currency: 'INR (₹)',
      disclaimer: 'Estimates are based on average local transportation (shared cab/carpool or private compact car) and authentic local eatery pricing.'
    },
    localFoodHighlights: [
      anchor1.localFood,
      anchor2.localFood,
      'Ask roadside tea stalls for local jaggery snacks or regional clay-cup (kulhad) chai.'
    ].filter(Boolean),
    responsibleTravelTips: [
      'Dress respectfully when visiting ancient sanctums or village living areas.',
      'Carry a reusable water flask to prevent plastic pollution at delicate heritage spots.',
      'Purchase handicrafts directly from the maker rather than commercial highway showrooms.',
      'Ask permission with a smile before photographing local residents or artisans in their workspaces.'
    ]
  };
}

