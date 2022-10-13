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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("../model/methods/client");
const generate_code_1 = require("../lib/generate-code");
const sendEmail_1 = require("../lib/sendEmail");
const uuid_1 = require("uuid");
exports.register = (0, express_1.Router)();
const arrayOfRandomProfileIconForUserFeMale = [
    "girl1.jpg",
    "girl2.jpg",
    "girl3.jpg",
];
const arrayOfRandomProfileIconForUserMale = [
    "boy1.jpg",
    "boy2.jpg",
    "boy3.jpg",
];
exports.register.post("/register-user", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        delete req.body.confirmPassword;
        const randomNumber = Math.floor(Math.random() * 3);
        let profile;
        if (req.body.gender.toLowerCase() === "male") {
            profile = arrayOfRandomProfileIconForUserMale[randomNumber];
        }
        else {
            profile = arrayOfRandomProfileIconForUserFeMale[randomNumber];
        }
        const _a = Object.assign({ profile }, req.body), { fullname, password } = _a, rest = __rest(_a, ["fullname", "password"]);
        const hashPass = yield bcryptjs_1.default.hash(password, 10);
        const getUserFromEmail = yield (0, client_1.get_client_from_email)(req.body.email);
        if (getUserFromEmail) {
            return res.json({ message: "this email is already used.", success: false });
        }
        res.cookie("verifying", (0, uuid_1.v4)(), { maxAge: 99999999, httpOnly: true });
        res.cookie("email_to_verify", req.body.email, {
            maxAge: 99999999,
            httpOnly: true,
            secure: true,
        });
        const code = (0, generate_code_1.generateCode)();
        yield (0, client_1.store_new_user)(Object.assign(Object.assign({ name: fullname, password: hashPass }, rest), { verifyCode: code }));
        console.log("asdasd");
        yield (0, sendEmail_1.sendEmailToVerifyAccount)(req.body.email, code);
        return res.json({ message: "Successfuly create account.", success: true });
    });
});
exports.register.get("/verifying-account", (req, res) => {
    res.json({
        data: {
            verifying: req.cookies["verifying"] !== undefined,
            email: req.cookies["email_to_verify"],
        },
    });
});
exports.register.post("/verifying-account-with-code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = yield (0, client_1.verify_code_send)(req.body.email, req.body.code);
    if (!getUser) {
        return res.json({ data: { message: "Invalid Code ", success: false } });
    }
    getUser.verify = true;
    getUser.verifyCode = "";
    yield getUser.save();
    res.clearCookie("verifying");
    res.clearCookie("email_to_verify");
    res.json({ data: { message: "successfully verify", success: true } });
}));
exports.register.post("/not-verify-account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, client_1.remove_acc_by_email)(req.body.email);
    res.clearCookie("verifying");
    res.clearCookie("email_to_verify");
    res.json({
        data: {
            message: "Your account has been removed by the system because it is no longer verified",
            success: true,
        },
    });
}));
