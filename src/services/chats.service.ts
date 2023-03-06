import { Chat } from '../entities/Chat';
import { IChat, IUser } from '../models';
import { errorResponse } from '../utils';
import { validateChatParam } from '../validators';
import io from '../socket';

class ChatService {
  validateParams(body: IChat) {
    const { error } = validateChatParam(body);
    if (error) {
      errorResponse(error.details[0].message, 400);
    }
  }

  async addChat(user: IUser, body: IChat) {
    this.validateParams(body);
    const { message } = body;

    const chat = await Chat.create({
      message,
      userId: user.id,
    }).save();

    io.getIO().emit('chats', {
      action: 'create',
      chat: { chat, creator: { email: user.email, name: user.name } },
    });

    return {
      success: true,
      message: 'Chat successfully posted',
      data: chat,
    };
  }

  async getChats() {
    const chats = await Chat.find({
      relations: ['user'],
      select: {
        message: true,
        id: true,
        user: {
          name: true,
          email: true,
        },
      },
    });

    return {
      success: true,
      message: 'successful',
      data: chats,
    };
  }

  async updateChat(user: IUser, body: IChat, chatId: string) {
    this.validateParams(body);

    const { message } = body;

    const chat = await Chat.findOne({
      where: {
        id: chatId,
        userId: user.id,
      },
    });

    if (!chat) {
      return errorResponse('Chat not found: Cannot update', 404);
    }

    chat.message = message;
    await chat.save();

    io.getIO().emit('chats', { action: 'update', chat: chat });

    return {
      success: true,
      message: 'Successfully updated',
      data: chat,
    };
  }

  async removeChat(user: IUser, chatId: string) {
    const chat = await Chat.findOne({
      where: {
        id: chatId,
        userId: user.id,
      },
    });

    if (!chat) {
      return errorResponse('Chat not found: Cannot delete', 404);
    }

    await chat.remove();

    io.getIO().emit('chats', { action: 'delete', chat: chat });

    return {
      success: true,
      message: 'Successfully deleted',
    };
  }
}

export const chatService = new ChatService();
