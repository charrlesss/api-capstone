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
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const express_1 = require("express");
const generate_code_1 = require("../lib/generate-code");
const sendEmail_1 = require("../lib/sendEmail");
const client_1 = require("../model/methods/client");
const client_facebook_acc_1 = require("../model/methods/client-facebook-acc");
const client_google_acc_1 = require("../model/methods/client-google-acc");
exports.changePassword = (0, express_1.Router)();
exports.changePassword.post("/changePassword-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = (0, generate_code_1.generateCode)();
        const email = req.body.email;
        const user = (yield (0, client_1.get_client_from_email)(email)) ||
            (yield (0, client_google_acc_1.get_user_by_email_goggle)(email)) ||
            (yield (0, client_facebook_acc_1.get_user_by_email_facebook)(email));
        user.verifyCode = code;
        yield user.save();
        yield (0, sendEmail_1.sendEmailToVerifyAccount)(req.body.email, code);
        res.json({
            data: {
                success: true,
                message: "send verification in this email " + email,
            },
        });
    }
    catch (err) {
        res.json({
            data: {
                success: false,
                message: err,
            },
        });
    }
}));
