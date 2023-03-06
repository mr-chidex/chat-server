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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const services_1 = require("../services");
class ChatController {
    //@POST
    postChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.chatService.addChat(req.user, req.body);
            res.status(201).json(Object.assign({}, response));
        });
    }
    //@GET
    getAllChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.chatService.getChats();
            res.status(200).json(Object.assign({}, response));
        });
    }
    //@PATCH
    updateChat(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.chatService.updateChat(req.user, req.body, (_a = req.params) === null || _a === void 0 ? void 0 : _a.chatId);
            res.status(200).json(Object.assign({}, response));
        });
    }
    //@DELETE
    deleteChat(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.chatService.removeChat(req.user, (_a = req.params) === null || _a === void 0 ? void 0 : _a.chatId);
            res.status(200).json(Object.assign({}, response));
        });
    }
}
exports.chatController = new ChatController();
//# sourceMappingURL=chats.controller.js.map