import type { Request, Response, NextFunction } from "express";
import { generateBattle } from "../services/battle.service.js";
import { AppError } from "../utils/AppError.js";

export const generate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string" || question.trim() === "") {
      throw new AppError("Question is required and must be a non-empty string.", 400);
    }

    const result = await generateBattle(question.trim());

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
