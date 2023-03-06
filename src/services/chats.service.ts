import { Chat } from '../entities/Chat';
import { IChat, IUser } from '../models';
import { errorResponse } from '../utils';
import { validateChatParam } from '../validators';

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

    return {
      success: true,
      message: 'Chat successfully posted',
      data: chat,
    };
  }

  async getChats() {
    const chats = await Chat.find({
      order: {
        id: 'ASC',
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
      return errorResponse('Chat not found: Cannot update', 403);
    }

    chat.message = message;
    await chat.save();

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
      return errorResponse('Chat not found: Cannot delete', 403);
    }

    await chat.remove();

    return {
      success: true,
      message: 'Successfully deleted',
    };
  }
}

export const chatService = new ChatService();
