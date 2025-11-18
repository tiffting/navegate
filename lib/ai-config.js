import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

// AI Provider Configuration
// Change this to switch between providers: 'gemini', 'openai', or 'openrouter'
const AI_PROVIDER = process.env.AI_PROVIDER || "openrouter"; // Default to OpenRouter for stability

// Model configurations for each provider
const MODEL_CONFIGS = {
    gemini: {
        model: "gemini-2.0-flash-lite", // Updated to latest available model
        maxTokens: 2500,
        temperature: 0.7,
    },
    openai: {
        model: "gpt-4o-mini", // Fast and cost-effective
        maxTokens: 2500,
        temperature: 0.7,
    },
    openrouter: {
        model: "openai/gpt-oss-20b",
        maxTokens: 2500,
        temperature: 0.7,
    },
};

// Initialize AI clients
let geminiClient = null;
let openaiClient = null;
let openrouterClient = null;

if (process.env.GEMINI_API_KEY) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    geminiClient = genAI.getGenerativeModel({ model: MODEL_CONFIGS.gemini.model });
}

if (process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
}

if (process.env.OPENROUTER_API_KEY) {
    openrouterClient = new OpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",
    });
}

/**
 * Universal AI completion function that works with any configured provider
 * @param {Object} params - Parameters for the AI completion
 * @param {string} params.systemPrompt - System message/context
 * @param {string} params.userPrompt - User message/question
 * @param {number} params.maxTokens - Maximum tokens in response (optional)
 * @param {number} params.temperature - Temperature for response (optional)
 * @returns {Promise<string>} - The AI response text
 */
export async function getAICompletion({ systemPrompt, userPrompt, maxTokens, temperature }) {
    const config = MODEL_CONFIGS[AI_PROVIDER];
    const finalMaxTokens = maxTokens || config.maxTokens;
    const finalTemperature = temperature || config.temperature;

    console.log(`Using AI provider: ${AI_PROVIDER}`);

    try {
        switch (AI_PROVIDER) {
            case "gemini": {
                if (!geminiClient) {
                    throw new Error("Gemini API key not configured");
                }

                // Combine prompts for Gemini (it doesn't have separate system/user roles)
                const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

                const result = await geminiClient.generateContent({
                    contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
                    generationConfig: {
                        maxOutputTokens: finalMaxTokens,
                        temperature: finalTemperature,
                    },
                });

                return result.response.text();
            }

            case "openai": {
                if (!openaiClient) {
                    throw new Error("OpenAI API key not configured");
                }

                const completion = await openaiClient.chat.completions.create({
                    model: config.model,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt },
                    ],
                    max_tokens: finalMaxTokens,
                    temperature: finalTemperature,
                });

                return completion.choices[0].message.content;
            }

            case "openrouter": {
                if (!openrouterClient) {
                    throw new Error("OpenRouter API key not configured");
                }

                const completion = await openrouterClient.chat.completions.create({
                    model: config.model,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt },
                    ],
                    max_tokens: finalMaxTokens,
                    temperature: finalTemperature,
                });

                return completion.choices[0].message.content;
            }

            default:
                throw new Error(`Unknown AI provider: ${AI_PROVIDER}`);
        }
    } catch (error) {
        console.error(`AI API error (${AI_PROVIDER}):`, error);
        throw error;
    }
}

/**
 * Get current AI provider and model info
 */
export function getAIProviderInfo() {
    let configured = false;

    switch (AI_PROVIDER) {
        case "gemini":
            configured = !!geminiClient;
            break;
        case "openai":
            configured = !!openaiClient;
            break;
        case "openrouter":
            configured = !!openrouterClient;
            break;
    }

    return {
        provider: AI_PROVIDER,
        model: MODEL_CONFIGS[AI_PROVIDER]?.model || "unknown",
        configured,
    };
}
