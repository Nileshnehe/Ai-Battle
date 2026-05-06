import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/config.js";
import { AppError } from "../utils/AppError.js";

function signToken(userId: string): string {
  return jwt.sign({ id: userId }, config.JWT_SECRET as string, { expiresIn: "7d" });
}

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw new AppError("Name, email and password are required.", 400);

    const existing = await User.findOne({ email });
    if (existing) throw new AppError("Email already in use.", 409);

    const user = await User.create({ name, email, password });
    const token = signToken(user._id.toString());

    res.status(201).json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, email: user.email } },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new AppError("Email and password are required.", 400);

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError("Invalid email or password.", 401);
    }

    const token = signToken(user._id.toString());

    res.status(200).json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, email: user.email } },
    });
  } catch (error) {
    next(error);
  }
};
