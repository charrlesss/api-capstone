"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAccountModel = void 0;
const mongoose_1 = require("mongoose");
const clientAccountSchema = new mongoose_1.Schema({
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
    gender: {
        type: String,
        default: "",
    },
    birthdate: {
        type: String,
        default: "",
    },
    loginAt: {
        type: (Array),
        default: [""],
    },
    logoutAt: {
        type: (Array),
        default: [""],
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleString(),
    },
    contact: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verifyCode: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
        require: true,
    },
}, { versionKey: false });
exports.clientAccountModel = (0, mongoose_1.model)("clients-account", clientAccountSchema);
