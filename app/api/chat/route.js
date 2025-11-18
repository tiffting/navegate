import { getAICompletion, getAIProviderInfo } from "../../../lib/ai-config.js";
import { mockListings, getListingsByCategory, getHighScoringListings } from "../../../lib/mock-data.js";
import { getCachedResponse, setCachedResponse, compressChatHistory, estimateTokens } from "../../../lib/token-optimization.js";

export async function POST(request) {
    try {
        const { message, chatHistory = [], userPreferences = null } = await request.json();

        // Debug logging for preferences
        console.log("🔍 Chat API Request:", {
            message: message.substring(0, 50) + "...",
            hasUserPreferences: !!userPreferences,
            preferenceKeys: userPreferences ? Object.keys(userPreferences) : "none",
        });

        // Input validation
        if (!message || typeof message !== "string" || message.trim().length === 0) {
            return Response.json({ error: "Message is required" }, { status: 400 });
        }

        // Check cache first
        const cachedResponse = getCachedResponse(message, userPreferences);
        if (cachedResponse) {
            console.log("📦 Serving cached response for:", message.substring(0, 50));
            return Response.json({
                response: cachedResponse,
                timestamp: new Date().toISOString(),
                metadata: {
                    cached: true,
                    listingReferences: extractListingReferences(cachedResponse),
                    categories: inferCategoriesFromMessage(message),
                },
            });
        }

        // Get context from all listings for RAG-style responses
        const context = buildTravelContext();

        // Optimize chat history for token efficiency
        const optimizedHistory = compressChatHistory(chatHistory);

        // Build conversation prompt with context injection and user preferences
        const prompt = buildChatPrompt(message, optimizedHistory, context, userPreferences);

        // Log token estimation
        const estimatedTokens = estimateTokens(prompt);
        console.log(`📊 Estimated tokens: ${estimatedTokens}`);

        // Try AI API first, fallback to hardcoded responses for development
        let text;
        try {
            const aiInfo = getAIProviderInfo();
            console.log(`Using ${aiInfo.provider} (${aiInfo.model}) for chat completion`);

            text = await getAICompletion({
                systemPrompt:
                    "You are VeganBnB's AI Travel Assistant, specializing in complete vegan travel planning across restaurants, accommodations, tours, and events.",
                userPrompt: prompt,
                maxTokens: 2500,
                temperature: 0.7,
            });

            // Cache successful responses
            setCachedResponse(message, userPreferences, text);
        } catch (error) {
            console.error("AI API error:", error);

            // Check if it's a rate limit error
            if (error.status === 429 || error.code === "rate_limit_exceeded") {
                const aiInfo = getAIProviderInfo();

                // Extract retry information
                const retryAfter = error.headers?.["retry-after"] || error.headers?.get?.("retry-after");
                const retryAfterSeconds = retryAfter ? parseInt(retryAfter) : null;

                // Format retry time in human-readable format
                let retryTimeText = "";
                if (retryAfterSeconds) {
                    const hours = Math.floor(retryAfterSeconds / 3600);
                    const minutes = Math.floor((retryAfterSeconds % 3600) / 60);
                    if (hours > 0) {
                        retryTimeText = `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${minutes > 1 ? "s" : ""}`;
                    } else {
                        retryTimeText = `${minutes} minute${minutes > 1 ? "s" : ""}`;
                    }
                }

                // Development mode suggestions
                const devModeSuggestions =
                    process.env.NODE_ENV === "development"
                        ? "Switch AI providers in your .env.local file:\n\n• Set AI_PROVIDER=openrouter (recommended)\n\n• Set AI_PROVIDER=gemini\n\n• Set AI_PROVIDER=openai (current)"
                        : "";

                return Response.json(
                    {
                        error: "rate_limit",
                        message: `Oops! The ${aiInfo.provider} AI service is taking a break. ${retryTimeText ? `Please try again in ${retryTimeText}.` : "Please try again later."}`,
                        fallbackResponse: generateFallbackResponse(message, chatHistory),
                        devModeSuggestions,
                        metadata: {
                            provider: aiInfo.provider,
                            model: aiInfo.model,
                            retryAfterSeconds,
                        },
                    },
                    { status: 429 },
                );
            }

            // For other errors, use fallback
            console.log("Using fallback response due to error");
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
                hasDataForCity: cityInfo.hasData,
            },
        });
    } catch (error) {
        console.error("Chat API error:", error);
        return Response.json({ error: "Failed to process chat message" }, { status: 500 });
    }
}

