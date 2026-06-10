import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller.js';
import { validate } from '../middleware/validate.js';
import { postMessageSchema } from '../schemas/chat.schema.js';

const router = Router();
const chatController = new ChatController();

router.post('/message', validate(postMessageSchema), chatController.handleMessage);

router.get('/history/:sessionId', chatController.getHistory);

export default router;