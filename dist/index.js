"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const data_source_1 = require("./data-source");
const socket_1 = __importDefault(require("./socket"));
const PORT = config_1.default.PORT || 5000;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('db connected...');
    const server = app_1.default.listen(PORT, () => console.log(`server running on PORT:: 🚀💥>>> ${PORT}`));
    socket_1.default.init(server);
})
    .catch((_error) => console.log('error connecting db>>>', _error));
//# sourceMappingURL=index.js.map