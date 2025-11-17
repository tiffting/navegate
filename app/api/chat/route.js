import { getAICompletion, getAIProviderInfo } from "../../../lib/ai-config.js";
import { mockListings, getListingsByCategory, getHighScoringListings } from "../../../lib/mock-data.js";

export async function POST(request) {
  try {
    const { message, chatHistory = [], userPreferences = null } = await request.json();

    // Debug logging for preferences
    console.log('🔍 Chat API Request:', {
      message: message.substring(0, 50) + '...',
      hasUserPreferences: !!userPreferences,
      preferenceKeys: userPreferences ? Object.keys(userPreferences) : 'none'
    });

    // Input validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // --- Handle Smart Interview Process ---
    const interviewResponse = await handleSmartInterview(message, chatHistory);

    if (interviewResponse) {
      return Response.json({
        response: interviewResponse.reply,
        timestamp: new Date().toISOString(),
        metadata: {
          interviewState: interviewResponse.interviewState,
          finalPreferences: interviewResponse.finalPreferences,
          // Other metadata can be added here if needed for interview responses
        }
      });
    }
    // --- End Smart Interview Process ---

    // Get context from all listings for RAG-style responses
    const context = buildTravelContext();
    
    // Build conversation prompt with context injection and user preferences
    const prompt = buildChatPrompt(message, chatHistory, context, userPreferences);
    
    // Try AI API first, fallback to hardcoded responses for development
    let text;
    try {
      const aiInfo = getAIProviderInfo();
      console.log(`Using ${aiInfo.provider} (${aiInfo.model}) for chat completion`);
      
      text = await getAICompletion({
        systemPrompt: "You are VeganBnB's AI Travel Assistant, specializing in complete vegan travel planning across restaurants, accommodations, tours, and events.",
        userPrompt: prompt,
        maxTokens: 1000,
        temperature: 0.7,
      });
    } catch (error) {
      console.log('AI API unavailable, using fallback response:', error.message);
      // Fallback to hardcoded responses for development
      text = generateFallbackResponse(message, chatHistory);
    }

    // Parse response and extract any listing references
    const listingReferences = extractListingReferences(text);
    
    const cityInfo = detectCityMention(message);
    
    return Response.json({
      response: text,
      timestamp: new Date().toISOString(),
      metadata: {
        listingReferences,
        categories: inferCategoriesFromMessage(message),
        cityMention: cityInfo.city,
        hasDataForCity: cityInfo.hasData
      }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: "Failed to process chat message" }, 
      { status: 500 }
    );
  }
}

// ... (existing imports) ...

