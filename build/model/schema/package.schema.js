"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const packageSchema = new mongoose_1.Schema({
    name_of_items: {
        type: String,
        default: "",
    },
    weight: {
        type: String,
        default: "",
    },
    amount_of_box: {
        type: Number,
        default: 0,
    },
    amount_of_items: {
        type: Number,
        default: 0,
    },
    items_per_box: {
        type: Number,
        default: 0,
    },
    package_tracking_id: {
        type: String,
        default: "",
    },
    delivered_date: {
        type: String,
        default: "",
    },
    delivered_time: {
        type: String,
        default: "",
    },
    from: {
        type: String,
        default: "",
    },
    pick_date: {
        type: String,
        default: "",
    },
    pick_time: {
        type: String,
        default: "",
    },
    ship: {
        type: String,
        default: "",
    },
    to: {
        type: String,
        default: "",
    },
}, { versionKey: false });
const packageModel = (0, mongoose_1.model)("package", packageSchema);
exports.default = packageModel;
// amount_of_box: { type: Number, default: 0 },
// amount_of_items: { type: Number, default: 0 },
// items_per_box: { type: Number, default: 0 },
// package_tracking_id: { type: String, default: "" },
// delivered_date: { type: String, default: "" },
// delivered_time: { type: String, default: "" },
// pick_date: { type: String, default: "" },
// pick_time: { type: String, default: "" },
// ship: { type: String, default: "" },
// from: { type: String, default: "" },
// to: { type: String, default: "" }
// amount_of_box: number;
//   amount_of_items: number;
//   items_per_box: number;
//   package_tracking_id: string;
//   delivered_date: string;
//   delivered_time: string;
//   pick_date: string;
//   pick_time: string;
//   ship: string;
//   from: string;
//   to: string;
