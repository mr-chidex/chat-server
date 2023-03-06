import { Request, Response } from 'express';

import { chatService } from '../services';
import { IRequest } from './interface';

class ChatController {
  //@POST
  async postChat(req: IRequest, res: Response) {
    const response = await chatService.addChat(req.user!, req.body);
    res.status(201).json({ ...response });
  }

  //@GET
  async getAllChats(req: Request, res: Response) {
    const response = await chatService.getChats();
    res.status(200).json({ ...response });
  }

  //@PATCH
  async updateChat(req: IRequest, res: Response) {
    const response = await chatService.updateChat(req.user!, req.body, req.params?.chatId);
    res.status(200).json({ ...response });
  }

  //@DELETE
  async deleteChat(req: IRequest, res: Response) {
    const response = await chatService.removeChat(req.user!, req.params?.chatId);
    res.status(200).json({ ...response });
  }
}

export const chatController = new ChatController();
