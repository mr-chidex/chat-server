"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const database_1 = require("./database");
const PORT = config_1.default.PORT || 5000;
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('db connected...');
    app_1.default.listen(PORT, () => console.log(`server running on PORT:: 🚀💥>>> ${PORT}`));
})
    .catch((_error) => console.log('error connecting db>>>', _error));
