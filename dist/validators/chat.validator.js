"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChatParam = void 0;
const joi_1 = __importDefault(require("joi"));
const validateChatParam = (params) => {
    return joi_1.default.object({
        message: joi_1.default.string().trim().required(),
    }).validate(params);
};
exports.validateChatParam = validateChatParam;
//# sourceMappingURL=chat.validator.js.map