import { GoogleGenerativeAI } from "@google/generative-ai";
import { CATEGORY_PROMPTS } from "../../../lib/prompts";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Valid categories for validation
const VALID_CATEGORIES = ['restaurant', 'accommodation', 'tour', 'event'];

export async function POST(req) {
    try {
        const { category, reviews } = await req.json();
        
        // Validate input
        if (!category || !VALID_CATEGORIES.includes(category)) {
            return Response.json(
                { error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}` }, 
                { status: 400 }
            );
        }
        
        if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
            return Response.json(
                { error: 'Reviews must be a non-empty array of strings' }, 
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.7,
            },
        });

        const prompt = CATEGORY_PROMPTS[category](reviews);
        const result = await model.generateContent(prompt);

        let responseText = result.response.text();
        // Strip markdown if Gemini adds it
        responseText = responseText
            .replace(/```json\n?/g, "")
            .replace(/```\n?/g, "")
            .trim();

        const analysis = JSON.parse(responseText);
        
        // Validate response structure
        if (!analysis.score || !analysis.category || !analysis.signals || !analysis.citations) {
            throw new Error('Invalid AI response structure');
        }
        
        // Add timestamp
        analysis.analyzedAt = new Date().toISOString();

        return Response.json(analysis);
    } catch (error) {
        console.error('Analysis error:', error);
        return Response.json({ 
            error: error.message || 'Failed to analyze reviews',
            category: req.body?.category || 'unknown'
        }, { status: 500 });
    }
}
