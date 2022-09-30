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
exports.initialize = void 0;
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const get_client_acc_1 = require("../model/methods/Basic_Method/get-client-acc");
const jwt_1 = require("./jwt");
function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = (email, password, done) => __awaiter(this, void 0, void 0, function* () {
        const user = yield getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: "No user with that email", success: false });
        }
        try {
            if (yield bcryptjs_1.default.compare(password, user.password)) {
                const _id = user._id;
                const ACCESS_TOKEN = (0, jwt_1.generateAccessToken)({ id: _id });
                const REFRESH_TOKEN = (0, jwt_1.generateRefreshToken)({ id: _id });
                yield (0, get_client_acc_1.store_refreshToken)(_id, REFRESH_TOKEN);
                const authUser = {
                    _id,
                    ACCESS_TOKEN,
                    REFRESH_TOKEN,
                };
                return done(null, authUser);
            }
            else {
                return done(null, false, { message: "Password incorrect", success: false });
            }
        }
        catch (e) {
            console.log(e);
            return done(e);
        }
    });
    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}
exports.initialize = initialize;
