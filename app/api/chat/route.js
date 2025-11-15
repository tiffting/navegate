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
    
    return Response.json({
      response: text,
      timestamp: new Date().toISOString(),
      metadata: {
        listingReferences,
        categories: inferCategoriesFromMessage(message)
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

  const formatListing = (listing) => `
${listing.name} (${listing.category}, Score: ${listing.safetyScore.score}/100)
- Location: ${listing.location.address}
- Safety signals: ${formatSignals(listing.safetyScore.signals)}
- Key reviews: ${listing.safetyScore.citations.slice(0, 2).join(' | ')}`;

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

  return `You are VeganBnB's AI Travel Assistant, specializing in complete vegan travel planning across restaurants, accommodations, tours, and events.

CONTEXT DATABASE:
${context}

CONVERSATION HISTORY:
${conversationHistory}

USER MESSAGE: ${message}

INSTRUCTIONS:
1. Provide comprehensive travel recommendations across ALL relevant categories
2. Always mention safety scores and explain why they matter for vegan travelers
3. Reference specific listings from the database when making recommendations
4. Include category-specific safety insights using HUMAN-READABLE terms:
   - For restaurants: "cross-contamination prevention", "staff knowledge", "ingredient transparency"
   - For accommodations: "kitchen safety", "vegan breakfast quality", "bedding materials" 
   - For tours: "guide expertise", "meal handling", "group dynamics"
   - For events: "food quality", "accessibility", "community atmosphere"
5. Be conversational and helpful, like a knowledgeable local vegan friend
6. For trip planning requests, suggest combinations across categories (accommodation + restaurants + activities)
7. Always explain the reasoning behind recommendations using safety signals with proper names (not code names)
8. Keep responses focused on Berlin (our current database)

RESPONSE STYLE:
- Conversational and enthusiastic about vegan travel
- Include specific safety scores in parentheses
- Mention key safety signals that matter for each category
- Use proper markdown formatting with **bold**, bullet points, and headings
- Structure responses clearly with sections for different categories
- Offer follow-up suggestions

FORMAT YOUR RESPONSE WITH MARKDOWN:
- Use **bold** for venue names and safety scores
- Use bullet points for lists of recommendations
- Use ## for section headers (e.g., ## Accommodations, ## Restaurants)
- Use - for bullet points and numbered lists where appropriate

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

function inferCategoriesFromMessage(message) {
  // Infer which categories the user is asking about
  const categories = [];
  const lower = message.toLowerCase();
  
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