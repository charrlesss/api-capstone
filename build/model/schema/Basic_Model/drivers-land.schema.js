"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landdriverModel = void 0;
const mongoose_1 = require("mongoose");
const landdriverSchema = new mongoose_1.Schema({
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
exports.landdriverModel = (0, mongoose_1.model)("land-driver", landdriverSchema);
