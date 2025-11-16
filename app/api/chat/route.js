import { GoogleGenerativeAI } from "@google/generative-ai";
import { mockListings, getListingsByCategory, getHighScoringListings } from "../../../lib/mock-data.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { message, chatHistory = [] } = await request.json();

    // Input validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // Get context from all listings for RAG-style responses
    const context = buildTravelContext();
    
    // Build conversation prompt with context injection
    const prompt = buildChatPrompt(message, chatHistory, context);
    
    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

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

function buildChatPrompt(message, chatHistory, context) {
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

  return `You are VeganBnB's AI Travel Assistant, specializing in complete vegan travel planning across restaurants, accommodations, tours, and events.

CURRENT DATE: ${formattedDate} (${currentYear})
IMPORTANT: When users mention dates, assume they mean ${currentYear} unless explicitly stated otherwise.

CONTEXT DATABASE:
${context}

CONVERSATION HISTORY:
${conversationHistory}

USER MESSAGE: ${message}

CORE REQUIREMENTS:
• START CONVERSATIONAL: When user mentions a city, ask about their trip (dates, interests) before overwhelming with listings
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