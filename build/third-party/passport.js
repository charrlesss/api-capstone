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
const jwt_1 = require("./jwt");
const client_facebook_acc_1 = require("../model/methods/client-facebook-acc");
const client_google_acc_1 = require("../model/methods/client-google-acc");
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
    scope: ["profile", "email"],
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/google/callback",
    proxy: true,
}, function (accessToken, refreshToken, profile, done) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            auth_type: "google",
            email: profile.emails[0].value,
            profile: profile.photos[0].value,
            name: profile.displayName,
        };
        const userDetails = yield (0, client_google_acc_1.auth_user_with_google)(data.email, data);
        (_a = userDetails.loginAt) === null || _a === void 0 ? void 0 : _a.push(`${new Date().toLocaleString()}`);
        yield userDetails.save();
        const ACCESS_TOKEN = (0, jwt_1.generateAccessToken)({ id: userDetails._id });
        const REFRESH_TOKEN = (0, jwt_1.generateRefreshToken)({ id: userDetails._id });
        yield (0, client_google_acc_1.store_refreshToken_google)(userDetails._id, REFRESH_TOKEN);
        const user = {
            _id: userDetails._id,
            ACCESS_TOKEN,
            REFRESH_TOKEN,
        };
        done(null, user);
    });
}));
passport_1.default.use(new passport_facebook_1.default.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://api-admin-capstone.herokuapp.com/facebook/callback",
    profileFields: [
        "id",
        "displayName",
        "name",
        "gender",
        "photos",
        "email",
        "link",
    ],
}, function (accessToken, refreshToken, profile, done) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            name: profile.displayName,
            auth_type: "facebook",
            email: profile.emails[0].value,
            profile: profile.photos[0].value,
        };
        const userDetails = yield (0, client_facebook_acc_1.auth_user_with_facebook)(data.email, data);
        (_a = userDetails.loginAt) === null || _a === void 0 ? void 0 : _a.push(`${new Date().toLocaleString()}`);
        yield userDetails.save();
        const ACCESS_TOKEN = (0, jwt_1.generateAccessToken)({ id: userDetails._id });
        const REFRESH_TOKEN = (0, jwt_1.generateRefreshToken)({ id: userDetails._id });
        yield (0, client_facebook_acc_1.store_refreshToken_facebook)(userDetails._id, REFRESH_TOKEN);
        const user = {
            _id: userDetails._id,
            ACCESS_TOKEN,
            REFRESH_TOKEN,
        };
        done(null, user);
    });
}));
passport_1.default.serializeUser((user, done) => {
    return done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    return done(null, user);
});
