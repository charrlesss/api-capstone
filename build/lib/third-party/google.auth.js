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
exports.googleAuth = void 0;
const get_client_1 = require("../../model/methods/Basic_Method/get-client");
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_ID);
function googleAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.body;
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_ID,
        });
        const payload = ticket.getPayload();
        const user = yield (0, get_client_1.newUser)({
            name: payload === null || payload === void 0 ? void 0 : payload.name,
            email: payload === null || payload === void 0 ? void 0 : payload.email,
            profile: payload === null || payload === void 0 ? void 0 : payload.picture,
            type_of_login: "google-login",
        });
        req.session.user = user._id.toString();
        res.status(201);
        res.json(user);
    });
}
exports.googleAuth = googleAuth;
