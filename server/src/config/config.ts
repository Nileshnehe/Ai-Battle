import dotenv from "dotenv";

dotenv.config();

interface Config {
    GOOGLE_API_KEY: string | undefined;
    MISTRALAI_API_KEY: string | undefined;
    COHERE_API_KEY: string | undefined;
    NODE_ENV: string;
    PORT: number;
}

const config = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    MISTRALAI_API_KEY: process.env.MISTRALAI_API_KEY,
    COHERE_API_KEY: process.env.COHERE_API_KEY,
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 5000,
}

if (config.NODE_ENV === "development") {
    Object.entries(config).forEach(([key, value]) => {
        if (!value && key.includes("API_KEY")) {
            console.warn(`Warning: Configuration property "${key}" is missing.`);
        }
    });
}

export default config