function buildTravelContext() {
    // Create comprehensive context from all categories for RAG
    const restaurants = getListingsByCategory("restaurant");
    const accommodations = getListingsByCategory("accommodation");
    const tours = getListingsByCategory("tour");
    const events = getListingsByCategory("event");

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
        inclusivity: "Inclusivity",
    };

    const formatSignals = (signals) => {
        return Object.entries(signals)
            .map(([key, value]) => `${signalLabels[key] || key}: ${value}`)
            .join(", ");
    };

    const formatListing = (listing) => {
        let logisticsInfo = "";

        if (listing.logistics) {
            switch (listing.category) {
                case "restaurant":
                    logisticsInfo = `
- Hours: ${listing.logistics.hours?.tuesday || "Varies"} (Tue-Thu), ${listing.logistics.hours?.weekend || "Check website"}
- Booking: ${listing.logistics.booking?.required ? "Required" : "Walk-in OK"} - ${listing.logistics.booking?.methods?.[0]?.note || "Online booking available"}
- Website: ${listing.website}
- Price range: ${listing.logistics.pricing?.range} (${listing.logistics.pricing?.average_meal})`;
                    break;
                case "accommodation":
                    logisticsInfo = `
- Check-in: ${listing.logistics.check_in?.time}, Check-out: ${listing.logistics.check_out}
- Booking: ${listing.logistics.booking?.methods?.[0]?.note || "Online booking"} - ${listing.logistics.booking?.cancellation}
- Website: ${listing.website}
- Pricing: ${listing.logistics.pricing?.dorm_bed || listing.logistics.pricing?.standard_room || "Check website"}`;
                    break;
                case "tour":
                    logisticsInfo = `
- Schedule: ${listing.logistics.schedule?.days} at ${listing.logistics.schedule?.time} (${listing.logistics.schedule?.duration})
- Meeting: ${listing.logistics.schedule?.meeting_point}
- Website: ${listing.website}
- Booking: ${listing.logistics.booking?.advance_notice} - ${listing.logistics.pricing?.adult}`;
                    break;
                case "event":
                    logisticsInfo = `
- Schedule: ${listing.logistics.schedule?.frequency} at ${listing.logistics.schedule?.time}
- Next dates: ${listing.logistics.next_dates?.slice(0, 2).join(", ") || "Check website"}
- Website: ${listing.website}
- Entry: ${listing.logistics.entry?.cost} - Transit: ${listing.logistics.location_details?.nearest_transit}`;
                    break;
            }
        }

        return `
${listing.name} (${listing.category}, Score: ${listing.safetyScore.score}/100)
- Location: ${listing.location.address}${logisticsInfo}
- Safety signals: ${formatSignals(listing.safetyScore.signals)}
- Key reviews: ${listing.safetyScore.citations.slice(0, 2).join(" | ")}`;
    };

    return `
BERLIN VEGAN TRAVEL DATABASE:

RESTAURANTS:
${restaurants.map(formatListing).join("\n")}

ACCOMMODATIONS:
${accommodations.map(formatListing).join("\n")}

TOURS:
${tours.map(formatListing).join("\n")}

EVENTS:
${events.map(formatListing).join("\n")}

HIGH-SCORING RECOMMENDATIONS (85+ safety score):
${getHighScoringListings(85)
    .map((l) => `${l.name} (${l.category}: ${l.safetyScore.score}/100)`)
    .join(", ")}
`;
}

