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
const get_client_acc_1 = require("../model/methods/Basic_Method/get-client-acc");
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
        const user = yield (0, get_client_acc_1.auth_user)(req.body.email, Object.assign({ name: fullname, password: hashPass }, rest));
        return res.json(user);
    });
});
