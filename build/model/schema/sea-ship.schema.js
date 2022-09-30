"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seashpiModel = void 0;
const mongoose_1 = require("mongoose");
const seashpiShema = new mongoose_1.Schema({
    name: {
        type: String,
        default: "",
    },
    ship_id: {
        type: String,
        default: "",
    },
    air: {
        type: String,
        default: "",
    }
}, { versionKey: false });
exports.seashpiModel = (0, mongoose_1.model)("sea-ships", seashpiShema);
