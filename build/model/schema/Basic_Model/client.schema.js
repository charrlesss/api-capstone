"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientModel = void 0;
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
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
    auth_type: {
        type: String,
        default: ""
    },
    loginAt: {
        type: Date,
        default: Date.now()
    },
    refreshToken: {
        type: (Array),
        default: ['']
    }
}, { versionKey: false });
exports.clientModel = (0, mongoose_1.model)("clients", clientSchema);
