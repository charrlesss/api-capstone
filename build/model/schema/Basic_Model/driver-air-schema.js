"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airdriverModel = void 0;
const mongoose_1 = require("mongoose");
const airdriverSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        default: "",
    },
    midle_name: {
        type: String,
        default: "",
    },
    last_name: {
        type: String,
        default: "",
    },
    type_of_driver: {
        type: String,
        default: "",
    },
    license: {
        type: String,
        default: "",
    },
    work_hour: {
        type: String,
        default: "",
    },
    delivering: {
        type: String,
        default: "",
    },
}, { versionKey: false });
exports.airdriverModel = (0, mongoose_1.model)("air-drivers", airdriverSchema);
