"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../config"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: config_1.default.DB_HOST,
    port: 5432,
    username: config_1.default.DB_USER,
    password: config_1.default.DB_PASS,
    database: config_1.default.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [__dirname + '/models/*{.js,.ts}'],
    migrations: [__dirname + '/database/migrations/*.js'],
    subscribers: [],
});
