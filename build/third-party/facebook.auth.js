"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facebookAuthRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
exports.facebookAuthRouter = (0, express_1.Router)();
exports.facebookAuthRouter.get("/facebook", passport_1.default.authenticate("facebook", { scope: "email" }));
exports.facebookAuthRouter.get("/facebook/callback", passport_1.default.authenticate("facebook", {
    failureRedirect: "/login",
}), (req, res) => {
    res.cookie('sidebar', 'open');
    // if(process.env.NODE_ENV === 'dev'){
    // }
    // return res.redirect("http://localhost:3000/production")
    return res.redirect("http://localhost:3000/dashboard");
});
