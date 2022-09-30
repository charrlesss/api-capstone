"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seadriverModel = void 0;
const mongoose_1 = require("mongoose");
const seadriverSchema = new mongoose_1.Schema({
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
});
exports.seadriverModel = (0, mongoose_1.model)("sea-drivers", seadriverSchema);
