import { IChat, IUser } from '../models';

class ChatService {
  async addChat(user: IUser, body: IChat) {
    return {};
  }

  async getChats() {
    return {};
  }

  async updateChat(user: IUser, body: IChat) {
    return {};
  }

  async removeChat(user: IUser) {
    return {};
  }
}

export const chatService = new ChatService();