function buildChatPrompt(message, chatHistory, context, userPreferences) {
    const conversationHistory = chatHistory.length > 0 ? chatHistory.map((msg) => `${msg.role}: ${msg.content}`).join("\n") : "";

    // Get current date for proper context
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Build user preferences context
    let userPreferencesContext = "";
    if (userPreferences) {
        userPreferencesContext = `
USER PREFERENCES (from smart interview - DO NOT RE-ASK these questions):
• Budget: ${userPreferences.budgetRange !== "any" ? userPreferences.budgetRange : "No specific budget preference"}
  - € = Budget accommodations (hostels, budget hotels €25-50/night) ${userPreferences.budgetRange === "€" ? "← USER'S PREFERENCE" : ""}
  - €€ = Mid-range hotels (€50-150/night) ${userPreferences.budgetRange === "€€" ? "← USER'S PREFERENCE" : ""}
  - €€€ = Upscale hotels (€150+/night) ${userPreferences.budgetRange === "€€€" ? "← USER'S PREFERENCE" : ""}
• Eating style: ${userPreferences.eatingPreferences?.style || "Not specified"}
• Breakfast planning: ${userPreferences.eatingPreferences?.includeBreakfast ? "Yes, include breakfast recommendations" : "Skip breakfast"}
• Transport preferences: ${userPreferences.mobilityPreferences?.transportModes?.join(", ") || "Not specified"}
• Wheelchair accessible: ${userPreferences.mobilityPreferences?.wheelchairAccessible ? "Required" : "Not required"}
• Planning style: ${userPreferences.tripPreferences?.planningStyle || "Not specified"}
• Travel dates: ${userPreferences.tripPreferences?.travelDates || "Not specified"}
• Dietary restrictions: ${userPreferences.dietaryRestrictions?.length > 0 ? userPreferences.dietaryRestrictions.join(", ") : "None beyond veganism"}

IMPORTANT: User has already provided these preferences. ALWAYS respect their budget choice for ALL categories:

ACCOMMODATIONS:
- If budget is €, ONLY recommend budget options (€25-50/night)
- If budget is €€, ONLY recommend mid-range options (€50-150/night) 
- If budget is €€€, ONLY recommend upscale options (€150+/night)

RESTAURANTS/DINING:
- If budget is €, ONLY recommend budget dining (€5-15/meal)
- If budget is €€, ONLY recommend mid-range dining (€15-30/meal)
- If budget is €€€, ONLY recommend upscale dining (€30+/meal)

TOURS/ACTIVITIES:
- If budget is €, ONLY recommend budget activities (€0-20)
- If budget is €€, ONLY recommend mid-range activities (€20-50)
- If budget is €€€, ONLY recommend premium activities (€50+)

NEVER suggest options outside their chosen budget tier.

You MAY ask about:
- Preference for famous venues vs hidden gems
- Interest in guided tours vs self-exploration  
- Specific activity interests (markets, museums, nightlife)
These are not captured in preferences and are valid follow-up questions.
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

CURRENT USER MESSAGE: ${message}

CRITICAL: Read the conversation history carefully. If the user has already made a choice (e.g., "I'll go with A&O"), acknowledge it and move to the next step. Don't repeat questions about decisions already made.

CORE REQUIREMENTS:
• USE EXISTING PREFERENCES: When user mentions a city, reference their known preferences instead of re-asking. Only ask for clarification on missing details not covered in USER PREFERENCES section
• PROGRESSIVE PLANNING APPROACH: Break trip planning into focused steps, but TRACK what has been decided:
  1. First, recommend 2-3 accommodation options that match their budget/preferences and ask them to choose
  2. After accommodation is confirmed (user says "I'll go with X"), move directly to dining/activity preferences
  3. Only then create a comprehensive day-by-day itinerary for calendar export
• CONVERSATION FLOW: Pay attention to what the user has already decided. Don't re-ask about choices they've already made
• FOCUSED RESPONSES: Keep each message focused on ONE decision point only:
  - First ask: Restaurant style preference (famous vs hidden gems)
  - Second ask: Tour preference (guided vs self-exploration)  
  - Third ask: Specific activities (markets, museums, etc.)
  - Never ask multiple complex questions in one message
• Provide ACTIONABLE recommendations with complete logistics: hours, booking methods, pricing, transit
• Always include safety scores (0-100) with clear signal names (e.g., "Kitchen Safety: 85", "Cross-contamination: 90") - never label them as "(human-readable)"
• Prioritize online/email booking (eSIM-friendly, English-available options)
• Be solution-oriented with scheduling - find combinations when possible, not limitations
• CITY HANDLING: If user mentions Berlin, acknowledge positively and ask follow-up questions. For other cities, acknowledge and redirect to Berlin as demo example

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
• TABLE FORMATTING: Use markdown tables for structured data like itineraries. Keep tables concise for mobile readability
• RESPONSE LENGTH: Keep responses focused and concise. Use progressive conversation flow:
  - Accommodation selection: Show 2-3 options, ask user to pick one
  - Dining preferences: Confirm restaurant style preferences
  - Final itinerary: Only create comprehensive schedule after all key decisions are made
• ITINERARY EXPORT: Only provide complete day-by-day schedules when user has confirmed their accommodation and dining preferences
• DATE FORMAT: Always match the user's date format exactly (e.g., if they say "19-21 Nov", use "19 Nov", "20 Nov", "21 Nov" - never switch to "Nov 19")

RESPOND:`;
}

function extractListingReferences(responseText) {
    // Extract listing IDs that might be referenced in the response
    // This is a simple implementation - could be enhanced with NLP
    const references = [];

    mockListings.forEach((listing) => {
        if (responseText.toLowerCase().includes(listing.name.toLowerCase())) {
            references.push(listing.id);
        }
    });

    return references;
}

function detectCityMention(message) {
    const lower = message.toLowerCase();

    // Check for Berlin mentions
    if (lower.includes("berlin")) {
        return { city: "Berlin", hasData: true };
    }

    // Check for other cities
    const otherCities = ["paris", "amsterdam", "barcelona", "madrid", "rome", "london", "prague", "vienna"];
    for (const city of otherCities) {
        if (lower.includes(city)) {
            return {
                city: city.charAt(0).toUpperCase() + city.slice(1),
                hasData: false,
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
        categories.push("city_planning");
    }

    if (lower.includes("restaurant") || lower.includes("eat") || lower.includes("food") || lower.includes("dinner") || lower.includes("lunch")) {
        categories.push("restaurant");
    }
    if (lower.includes("hotel") || lower.includes("hostel") || lower.includes("stay") || lower.includes("accommodation") || lower.includes("sleep")) {
        categories.push("accommodation");
    }
    if (lower.includes("tour") || lower.includes("guide") || lower.includes("experience") || lower.includes("activity")) {
        categories.push("tour");
    }
    if (lower.includes("event") || lower.includes("market") || lower.includes("meetup") || lower.includes("festival")) {
        categories.push("event");
    }
    if (lower.includes("trip") || lower.includes("plan") || lower.includes("visit") || lower.includes("travel")) {
        categories.push("multiple");
    }

    return categories.length > 0 ? categories : ["general"];
}

// Fallback responses for when API is unavailable
function generateFallbackResponse(message) {
    const lower = message.toLowerCase();

    // Berlin-specific recommendations
    if (lower.includes("berlin")) {
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
    if (lower.includes("plan") || lower.includes("itinerary") || lower.includes("trip")) {
        return `## 🎯 Perfect! I'd love to help plan your vegan trip.

To give you the best personalized recommendations, could you tell me:

1. **Which city?** (I have comprehensive Berlin data with safety scores)
2. **Travel dates?**
3. **What interests you most?** (restaurants, accommodations, tours, events)
4. **Budget range?** (€, €€, €€€)

I'll provide actionable recommendations with booking links, hours, and safety scores for each venue!`;
    }

    // Restaurant requests
    if (lower.includes("restaurant") || lower.includes("eat") || lower.includes("food")) {
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
