"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
exports.googleAuthRouter = (0, express_1.Router)();
exports.googleAuthRouter.get("/login", (req, res) => {
    res.sendStatus(404).json({ message: "failure login" });
});
exports.googleAuthRouter.get("/google", passport_1.default.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ],
}));
exports.googleAuthRouter.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/login",
}), (req, res) => {
    res.cookie("sidebar", "open");
    res.redirect("http://localhost:3000/dashboard");
});
