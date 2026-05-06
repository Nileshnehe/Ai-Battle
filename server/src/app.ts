import express from "express";
import cors from "cors";
import generateRouter from "./routes/generate.route.js";
import chatRouter from "./routes/chat.route.js";
import authRouter from "./routes/auth.route.js";
import { protect } from "./middlewares/auth.middleware.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());

// Public routes
app.use("/api/auth", authRouter);

// Protected routes
app.use("/api/chat", protect, chatRouter);
app.use("/api", protect, generateRouter);

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
