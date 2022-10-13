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
exports.refreshTokenRoute = void 0;
const express_1 = require("express");
const client_1 = require("../model/methods/client");
const client_facebook_acc_1 = require("../model/methods/client-facebook-acc");
const client_google_acc_1 = require("../model/methods/client-google-acc");
const admin_1 = require("../model/methods/admin");
const jwt_1 = require("./jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.refreshTokenRoute = (0, express_1.Router)();
exports.refreshTokenRoute.post("/refresh-token", function Client(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = req.body.REFRESH_TOKEN;
        const id = req.body.id;
        const isHaveRefreshToken = (yield (0, client_1.check_refreshToken)(id, refreshToken)) ||
            (yield (0, client_facebook_acc_1.check_refreshToken_facebook)(id, refreshToken)) ||
            (yield (0, client_google_acc_1.check_refreshToken_google)(id, refreshToken)) ||
            (yield (0, admin_1.check_refreshToken_admin)(id, refreshToken));
        if (!refreshToken)
            return res.sendStatus(401);
        if (!isHaveRefreshToken)
            return res.sendStatus(403);
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN, (err, data) => {
            if (err)
                return res.sendStatus(403);
            const newAccessToken = (0, jwt_1.generateAccessToken)({ id });
            req.session.user = {
                ACCESS_TOKEN: newAccessToken,
                REFRESH_TOKEN: refreshToken,
                _id: id,
            };
            res.json({ success: true });
        });
    });
});
