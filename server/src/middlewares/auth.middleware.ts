import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/config.js";
import { AppError } from "../utils/AppError.js";

export interface AuthRequest extends Request {
  user?: { id: string; name: string; email: string };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      throw new AppError("Not authenticated. Please log in.", 401);
    }

    const token = header.split(" ")[1];
    if (!token) throw new AppError("Not authenticated. Please log in.", 401);
    
    const decoded = jwt.verify(token, config.JWT_SECRET as string) as unknown as { id: string };

    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new AppError("User no longer exists.", 401);

    req.user = { id: user._id.toString(), name: user.name, email: user.email };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError("Invalid or expired token. Please log in again.", 401));
    } else {
      next(error);
    }
  }
};
