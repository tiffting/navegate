import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config({ path: ".env.local" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const CATEGORY_PROMPTS = {
    restaurant: (reviews) => `Analyze these restaurant reviews for vegan safety signals:
- Cross-contamination prevention
- Staff knowledge about vegan requirements
- Ingredient transparency
- Community trust indicators

Reviews:
${reviews.join("\n\n")}

Output ONLY valid JSON with NO markdown formatting, NO backticks, NO explanatory text:
{
  "score": 0-100,
  "category": "restaurant",
  "reasoning": "brief explanation",
  "signals": {
    "cross_contamination": 0-100,
    "staff_knowledge": 0-100,
    "ingredient_transparency": 0-100,
    "community_trust": 0-100
  },
  "citations": ["quote from review", "another quote"]
}`,

    accommodation: (reviews) => `Analyze these accommodation reviews for vegan traveler safety:
- Shared kitchen cross-contamination handling
- Bedding materials (animal-free)
- Vegan breakfast quality
- Host knowledge of veganism

Reviews:
${reviews.join("\n\n")}

Output ONLY valid JSON with NO markdown formatting, NO backticks, NO explanatory text:
{
  "score": 0-100,
  "category": "accommodation",
  "reasoning": "brief explanation",
  "signals": {
    "kitchen_safety": 0-100,
    "bedding": 0-100,
    "breakfast_quality": 0-100,
    "host_knowledge": 0-100
  },
  "citations": ["quote from review", "another quote"]
}`,
};

const testReviews = {
    restaurant: [
        "100% vegan restaurant, totally safe!",
        "Staff incredibly knowledgeable, separate kitchen area.",
        "Chef explained every ingredient. Zero contamination risk.",
    ],
    accommodation: [
        "Found wool blankets and leather pillows.",
        "Shared kitchen, no vegan utensils, host confused.",
        "Breakfast had only fruit. Kitchen shared with meat-eaters.",
    ],
};

async function testGemini(category) {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
        },
    });

    const prompt = CATEGORY_PROMPTS[category](testReviews[category]);

    console.log(`\n=== Testing ${category} ===`);

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log("Raw response:", responseText);

    try {
        const json = JSON.parse(responseText);
        console.log("✓ Valid JSON");
        console.log("Score:", json.score);
        console.log("Signals:", json.signals);
        console.log("Citations:", json.citations);
    } catch (e) {
        console.log("❌ JSON parse failed:", e.message);
    }
}

// Run tests
async function runTests() {
    await testGemini("restaurant");
    await testGemini("accommodation");
}

runTests();
