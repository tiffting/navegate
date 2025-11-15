import { GoogleGenerativeAI } from "@google/generative-ai";
import { CATEGORY_PROMPTS } from "../../../lib/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const { category, reviews } = await req.json();

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
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

        return Response.json(analysis);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
