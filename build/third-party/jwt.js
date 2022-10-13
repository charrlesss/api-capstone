"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sevenDays = 1000 * 60 * 60 * 24 * 7;
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "30m",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.REFRESH_TOKEN, {
        expiresIn: sevenDays,
    });
};
exports.generateRefreshToken = generateRefreshToken;
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jsonwebtoken_1.default.verify(bearerToken, process.env.ACCESS_TOKEN, function (err, decoded) {
            if (err)
                return res.sendStatus(402);
            return next();
        });
    }
    else {
        res.sendStatus(403);
    }
}
exports.verifyToken = verifyToken;
