"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airshpiModel = void 0;
const mongoose_1 = require("mongoose");
const airshpiShema = new mongoose_1.Schema({
    name: {
        type: String,
        default: "",
    },
    ship_id: {
        type: String,
        default: "",
    },
    ship_type: {
        type: String,
        default: "",
    }
}, { versionKey: false });
exports.airshpiModel = (0, mongoose_1.model)("air-ships", airshpiShema);