const INTERVIEW_QUESTIONS = [
  {
    key: 'tripPreferences.travelDates',
    question: "Great! To start planning your trip, what are your travel dates (start and end)?",
    parse: (message) => message
  },
  {
    key: 'budgetRange',
    question: "What's your approximate budget range for this trip? (€, €€, €€€, or any)?",
    parse: (message) => {
      const lower = message.toLowerCase();
      if (lower.includes('€€€') || lower.includes('luxury')) return '€€€';
      if (lower.includes('€€') || lower.includes('mid-range')) return '€€';
      if (lower.includes('€') || lower.includes('budget')) return '€';
      return 'any';
    }
  },
  {
    key: 'eatingPreferences.style',
    question: "Tell me about your eating style: are you a 'foodie' (exploring unique dishes), 'casual' (easygoing meals), or 'efficient' (quick bites)?",
    parse: (message) => {
      const lower = message.toLowerCase();
      if (lower.includes('foodie')) return 'foodie';
      if (lower.includes('casual')) return 'casual';
      if (lower.includes('efficient')) return 'efficient';
      return null;
    }
  },
  {
    key: 'eatingPreferences.includeBreakfast',
    question: "Do you typically include breakfast in your travel plans? (yes/no)",
    parse: (message) => {
      const lower = message.toLowerCase();
      if (lower.includes('yes')) return true;
      if (lower.includes('no')) return false;
      return null;
    }
  },
  {
    key: 'mobilityPreferences.transportModes',
    question: "How do you prefer to get around? You can list multiple options (e.g., walking, public transit, taxi).",
    parse: (message) => {
      const modes = [];
      const lower = message.toLowerCase();
      if (lower.includes('walk')) modes.push('walking');
      if (lower.includes('public transit') || lower.includes('bus') || lower.includes('train') || lower.includes('metro') || lower.includes('subway') || lower.includes('transit')) modes.push('public_transit');
      if (lower.includes('taxi') || lower.includes('uber') || lower.includes('ride-share') || lower.includes('ride')) modes.push('taxi');
      return modes.length > 0 ? modes : null;
    }
  },
  {
    key: 'mobilityPreferences.wheelchairAccessible',
    question: "Is wheelchair accessibility a requirement for your trip? (yes/no)",
    parse: (message) => {
      const lower = message.toLowerCase();
      if (lower.includes('yes')) return true;
      if (lower.includes('no')) return false;
      return null;
    }
  },
  {
    key: 'tripPreferences.planningStyle',
    question: "Do you prefer a 'structured' itinerary with everything planned, or a more 'flexible' approach?",
    parse: (message) => {
      const lower = message.toLowerCase();
      if (lower.includes('structured') || lower.includes('planned') || lower.includes('organized')) return 'structured';
      if (lower.includes('flexible') || lower.includes('flex') || lower.includes('spontaneous') || lower.includes('loose')) return 'flexible';
      return null;
    }
  },
  {
    key: 'dietaryRestrictions',
    question: "Do you have any specific dietary restrictions beyond veganism (e.g., gluten-free, nut-free)? If so, please list them.",
    parse: (message) => {
      const lower = message.toLowerCase();
      if (lower === 'no' || lower === 'none') return [];
      return message.split(',').map(item => item.trim());
    }
  }
];

