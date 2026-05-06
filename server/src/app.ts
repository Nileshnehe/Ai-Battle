import express from "express";
import cors from "cors";
import generateRouter from "./routes/generate.route.js";
import chatRouter from "./routes/chat.route.js";
// import { errorHandler, notFound } from "./middlewares/errorHandler.js";

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use("/api", generateRouter);
app.use("/api/chat", chatRouter);

// ── Health check ─────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ── Error Handling ───────────────────────────────────────────
// app.use(notFound);
// app.use(errorHandler);

export default app;