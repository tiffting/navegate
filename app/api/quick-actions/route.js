import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { lastMessage, conversationHistory = [] } = await request.json();

    // Input validation
    if (!lastMessage || typeof lastMessage.content !== 'string') {
      return Response.json({ error: "Last message is required" }, { status: 400 });
    }

    // Build prompt for AI to generate contextual quick actions
    const prompt = buildQuickActionsPrompt(lastMessage, conversationHistory);
    
    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract suggestions
    const suggestions = parseQuickActionResponse(text);

    return Response.json({
      suggestions,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Quick actions API error:', error);
    
    // Return fallback suggestions on error
    const fallbackSuggestions = getFallbackSuggestions(lastMessage?.content);
    
    return Response.json({
      suggestions: fallbackSuggestions,
      timestamp: new Date().toISOString(),
      fallback: true
    });
  }
}

function buildQuickActionsPrompt(lastMessage, conversationHistory) {
  const recentHistory = conversationHistory.slice(-3).map(msg => 
    `${msg.role}: ${msg.content}`
  ).join('\n');

  return `You are generating contextual quick action suggestions for a vegan travel chatbot conversation.

CONVERSATION CONTEXT:
${recentHistory}

LAST AI MESSAGE: ${lastMessage.content}

TASK: Generate 4 short, actionable follow-up questions/requests that a user would naturally want to ask next.

GUIDELINES:
- Each suggestion should be 2-6 words maximum
- Focus on the next logical step in trip planning
- If AI mentioned specific venues, suggest booking/logistics questions
- If AI gave general advice, suggest more specific requests
- If AI covered one category (restaurants), suggest other categories (hotels, tours, events)
- For city responses, suggest trip details (dates, interests)
- For comprehensive trip plans, suggest refinement (timing, booking, alternatives)

EXAMPLES OF GOOD SUGGESTIONS:
- "When should I book this?"
- "Any nearby hotels?"
- "What about tours?"
- "I'm also gluten-free"
- "Plan my 3-day itinerary"
- "Berlin"

EXAMPLES OF BAD SUGGESTIONS:
- "Tell me more about this topic in detail"
- "I'm planning a weekend trip next month"
- "What else do you recommend for travelers?"

Return exactly 4 suggestions, one per line, no quotes, no numbering, no explanations.`;
}

function parseQuickActionResponse(text) {
  // Split by lines and clean up
  const lines = text.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .filter(line => !line.match(/^\d+[\.\)]/)) // Remove numbered items
    .filter(line => !line.startsWith('-')) // Remove bullet points
    .map(line => line.replace(/^["']|["']$/g, '')) // Remove quotes
    .slice(0, 4); // Take first 4 suggestions

  // If we don't have exactly 4, pad with generic suggestions
  while (lines.length < 4) {
    const fallbacks = [
      "Tell me more about this",
      "What else do you recommend?", 
      "Any budget-friendly options?",
      "Plan my complete itinerary"
    ];
    lines.push(fallbacks[lines.length - 1] || fallbacks[3]);
  }

  return lines;
}

function getFallbackSuggestions(lastMessageContent = '') {
  const content = lastMessageContent.toLowerCase();
  
  // Welcome message fallback - offer popular cities
  if (content.includes('which city') || content.includes('planning to visit')) {
    return ["Berlin", "Paris", "Amsterdam", "Barcelona"];
  }
  
  // City-based fallbacks
  if (content.includes('berlin') && content.includes('planning')) {
    return ["I'm going next month", "Planning a weekend trip", "I need restaurants and hotels", "What about food tours?"];
  }
  
  // Restaurant-focused fallbacks
  if (content.includes('restaurant') || content.includes('dining') || content.includes('kopps')) {
    return ["What about accommodations?", "Any nearby hotels?", "Show me food tours", "I'm also gluten-free"];
  }
  
  // Accommodation-focused fallbacks
  if (content.includes('accommodation') || content.includes('hotel') || content.includes('hostel')) {
    return ["What restaurants are nearby?", "Any walking tours?", "Show me local events", "What's the nightlife like?"];
  }
  
  // Tour-focused fallbacks
  if (content.includes('tour') || content.includes('guide')) {
    return ["When should I book this?", "What else is in that area?", "Any evening tours?", "Where should I stay nearby?"];
  }
  
  // Event-focused fallbacks
  if (content.includes('event') || content.includes('market')) {
    return ["What time should I arrive?", "Any restaurants near there?", "Where should I stay nearby?", "Other events this weekend?"];
  }
  
  // Default fallbacks
  return [
    "Tell me more about this",
    "What else do you recommend?", 
    "Any budget-friendly options?",
    "Plan my complete itinerary"
  ];
}