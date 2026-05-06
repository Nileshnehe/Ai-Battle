import type { Response, NextFunction } from "express";
import mongoose from "mongoose";
import Chat from "../models/chat.model.js";
import { generateBattle } from "../services/battle.service.js";
import { AppError } from "../utils/AppError.js";
import type { AuthRequest } from "../middlewares/auth.middleware.js";

function normalizeChat(chat: any) {
  return {
    id: chat._id.toString(),
    question: chat.question,
    solution_1: chat.solution_1,
    solution_2: chat.solution_2,
    judge: chat.judge,
    createdAt: chat.createdAt,
  };
}

export const createChat = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== "string" || question.trim() === "") {
      throw new AppError("Question is required and must be a non-empty string.", 400);
    }
    const result = await generateBattle(question.trim());
    const chat = await Chat.create({
      userId: req.user!.id,
      question: question.trim(),
      solution_1: result.solution_1,
      solution_2: result.solution_2,
      judge: result.judge,
    });
    res.status(201).json({ success: true, data: normalizeChat(chat) });
  } catch (error) { next(error); }
};

export const getChats = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const chats = await Chat.find({ userId: req.user!.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: chats.map(normalizeChat) });
  } catch (error) { next(error); }
};

export const getChat = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) throw new AppError("Invalid chat ID.", 400);
    const chat = await Chat.findOne({ _id: id, userId: req.user!.id });
    if (!chat) throw new AppError("Chat not found.", 404);
    res.status(200).json({ success: true, data: normalizeChat(chat) });
  } catch (error) { next(error); }
};

export const getChatStats = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.id;
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [total, thisWeek] = await Promise.all([
      Chat.countDocuments({ userId }),
      Chat.countDocuments({ userId, createdAt: { $gte: weekAgo } }),
    ]);
    res.status(200).json({ success: true, data: { total, thisWeek } });
  } catch (error) { next(error); }
};
