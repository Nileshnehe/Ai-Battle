import { Router } from "express";
import { createChat, getChats, getChat, getChatStats } from "../controllers/chat.controller.js";

const router = Router();

router.post("/", createChat);
router.get("/", getChats);
router.get("/stats", getChatStats);
router.get("/:id", getChat);

export default router;
