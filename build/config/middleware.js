"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
require("../third-party/passport");
const body_parser_1 = __importDefault(require("body-parser"));
const local_strategy_1 = require("../third-party/local-strategy");
const client_1 = require("../model/methods/client");
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const middleware = (0, express_1.Router)();
const sevenDays = 1000 * 60 * 60 * 24 * 7;
middleware.use("/uploads", express_1.default.static("./assets"));
middleware.use(body_parser_1.default.json());
middleware.use(body_parser_1.default.urlencoded({ extended: true }));
middleware.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://facilities-reservation.herokuapp.com",
        "http://localhost:5500",
    ],
    credentials: true,
}));
middleware.use((0, cookie_parser_1.default)());
middleware.use((0, express_fileupload_1.default)({ createParentPath: true }));
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
(0, local_strategy_1.initializeClientAuth)(passport_1.default, (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, client_1.get_client_from_email)(email);
}), (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, client_1.get_client_from_id)(id);
}));
middleware.use(passport_1.default.initialize());
middleware.use(passport_1.default.session());
exports.default = middleware;
