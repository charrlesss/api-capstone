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
exports.client = void 0;
const express_1 = require("express");
const jwt_1 = require("../third-party/jwt");
const client_1 = require("../model/methods/client");
const client_facebook_acc_1 = require("../model/methods/client-facebook-acc");
const client_google_acc_1 = require("../model/methods/client-google-acc");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const sendEmail_1 = require("../lib/sendEmail");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.client = (0, express_1.Router)();
exports.client.get("/authenticated-user", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.user) {
            req.session.user = req.session.user ? req.session.user : req.user;
            return res.json({
                message: "Authorise User",
                user: req.session.user,
                success: true,
            });
        }
        return res.json({ message: "Not Authorize User", data: [], success: false });
    });
});
exports.client.get("/get-client-details", jwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user === undefined)
        return res.sendStatus(401);
    const user = req.user;
    const getUserDetails = (yield (0, client_facebook_acc_1.get_facebook_client_from_id)(user._id)) ||
        (yield (0, client_google_acc_1.get_google_client_from_id)(user._id)) ||
        (yield (0, client_1.get_client_from_id)(user._id));
    req.session.isChangePass =
        req.session.isChangePass === undefined ? false : req.session.isChangePass;
    const userDetails = Object.assign(Object.assign({}, getUserDetails._doc), { changePass: req.session.isChangePass });
    res.json({
        data: userDetails,
    });
}));
exports.client.post("/complete-details", jwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = req.user;
    const getUserDetails = (yield (0, client_facebook_acc_1.get_facebook_client_from_id)(user._id)) ||
        (yield (0, client_google_acc_1.get_google_client_from_id)(user._id)) ||
        (yield (0, client_1.get_client_from_id)(user._id));
    const profile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.profile;
    const filename = (0, uuid_1.v4)();
    const mimetype = profile === null || profile === void 0 ? void 0 : profile.mimetype.split("/")[1];
    const file = `${filename}.${mimetype}`;
    getUserDetails.gender = req.body.gender;
    getUserDetails.birthdate = req.body.birthdate;
    getUserDetails.contact = req.body.contact;
    getUserDetails.address = req.body.address;
    if (profile) {
        getUserDetails.profile = file;
    }
    yield getUserDetails.save();
    profile === null || profile === void 0 ? void 0 : profile.mv(`./assets/${file}`, function (err) {
        if (err)
            return res.status(500).send(err);
    });
    res.json({ success: true, message: "Successfully set gender and birhtdate" });
}));
exports.client.post("/update-profile", jwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const getUserDetails = (yield (0, client_facebook_acc_1.get_facebook_client_from_id)(user._id)) ||
        (yield (0, client_google_acc_1.get_google_client_from_id)(user._id)) ||
        (yield (0, client_1.get_client_from_id)(user._id));
    getUserDetails.gender = req.body.gender;
    getUserDetails.birthdate = req.body.birthdate;
    getUserDetails.contact = req.body.contact;
    getUserDetails.address = req.body.address;
    getUserDetails.name = req.body.name;
    getUserDetails.email = req.body.email;
    getUserDetails.profile = req.body.profile;
    const files = fs_1.default.readdirSync("./assets/upload-photo");
    const file = files.filter((data) => {
        return data === req.body.profile;
    });
    if (file.length !== 0) {
        const sourceFile = `./assets/upload-photo/${file[0]}`;
        const moveFile = "./assets/";
        var source = fs_1.default.readFileSync(sourceFile);
        fs_1.default.writeFileSync(`${moveFile}${file[0]}`, source);
    }
    yield getUserDetails.save();
    res.json({
        data: { message: "successfully update profile.", success: true },
    });
}));
exports.client.post("/change-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    jsonwebtoken_1.default.verify(req.body.ACCESS_TOKEN, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.sendStatus(402);
        }
    });
    yield (0, sendEmail_1.sendEmailToChangePassword)(req.body.email, `http://localhost:4000/edit-password?link=${req.body.link}`);
    res.json({
        data: {
            success: true,
            message: "freight will send a link to your email click it to change your password",
        },
    });
}));
exports.client.get("/edit-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.isChangePass = true;
    res.redirect(req.query.link);
}));
exports.client.get("/close-changepass", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.isChangePass = false;
    res.json({
        data: {
            success: true,
            message: "close change password",
        },
    });
}));
exports.client.post("/changepassword", jwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    delete req.body.confirmPassword;
    const password = req.body.password;
    const hashPass = yield bcryptjs_1.default.hash(password, 10);
    const user = req.user;
    const getUserDetails = (yield (0, client_facebook_acc_1.get_facebook_client_from_id)(user._id)) ||
        (yield (0, client_google_acc_1.get_google_client_from_id)(user._id)) ||
        (yield (0, client_1.get_client_from_id)(user._id));
    getUserDetails.password = hashPass;
    yield getUserDetails.save();
    req.session.isChangePass = false;
    res.json({
        data: {
            success: true,
            message: "Successfully change password",
        },
    });
}));
exports.client.delete("/logout", jwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const getUserDetails = (yield (0, client_facebook_acc_1.get_facebook_client_from_id)(user._id)) ||
        (yield (0, client_google_acc_1.get_google_client_from_id)(user._id)) ||
        (yield (0, client_1.get_client_from_id)(user._id));
    getUserDetails.logoutAt.push(`${new Date().toLocaleString()}`);
    yield getUserDetails.save();
    req.logout(function (err) {
        if (err)
            return res.sendStatus(401);
        res.json({ success: true, redirect: "/" });
    });
}));
