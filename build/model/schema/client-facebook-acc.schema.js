"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientFacebookAccountModel = void 0;
const mongoose_1 = require("mongoose");
const clientFacebookAccountSchema = new mongoose_1.Schema({
    email: {
        type: String,
        default: "",
    },
    profile: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    refreshToken: {
        type: (Array),
        default: [""],
    },
    loginAt: {
        type: (Array),
        default: [''],
    },
    logoutAt: {
        type: (Array),
        default: [''],
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleString(),
    },
    gender: {
        type: String,
        default: "",
    },
    birthdate: {
        type: String,
        default: "",
    },
    contact: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    }
}, { versionKey: false });
exports.clientFacebookAccountModel = (0, mongoose_1.model)("clients-facebook-account", clientFacebookAccountSchema);
