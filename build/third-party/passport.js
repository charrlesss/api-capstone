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
const get_client_facebook_acc_1 = require("../model/methods/Basic_Method/get-client-facebook-acc");
const get_client_google_acc_1 = require("../model/methods/Basic_Method/get-client-google-acc");
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/google/callback",
}, function (accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            auth_type: "google",
            email: profile.emails[0].value,
            profile: profile.photos[0].value,
            name: profile.displayName,
        };
        const { _id } = yield (0, get_client_google_acc_1.auth_user_with_google)(data.email, data);
        const ACCESS_TOKEN = (0, jwt_1.generateAccessToken)({ id: _id });
        const REFRESH_TOKEN = (0, jwt_1.generateRefreshToken)({ id: _id });
        yield (0, get_client_google_acc_1.store_refreshToken_google)(_id, REFRESH_TOKEN);
        const user = {
            _id,
            ACCESS_TOKEN,
            REFRESH_TOKEN,
        };
        done(null, user);
    });
}));
passport_1.default.use(new passport_facebook_1.default.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/facebook/callback",
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
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            name: profile.displayName,
            auth_type: "facebook",
            email: profile.emails[0].value,
            profile: profile.photos[0].value,
        };
        const { _id } = yield (0, get_client_facebook_acc_1.auth_user_with_facebook)(data.email, data);
        const ACCESS_TOKEN = (0, jwt_1.generateAccessToken)({ id: _id });
        const REFRESH_TOKEN = (0, jwt_1.generateRefreshToken)({ id: _id });
        yield (0, get_client_facebook_acc_1.store_refreshToken_facebook)(_id, REFRESH_TOKEN);
        const user = {
            _id,
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
