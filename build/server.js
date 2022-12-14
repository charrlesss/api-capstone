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
const dotenv_1 = __importDefault(require("dotenv"));
const connect_db_1 = __importDefault(require("./connect.db"));
const middleware_1 = __importDefault(require("./config/middleware"));
const routers_1 = __importDefault(require("./config/routers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 4000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.enable('trust proxy');
            app.use(middleware_1.default);
            app.use(routers_1.default);
            yield (0, connect_db_1.default)();
            app.listen(process.env.PORT || PORT, () => {
                console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
main();
