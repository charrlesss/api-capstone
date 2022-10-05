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
exports.client = void 0;
const express_1 = require("express");
const jwt_1 = require("../third-party/jwt");
const get_client_acc_1 = require("../model/methods/Basic_Method/get-client-acc");
const get_client_facebook_acc_1 = require("../model/methods/Basic_Method/get-client-facebook-acc");
const get_client_google_acc_1 = require("../model/methods/Basic_Method/get-client-google-acc");
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
    const getUserDetails = (yield (0, get_client_facebook_acc_1.get_facebook_client_from_id)(user._id)) ||
        (yield (0, get_client_google_acc_1.get_google_client_from_id)(user._id)) ||
        (yield (0, get_client_acc_1.get_client_from_id)(user._id));
    res.json({
        data: getUserDetails,
    });
}));
exports.client.post('/complete-details', jwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const getUserDetails = (yield (0, get_client_facebook_acc_1.get_facebook_client_from_id)(user._id)) ||
        (yield (0, get_client_google_acc_1.get_google_client_from_id)(user._id)) ||
        (yield (0, get_client_acc_1.get_client_from_id)(user._id));
    getUserDetails.gender = req.body.gender;
    getUserDetails.birthdate = req.body.birthdate;
    yield getUserDetails.save();
    res.json({ success: true, message: "Successfully set gender and birhtdate" });
}));
exports.client.delete("/logout", jwt_1.verifyToken, (req, res) => {
    req.logout(function (err) {
        if (err)
            return res.sendStatus(401);
        res.json({ success: true, redirect: "/" });
    });
});
