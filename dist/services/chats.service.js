"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const Chat_1 = require("../entities/Chat");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const socket_1 = __importDefault(require("../socket"));
class ChatService {
    validateParams(body) {
        const { error } = (0, validators_1.validateChatParam)(body);
        if (error) {
            (0, utils_1.errorResponse)(error.details[0].message, 400);
        }
    }
    addChat(user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateParams(body);
            const { message } = body;
            const chat = yield Chat_1.Chat.create({
                message,
                userId: user.id,
            }).save();
            socket_1.default.getIO().emit('chats', {
                action: 'create',
                chat: { chat, creator: { email: user.email, name: user.name } },
            });
            return {
                success: true,
                message: 'Chat successfully posted',
                data: chat,
            };
        });
    }
    getChats() {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = yield Chat_1.Chat.find({
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
        });
    }
    updateChat(user, body, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateParams(body);
            const { message } = body;
            const chat = yield Chat_1.Chat.findOne({
                where: {
                    id: chatId,
                    userId: user.id,
                },
            });
            if (!chat) {
                return (0, utils_1.errorResponse)('Chat not found: Cannot update', 404);
            }
            chat.message = message;
            yield chat.save();
            socket_1.default.getIO().emit('chats', { action: 'update', chat: chat });
            return {
                success: true,
                message: 'Successfully updated',
                data: chat,
            };
        });
    }
    removeChat(user, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield Chat_1.Chat.findOne({
                where: {
                    id: chatId,
                    userId: user.id,
                },
            });
            if (!chat) {
                return (0, utils_1.errorResponse)('Chat not found: Cannot delete', 404);
            }
            yield chat.remove();
            socket_1.default.getIO().emit('chats', { action: 'delete', chat: chat });
            return {
                success: true,
                message: 'Successfully deleted',
            };
        });
    }
}
exports.chatService = new ChatService();
//# sourceMappingURL=chats.service.js.map