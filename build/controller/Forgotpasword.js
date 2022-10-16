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
exports.Forgotpasword = void 0;
const express_1 = require("express");
const generate_code_1 = require("../lib/generate-code");
const sendEmail_1 = require("../lib/sendEmail");
const client_1 = require("../model/methods/client");
const client_facebook_acc_1 = require("../model/methods/client-facebook-acc");
const client_google_acc_1 = require("../model/methods/client-google-acc");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.Forgotpasword = (0, express_1.Router)();
exports.Forgotpasword.get("/forgotpassword-authorize", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        data: {
            success: true,
            messages: "fetch forgot password authorization",
            data: {
                authorized: req.session.forgotpaswordVerify !== undefined ? true : false,
            },
        },
    });
}));
exports.Forgotpasword.post("/forgotpassword-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = (0, generate_code_1.generateCode)();
        const email = req.body.email;
        const user = (yield (0, client_1.get_client_from_email)(email)) ||
            (yield (0, client_google_acc_1.get_user_by_email_goggle)(email)) ||
            (yield (0, client_facebook_acc_1.get_user_by_email_facebook)(email));
        user.verifyCode = code;
        yield user.save();
        yield (0, sendEmail_1.sendEmailToVerifyAccount)(req.body.email, code);
        req.session.forgotpaswordEmail = email;
        res.json({
            data: {
                success: true,
                message: "successfuly send code to - " + email,
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
exports.Forgotpasword.post("/forgotpassword-code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = req.body.code;
        const email = req.session.forgotpaswordEmail;
        const user = (yield (0, client_1.get_client_from_email)(email)) ||
            (yield (0, client_google_acc_1.get_user_by_email_goggle)(email)) ||
            (yield (0, client_facebook_acc_1.get_user_by_email_facebook)(email));
        if (user.verifyCode !== code) {
            return res.json({
                data: {
                    success: false,
                    message: "Invalid Code",
                },
            });
        }
        user.verifyCode = "";
        yield user.save();
        req.session.forgotpaswordVerify = true;
        res.json({
            data: {
                success: true,
                message: "successfuly verify ",
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
exports.Forgotpasword.post("/forgotpassword-update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        delete req.body.confirmPassword;
        const email = req.session.forgotpaswordEmail;
        const password = req.body.password;
        const newPassword = yield bcryptjs_1.default.hash(password, 10);
        const client = yield (0, client_1.get_client_from_email)(email);
        const clientgoogle = yield (0, client_google_acc_1.get_user_by_email_goggle)(email);
        const clientfacebook = yield (0, client_facebook_acc_1.get_user_by_email_facebook)(email);
        client.password = newPassword;
        clientgoogle.password = newPassword;
        clientfacebook.password = newPassword;
        yield client.save();
        yield clientgoogle.save();
        yield clientfacebook.save();
        req.session.forgotpaswordVerify = undefined;
        req.session.forgotpaswordEmail = undefined;
        res.json({
            data: {
                success: true,
                message: "successfuly change password ",
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
