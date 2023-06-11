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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = require("./user/user.router");
const config_1 = require("./config/config");
const typeorm_1 = require("typeorm");
class ServerBootstrap extends config_1.ConfigServer {
    constructor() {
        super();
        this.app = (0, express_1.default)();
        this.port = this.getNumberEnv('PORT') || 8000;
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Start to Database
        this.dbConnect();
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        // Routes
        this.app.use('/api', this.routers());
        this.listen();
    }
    routers() {
        return [new user_router_1.UserRouter().router];
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new typeorm_1.DataSource(this.typeORMConfig).initialize();
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port: ${this.port}`);
        });
    }
}
new ServerBootstrap();
//# sourceMappingURL=server.js.map