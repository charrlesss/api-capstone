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
    loginAt: {
        type: Date,
        default: Date.now(),
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
    password: {
        type: String,
        default: "",
        require: true
    }
}, { versionKey: false });
exports.clientAccountModel = (0, mongoose_1.model)("clients-account", clientAccountSchema);
