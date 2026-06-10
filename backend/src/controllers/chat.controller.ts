import { Request, Response, NextFunction } from 'express';
import { ChatService } from '../services/chat.service.js';

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  handleMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { message, sessionId } = req.body;
   
      const result = await this.chatService.handleUserMessage(message, sessionId);

      res.status(200).json(result);
    } catch (error) {
      next(error); 
    }
  };

  getHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { sessionId } = req.params;
      
      if (!sessionId) {
        res.status(400).json({ status: 'fail', message: 'Session ID parameter is required.' });
        return;
      }

      const history = await this.chatService.getSessionHistory(sessionId as string);
      res.status(200).json({ status: 'success', history });
    } catch (error) {
      next(error);
    }
  };
}