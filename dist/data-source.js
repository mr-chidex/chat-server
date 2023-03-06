"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("./config"));
const Chat_1 = require("./entities/Chat");
const User_1 = require("./entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: config_1.default.DB_HOST,
    port: 5432,
    username: config_1.default.DB_USER,
    password: config_1.default.DB_PASS,
    database: config_1.default.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Chat_1.Chat],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map