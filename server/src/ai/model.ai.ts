import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../config/config.js";



/**
 * Validates that required environment variables are present.
 * Prevents the application from starting in a broken state.
 */
const validateConfig = (key: string | undefined, name: string): string => {
    if (!key) {
        throw new Error(`[Configuration Error]: Missing API key for ${name}. check your .env file.`)
    }
    return key
}

export const geminiModel = new ChatGoogle({
    model: "gemini-3-flash-preview",
    apiKey: validateConfig(config.GOOGLE_API_KEY, "Google gemini"),
});

export const mistralaiModel = new ChatMistralAI({
    model: "mistral-medium",
    apiKey: validateConfig(config.MISTRALAI_API_KEY, "Mistral AI"),
});

export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: validateConfig(config.COHERE_API_KEY, "Cohore AI"),
});

export const ModelProvider = {
  gemini: geminiModel,
  mistral: mistralaiModel,
  cohere: cohereModel,
} as const;

export type SupportedModels = keyof typeof ModelProvider;