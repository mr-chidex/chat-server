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
exports.userService = void 0;
const User_1 = require("../entities/User");
const utils_1 = require("../utils");
class UserService {
    getProfile(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield User_1.User.findOne({
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
        });
    }
    getUsers(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.User.find({
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
        });
    }
    logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield User_1.User.findOneBy({ id: user.id });
            if (!userData) {
                return (0, utils_1.errorResponse)('Invalid user', 403);
            }
            userData.token = '';
            yield userData.save();
            return {
                success: true,
                message: 'logout successful',
            };
        });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=users.service.js.map