"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
exports.auth = (0, express_1.Router)();
exports.auth.post("/auth-user", (req, res, next) => {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err)
            return next(err);
        if (!user && info.message) {
            return res.json(info);
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json({ message: 'successfuly login.', success: true });
        });
    })(req, res, next);
});
