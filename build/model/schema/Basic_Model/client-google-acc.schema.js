"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienGoogletAccountModel = void 0;
const mongoose_1 = require("mongoose");
const clienGoogletAccountSchema = new mongoose_1.Schema({
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
    },
}, { versionKey: false });
exports.clienGoogletAccountModel = (0, mongoose_1.model)("clients-google-account", clienGoogletAccountSchema);
