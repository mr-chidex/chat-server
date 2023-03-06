"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoutes = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_promise_router_1.default)();
router
    .route('/')
    .get(middlewares_1.authMiddleware.auth, controllers_1.chatController.getAllChats)
    .post(middlewares_1.authMiddleware.auth, controllers_1.chatController.postChat);
router
    .route('/:chatId')
    .patch(middlewares_1.authMiddleware.auth, controllers_1.chatController.updateChat)
    .delete(middlewares_1.authMiddleware.auth, controllers_1.chatController.deleteChat);
exports.chatRoutes = router;
//# sourceMappingURL=chats.route.js.map