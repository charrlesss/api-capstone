"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packagesModel = void 0;
const mongoose_1 = require("mongoose");
const packagesSchema = new mongoose_1.Schema({
    name_of_items: {
        type: String,
        default: ""
    },
    weight: {
        type: String,
        default: ""
    },
    amount_of_box: {
        type: String,
        default: ''
    },
    amount_of_items: {
        type: String,
        default: ''
    },
    items_per_box: {
        type: String,
        default: ''
    },
    package_tracking_id: {
        type: String,
        default: ""
    },
    delivered_date: {
        type: String,
        default: ""
    },
    delivered_time: {
        type: String,
        default: ""
    },
    from: {
        type: String,
        default: ""
    },
    pick_date: {
        type: String,
        default: ""
    },
    pick_time: {
        type: String,
        default: ""
    },
    ship: {
        type: String,
        default: ""
    },
    to: {
        type: String,
        default: ""
    },
    client_details: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'clients'
    }
}, { versionKey: false });
exports.packagesModel = (0, mongoose_1.model)('packages', packagesSchema);
