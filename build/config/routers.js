"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Forgotpasword_1 = require("../controller/Forgotpasword");
const express_1 = require("express");
const google_auth_1 = require("../third-party/google.auth");
const facebook_auth_1 = require("../third-party/facebook.auth");
const Client_1 = require("../controller/Client");
const refreshToken_1 = require("../third-party/refreshToken");
const Authentication_1 = require("../controller/Authentication");
const RegisterUser_1 = require("../controller/RegisterUser");
const cors_1 = __importDefault(require("cors"));
const Facilities_1 = require("../controller/Facilities");
const UploadFile_1 = require("../controller/UploadFile");
const MakeAppointmentRequest_1 = require("../controller/MakeAppointmentRequest");
const Admin_1 = require("../controller/Admin");
const routes = (0, express_1.Router)();
routes.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://facilities-reservation.herokuapp.com",
        "http://localhost:5500",
    ],
    credentials: true,
}));
routes.use(Admin_1.admin);
routes.use(google_auth_1.googleAuthRouter);
routes.use(facebook_auth_1.facebookAuthRouter);
routes.use(Authentication_1.auth);
routes.use(RegisterUser_1.register);
routes.use(Forgotpasword_1.Forgotpasword);
routes.use(Client_1.client);
routes.use(refreshToken_1.refreshTokenRoute);
routes.use(Facilities_1.facilities);
routes.use(UploadFile_1.uploadfile);
routes.use(MakeAppointmentRequest_1.makeAppointmentRequest);
exports.default = routes;
