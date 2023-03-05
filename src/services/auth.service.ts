import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

import config from '../config';
import { User } from '../entities/User';
import { IUser } from '../models';
import { errorResponse } from '../utils';
import { validateLoginParams, validateRegisterParams } from '../validators';

class AuthService {
  validateRegisterationParams(body: IUser) {
    const { error } = validateRegisterParams(body);
    if (error) {
      errorResponse(error.details[0].message, 400);
    }
  }

  async findUserByEmail(email: string) {
    return await User.findOneBy({ email });
  }

  async validateRegisterationEmail(email: string) {
    // check if email is already in use
    const isEmail = await this.findUserByEmail(email);
    if (isEmail) {
      errorResponse('Email already in use', 400);
    }
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
  }

  async register(body: IUser) {
    this.validateRegisterationParams(body);

    const { name, email, password } = body;

    await this.validateRegisterationEmail(email);

    const hashedPassword = await this.hashPassword(password);

    await User.create({
      name,
      email,
      password: hashedPassword,
    }).save();

    return {
      success: true,
      message: 'Account successfully created',
    };
  }

  async validateCredentials(email: string, password: string) {
    //check if email is correct
    const user = await User.findOneBy({ email });
    if (!user) {
      return errorResponse('Email or Password is incorrect', 401);
    }

    //check if password is correct
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return errorResponse('Email or Password is incorrect', 401);
    }

    return user;
  }

  getToken(user: IUser) {
    return JWT.sign(
      {
        iat: Date.now(),
        iss: 'chatserver',
        userId: user.id,
      },
      config.SECRET_KEY,
      { expiresIn: '48h' },
    );
  }

  validateLoginParameters(body: IUser) {
    const { error } = validateLoginParams(body);
    if (error) {
      errorResponse(error.details[0].message, 400);
    }
  }

  async login(body: IUser) {
    this.validateLoginParameters(body);

    const { email, password } = body;

    const user = await this.validateCredentials(email, password);

    const token = this.getToken(user);
    user.token = token;

    await user.save();

    return {
      success: true,
      message: 'Login successful',
      data: token,
    };
  }
}

export const authService = new AuthService();
