import { User } from '../entities/User';
import { IUser } from '../models';
import { errorResponse } from '../utils';

class UserService {
  async getProfile(user: IUser) {
    const userData = await User.findOne({
      where: { id: user.id },
      select: {
        name: true,
        email: true,
      },
    });

    return {
      success: true,
      message: 'success',
      data: userData,
    };
  }

  async getUsers(user: IUser) {
    const users = await User.find({
      order: {
        id: 'ASC',
      },
      select: {
        name: true,
        email: true,
      },
    });

    return {
      success: true,
      message: 'success',
      data: users,
    };
  }

  async logout(user: IUser) {
    const userData = await User.findOneBy({ id: user.id });

    if (!userData) {
      return errorResponse('Invalid user', 403);
    }

    userData.token = '';

    await userData.save();

    return {
      success: true,
      message: 'logout successful',
    };
  }
}

export const userService = new UserService();
