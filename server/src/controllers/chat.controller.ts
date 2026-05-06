import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Chat from '../models/chat.model.js';
import { generateBattle } from '../services/battle.service.js';
import { AppError } from '../utils/AppError.js';

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

export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string' || question.trim() === '') {
      throw new AppError('Question is required and must be a non-empty string.', 400);
    }

    const result = await generateBattle(question.trim());

    const chat = await Chat.create({
      question: question.trim(),
      solution_1: result.solution_1,
      solution_2: result.solution_2,
      judge: result.judge,
    });

    res.status(201).json({
      success: true,
      data: normalizeChat(chat),
    });
  } catch (error) {
    next(error);
  }
};

export const getChats = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: chats.map(normalizeChat),
    });
  } catch (error) {
    next(error);
  }
};

export const getChat = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    if (typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid chat ID.', 400);
    }

    const chat = await Chat.findById(id);
    if (!chat) {
      throw new AppError('Chat not found.', 404);
    }

    res.status(200).json({
      success: true,
      data: normalizeChat(chat),
    });
  } catch (error) {
    next(error);
  }
};
