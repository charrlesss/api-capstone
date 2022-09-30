"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landshpiModel = void 0;
const mongoose_1 = require("mongoose");
const landshpiShema = new mongoose_1.Schema({
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
exports.landshpiModel = (0, mongoose_1.model)("land-ships", landshpiShema);
