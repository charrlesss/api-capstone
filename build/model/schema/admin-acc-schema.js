"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAccountModel = void 0;
const mongoose_1 = require("mongoose");
const AdminAccountSchema = new mongoose_1.Schema({
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
    loginAt: {
        type: (Array),
        default: [""],
    },
    logoutAt: {
        type: (Array),
        default: [""],
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
        require: true,
    },
    verify: {
        type: Boolean,
        default: true,
    },
    verifyCode: {
        type: String,
        default: "",
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleString(),
    },
}, { versionKey: false });
exports.AdminAccountModel = (0, mongoose_1.model)("admin-account", AdminAccountSchema);
