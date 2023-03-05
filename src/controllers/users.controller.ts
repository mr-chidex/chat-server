import { Response } from 'express';

import { userService } from '../services';
import { IRequest } from './interface';

class UserController {
  //@GET
  async getUserProfile(req: IRequest, res: Response) {
    const response = await userService.getProfile(req.user!);
    res.status(201).json({ ...response });
  }

  //@GET
  async getUsers(req: IRequest, res: Response) {
    const response = await userService.getUsers(req.user!);
    res.status(200).json({ ...response });
  }

  //@POST
  async logoutUser(req: IRequest, res: Response) {
    const response = await userService.logout(req.user!);
    res.status(200).json({ ...response });
  }
}

export const userController = new UserController();
