"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientModel = void 0;
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    full_name: {
        type: String,
        default: "",
    },
    image_id: {
        type: String,
        default: "",
    },
    contact: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    confirm: {
        type: Boolean,
        default: "",
    },
    package_details: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'package'
    }
}, { versionKey: false });
exports.clientModel = (0, mongoose_1.model)("clients", clientSchema);
