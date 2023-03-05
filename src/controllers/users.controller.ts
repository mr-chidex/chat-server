import { Request, Response } from 'express';

import { userService } from '../services';

class UserController {
  //@GET
  async getUserProfile(req: Request, res: Response) {
    const response = await userService.getProfile();
    res.status(201).json({ ...response });
  }

  //@GET
  async getUsers(req: Request, res: Response) {
    const response = await userService.getUsers();
    res.status(200).json({ ...response });
  }

  //@POST
  async logoutUser(req: Request, res: Response) {
    const response = await userService.logout();
    res.status(200).json({ ...response });
  }
}

export const userController = new UserController();