// Helper to set nested properties
function setNestedProperty(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

async function handleSmartInterview(message, chatHistory) {
  // Force reset for new sessions - check if this is the very first message
  if (message === "__AUTO_START__" && chatHistory.length === 0) {
    // Clear all interview state for new session
    if (typeof global.interviewStates !== 'undefined') {
      global.interviewStates.clear();
    }
    
    const freshState = {
      inProgress: true,
      currentQuestionIndex: 0,
      collectedPreferences: {}
    };
    saveInterviewState(freshState);
    
    return {
      reply: `Welcome to VeganBnB! Let me learn about your travel style so I can provide the best personalized recommendations.\n\n${INTERVIEW_QUESTIONS[0].question}\n\n*You can type "skip" anytime to continue without the interview.*`,
      interviewState: freshState
    };
  }

  // Get interview state from localStorage or initialize
  let interviewState = getInterviewState();

  // Check if we should start a new interview
  if (shouldStartInterview(message, chatHistory)) {
    // Clear any corrupted state and start fresh
    if (typeof global.interviewStates !== 'undefined') {
      global.interviewStates.clear();
    }
    
    // Reset state completely for fresh session
    interviewState = {
      inProgress: true,
      currentQuestionIndex: 0,
      collectedPreferences: {}
    };
    saveInterviewState(interviewState);
    return {
      reply: `Welcome to VeganBnB! Let me learn about your travel style so I can provide the best personalized recommendations.\n\n${INTERVIEW_QUESTIONS[0].question}\n\n*You can type "skip" anytime to continue without the interview.*`,
      interviewState: interviewState
    };
  }

  // Check for skip command
  if (interviewState.inProgress && message.toLowerCase().includes('skip')) {
    interviewState.inProgress = false;
    saveInterviewState(interviewState);
    return {
      reply: "No problem! You can always tell me your preferences as we chat. Which city would you like to explore?\n\n**Currently I have comprehensive data for Berlin** (restaurants, accommodations, tours, events with safety scores). I can also provide general guidance for other cities.",
      interviewState: interviewState
    };
  }

  // If an interview is in progress, process the answer and ask the next question
  if (interviewState.inProgress) {
    // Skip processing for auto-start trigger
    if (message !== "__AUTO_START__") {
      // Process the current answer
      const currentQuestion = INTERVIEW_QUESTIONS[interviewState.currentQuestionIndex];
      const parsedAnswer = currentQuestion.parse(message);

      if (parsedAnswer !== null) {
        setNestedProperty(interviewState.collectedPreferences, currentQuestion.key, parsedAnswer);
        interviewState.currentQuestionIndex++;
        saveInterviewState(interviewState);
      } else {
        // If parsing failed, re-ask the current question
        return {
          reply: `I didn't quite understand your answer. ${currentQuestion.question}`,
          interviewState: interviewState
        };
      }

      // Check if we've completed all questions
      if (interviewState.currentQuestionIndex >= INTERVIEW_QUESTIONS.length) {
        // Interview complete
        interviewState.inProgress = false;
        saveInterviewState(interviewState);
        return {
          reply: `Perfect! I've learned about your travel style. Now, which city would you like to explore?\n\n**Currently I have comprehensive data for Berlin** (restaurants, accommodations, tours, events with safety scores). I can also provide general guidance for other cities, though my detailed recommendations focus on Berlin as our demo.`,
          interviewState: interviewState,
          finalPreferences: interviewState.collectedPreferences
        };
      }

      // Ask the next question
      const nextQuestion = INTERVIEW_QUESTIONS[interviewState.currentQuestionIndex];
      return {
        reply: nextQuestion.question,
        interviewState: interviewState
      };
    }
  }

  return null; // No interview action
}

function buildTravelContext() {
  // Create comprehensive context from all categories for RAG
  const restaurants = getListingsByCategory('restaurant');
  const accommodations = getListingsByCategory('accommodation');
  const tours = getListingsByCategory('tour');
  const events = getListingsByCategory('event');
  
  const signalLabels = {
    // Restaurant signals
    cross_contamination: "Cross-contamination Prevention",
    staff_knowledge: "Staff Knowledge", 
    ingredient_transparency: "Ingredient Transparency",
    community_trust: "Community Trust",
    
    // Accommodation signals
    kitchen_safety: "Kitchen Safety",
    bedding: "Bedding Materials",
    breakfast_quality: "Vegan Breakfast Quality",
    host_knowledge: "Host Knowledge",
    
    // Tour signals
    guide_expertise: "Guide Expertise",
    meal_handling: "Meal Handling",
    hidden_exploitation: "Hidden Animal Exploitation Prevention", 
    group_dynamics: "Group Dynamics",
    
    // Event signals
    food_quality: "Food Quality",
    accessibility: "Accessibility",
    community_vibe: "Community Atmosphere",
    inclusivity: "Inclusivity"
  };

  const formatSignals = (signals) => {
    return Object.entries(signals)
      .map(([key, value]) => `${signalLabels[key] || key}: ${value}`)
      .join(', ');
  };

  const formatListing = (listing) => {
    let logisticsInfo = '';
    
    if (listing.logistics) {
      switch (listing.category) {
        case 'restaurant':
          logisticsInfo = `
- Hours: ${listing.logistics.hours?.tuesday || 'Varies'} (Tue-Thu), ${listing.logistics.hours?.weekend || 'Check website'}
- Booking: ${listing.logistics.booking?.required ? 'Required' : 'Walk-in OK'} - ${listing.logistics.booking?.methods?.[0]?.note || 'Online booking available'}
- Website: ${listing.website}
- Price range: ${listing.logistics.pricing?.range} (${listing.logistics.pricing?.average_meal})`;
          break;
        case 'accommodation':
          logisticsInfo = `
- Check-in: ${listing.logistics.check_in?.time}, Check-out: ${listing.logistics.check_out}
- Booking: ${listing.logistics.booking?.methods?.[0]?.note || 'Online booking'} - ${listing.logistics.booking?.cancellation}
- Website: ${listing.website}
- Pricing: ${listing.logistics.pricing?.dorm_bed || listing.logistics.pricing?.standard_room || 'Check website'}`;
          break;
        case 'tour':
          logisticsInfo = `
- Schedule: ${listing.logistics.schedule?.days} at ${listing.logistics.schedule?.time} (${listing.logistics.schedule?.duration})
- Meeting: ${listing.logistics.schedule?.meeting_point}
- Website: ${listing.website}
- Booking: ${listing.logistics.booking?.advance_notice} - ${listing.logistics.pricing?.adult}`;
          break;
        case 'event':
          logisticsInfo = `
- Schedule: ${listing.logistics.schedule?.frequency} at ${listing.logistics.schedule?.time}
- Next dates: ${listing.logistics.next_dates?.slice(0, 2).join(', ') || 'Check website'}
- Website: ${listing.website}
- Entry: ${listing.logistics.entry?.cost} - Transit: ${listing.logistics.location_details?.nearest_transit}`;
          break;
      }
    }
    
    return `
${listing.name} (${listing.category}, Score: ${listing.safetyScore.score}/100)
- Location: ${listing.location.address}${logisticsInfo}
- Safety signals: ${formatSignals(listing.safetyScore.signals)}
- Key reviews: ${listing.safetyScore.citations.slice(0, 2).join(' | ')}`;
  };

  return `
BERLIN VEGAN TRAVEL DATABASE:

RESTAURANTS:
${restaurants.map(formatListing).join('\n')}

ACCOMMODATIONS:
${accommodations.map(formatListing).join('\n')}

TOURS:
${tours.map(formatListing).join('\n')}

EVENTS:
${events.map(formatListing).join('\n')}

HIGH-SCORING RECOMMENDATIONS (85+ safety score):
${getHighScoringListings(85).map(l => `${l.name} (${l.category}: ${l.safetyScore.score}/100)`).join(', ')}
`;
}

function buildChatPrompt(message, chatHistory, context, userPreferences) {
  const conversationHistory = chatHistory.length > 0 
    ? chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')
    : '';

  // Get current date for proper context
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Build user preferences context
  let userPreferencesContext = '';
  if (userPreferences) {
    userPreferencesContext = `
USER PREFERENCES (from smart interview - DO NOT RE-ASK these questions):
• Budget: ${userPreferences.budgetRange !== "any" ? userPreferences.budgetRange : "No specific budget preference"}
• Eating style: ${userPreferences.eatingPreferences?.style || "Not specified"}
• Breakfast planning: ${userPreferences.eatingPreferences?.includeBreakfast ? "Yes, include breakfast recommendations" : "Skip breakfast"}
• Transport preferences: ${userPreferences.mobilityPreferences?.transportModes?.join(", ") || "Not specified"}
• Wheelchair accessible: ${userPreferences.mobilityPreferences?.wheelchairAccessible ? "Required" : "Not required"}
• Planning style: ${userPreferences.tripPreferences?.planningStyle || "Not specified"}
• Travel dates: ${userPreferences.tripPreferences?.travelDates || "Not specified"}
• Dietary restrictions: ${userPreferences.dietaryRestrictions?.length > 0 ? userPreferences.dietaryRestrictions.join(", ") : "None beyond veganism"}

IMPORTANT: User has already provided these preferences. Reference them naturally and DO NOT ask for this information again.
`;
  }

  return `You are VeganBnB's AI Travel Assistant, specializing in complete vegan travel planning across restaurants, accommodations, tours, and events.

CURRENT DATE: ${formattedDate} (${currentYear})
IMPORTANT: When users mention dates, assume they mean ${currentYear} unless explicitly stated otherwise.
${userPreferencesContext}
CONTEXT DATABASE:
${context}

CONVERSATION HISTORY:
${conversationHistory}

USER MESSAGE: ${message}

CORE REQUIREMENTS:
• USE EXISTING PREFERENCES: When user mentions a city, reference their known preferences instead of re-asking. Only ask for clarification on missing details not covered in USER PREFERENCES section
• MULTI-DAY PLANNING: If travel dates span multiple days OR user mentions duration, create a complete itinerary covering the FULL date range (e.g., "March 15-18" = 4 days of planning)
• Provide ACTIONABLE recommendations with complete logistics: hours, booking methods, pricing, transit
• Always include safety scores (0-100) with explanations using human-readable signal names
• Prioritize online/email booking (eSIM-friendly, English-available options)
• Be solution-oriented with scheduling - find combinations when possible, not limitations
• CITY HANDLING: If user mentions Berlin, acknowledge positively and ask follow-up questions. For other cities, acknowledge and redirect to Berlin as demo example
• PROGRESSIVE DISCLOSURE: Start simple, add detail based on user interest

CATEGORY SIGNALS TO REFERENCE:
• Restaurants: cross-contamination prevention, staff knowledge, ingredient transparency
• Accommodations: kitchen safety, vegan breakfast quality, bedding materials
• Tours: guide expertise, meal handling, group dynamics  
• Events: food quality, accessibility, community atmosphere

TONE & FORMAT:
• Professional yet warm, minimal exclamation marks, selective emojis (🎯🕐🌱)
• Markdown: **bold** venue names/scores, proper ## headers with space after hashes, bullet points with -
• Links: Always link to websites using [text](url) format - this opens in new tab for easy access
• Structure: conversational but organized with clear sections
• MARKDOWN FORMATTING RULES: Always use space after # symbols (## Header not ##Header), use - for bullets, **bold** for emphasis, [link text](url) for clickable links

RESPOND:`;
}

function extractListingReferences(responseText) {
  // Extract listing IDs that might be referenced in the response
  // This is a simple implementation - could be enhanced with NLP
  const references = [];
  
  mockListings.forEach(listing => {
    if (responseText.toLowerCase().includes(listing.name.toLowerCase())) {
      references.push(listing.id);
    }
  });
  
  return references;
}

function detectCityMention(message) {
  const lower = message.toLowerCase();
  
  // Check for Berlin mentions
  if (lower.includes('berlin')) {
    return { city: 'Berlin', hasData: true };
  }
  
  // Check for other cities
  const otherCities = ['paris', 'amsterdam', 'barcelona', 'madrid', 'rome', 'london', 'prague', 'vienna'];
  for (const city of otherCities) {
    if (lower.includes(city)) {
      return { 
        city: city.charAt(0).toUpperCase() + city.slice(1), 
        hasData: false 
      };
    }
  }
  
  return { city: null, hasData: false };
}

function inferCategoriesFromMessage(message) {
  // Infer which categories the user is asking about
  const categories = [];
  const lower = message.toLowerCase();
  
  // Check for city mention first
  const cityInfo = detectCityMention(message);
  if (cityInfo.city) {
    categories.push('city_planning');
  }
  
  if (lower.includes('restaurant') || lower.includes('eat') || lower.includes('food') || lower.includes('dinner') || lower.includes('lunch')) {
    categories.push('restaurant');
  }
  if (lower.includes('hotel') || lower.includes('hostel') || lower.includes('stay') || lower.includes('accommodation') || lower.includes('sleep')) {
    categories.push('accommodation');
  }
  if (lower.includes('tour') || lower.includes('guide') || lower.includes('experience') || lower.includes('activity')) {
    categories.push('tour');
  }
  if (lower.includes('event') || lower.includes('market') || lower.includes('meetup') || lower.includes('festival')) {
    categories.push('event');
  }
  if (lower.includes('trip') || lower.includes('plan') || lower.includes('visit') || lower.includes('travel')) {
    categories.push('multiple');
  }
  
  return categories.length > 0 ? categories : ['general'];
}

// Helper functions for interview state management
function getInterviewState() {
  // For server-side, we'll use a simple in-memory store
  // In production, this would be stored in database with user session
  if (typeof global.interviewStates === 'undefined') {
    global.interviewStates = new Map();
  }
  
  // For demo purposes, use a single session key
  const sessionKey = 'demo-session';
  
  if (!global.interviewStates.has(sessionKey)) {
    global.interviewStates.set(sessionKey, {
      inProgress: false,
      currentQuestionIndex: 0,
      collectedPreferences: {}
    });
  }
  
  return global.interviewStates.get(sessionKey);
}

function saveInterviewState(state) {
  // For server-side, we'll use a simple in-memory store
  const sessionKey = 'demo-session';
  
  if (typeof global.interviewStates === 'undefined') {
    global.interviewStates = new Map();
  }
  
  global.interviewStates.set(sessionKey, state);
}

function shouldStartInterview(message, chatHistory) {
  // Don't start interview if already in progress
  const currentState = getInterviewState();
  if (currentState.inProgress) {
    return false;
  }
  
  // Don't start if we just completed an interview
  if (Object.keys(currentState.collectedPreferences).length > 0) {
    return false;
  }
  
  // Start interview immediately on first user message (true onboarding-first)
  // This captures preferences before any city selection or recommendations
  return chatHistory.length === 0 || message === "__AUTO_START__";
}

// Fallback responses for when API is unavailable
function generateFallbackResponse(message) {
  const lower = message.toLowerCase();
  
  // Berlin-specific recommendations
  if (lower.includes('berlin')) {
    return `## 🌱 Perfect! Here are my top vegan recommendations for Berlin:

### 🍽️ **Restaurants**
- **Kopps** (98/100) - Upscale vegan fine dining in Mitte
  - Hours: Wed-Sat 5:30 PM - Late
  - Booking: [kopps-berlin.de](https://kopps-berlin.de/en/) (English available)
  - Price: €45-65 for 4-course menu

### 🏨 **Accommodations**  
- **Michelberger Hotel** (84/100) - Boutique hotel in Friedrichshain
  - Vegan breakfast buffet clearly labeled (€18)
  - Book: [michelbergerhotel.com](https://michelbergerhotel.com/en/)
  - Rate: €120-180/night

### 🚶 **Tours**
- **Berlin Vegan Food Tour** (94/100) - Saturdays 2-6 PM
  - Meeting point: Hackescher Markt
  - Book via [GetYourGuide](https://www.getyourguide.com/berlin-l17/berlin-vegan-food-tour-t408673/) - €65

### 📅 **Events**
- **The Green Market Berlin** (91/100) - First Saturday monthly
  - Location: Boxhagener Platz, 10 AM - 6 PM
  - Free entry, 40+ vegan vendors

Need help planning your specific dates or have other questions?`;
  }
  
  // Trip planning requests
  if (lower.includes('plan') || lower.includes('itinerary') || lower.includes('trip')) {
    return `## 🎯 Perfect! I'd love to help plan your vegan trip.

To give you the best personalized recommendations, could you tell me:

1. **Which city?** (I have comprehensive Berlin data with safety scores)
2. **Travel dates?** 
3. **What interests you most?** (restaurants, accommodations, tours, events)
4. **Budget range?** (€, €€, €€€)

I'll provide actionable recommendations with booking links, hours, and safety scores for each venue!`;
  }
  
  // Restaurant requests
  if (lower.includes('restaurant') || lower.includes('eat') || lower.includes('food')) {
    return `## 🍽️ Great vegan restaurants in Berlin:

**Top Picks:**

1. **Kopps** (98/100) - Fine dining excellence
   - Zero cross-contamination risk, expert staff
   - Book: [kopps-berlin.de](https://kopps-berlin.de/en/)

2. **Michelberger Hotel Restaurant** (84/100) - Creative plant-based dishes  
   - Clear vegan labeling, accommodating staff
   - Walk-in friendly or book online

**Safety Note:** All scores based on cross-contamination prevention, staff knowledge, and ingredient transparency.

Which type of cuisine interests you most?`;
  }
  
  // Default helpful response
  return `## 🌱 Welcome to VeganBnB!

I'm your AI travel assistant specializing in **complete vegan travel planning** across:
- 🍽️ **Restaurants** with safety scores
- 🏨 **Accommodations** with vegan amenities  
- 🚶 **Tours** with expert vegan guides
- 📅 **Events** and markets

**Currently I have comprehensive Berlin data** with actionable logistics (hours, booking, pricing).

What would you like to explore? Try asking:
- "Plan my 3-day Berlin trip"
- "Best vegan restaurants in Berlin"  
- "Vegan-friendly hotels"
- "Food tours and events"

*Note: Demo mode active - full AI responses will return when API access is restored.*`;
}