import { Router } from 'express';
import { createChat, getChats, getChat } from '../controllers/chat.controller.js';

const router = Router();

router.post('/', createChat);
router.get('/', getChats);
router.get('/:id', getChat);

export default router;
