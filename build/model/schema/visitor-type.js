"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorTypeModel = void 0;
const mongoose_1 = require("mongoose");
const visitorTypeSchema = new mongoose_1.Schema({
    typeofVisitory: {
        type: String,
        default: "",
    },
}, { versionKey: false });
exports.visitorTypeModel = (0, mongoose_1.model)("visitor-type", visitorTypeSchema);
