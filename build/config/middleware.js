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
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
require("../third-party/passport");
const body_parser_1 = __importDefault(require("body-parser"));
const local_strategy_1 = require("../third-party/local-strategy");
const get_client_acc_1 = require("../model/methods/Basic_Method/get-client-acc");
const connect_flash_1 = __importDefault(require("connect-flash"));
const middleware = (0, express_1.Router)();
const sevenDays = 1000 * 60 * 60 * 24 * 7;
middleware.use(body_parser_1.default.json());
middleware.use(body_parser_1.default.urlencoded({ extended: true }));
middleware.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
middleware.use((0, cookie_parser_1.default)());
middleware.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: sevenDays,
    },
}));
middleware.use((0, connect_flash_1.default)());
(0, local_strategy_1.initialize)(passport_1.default, (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, get_client_acc_1.get_client_from_email)(email);
}), (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, get_client_acc_1.get_client_from_id)(id);
}));
middleware.use(passport_1.default.initialize());
middleware.use(passport_1.default.session());
exports.default = middleware;
