"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilitiesreservationModel = void 0;
const mongoose_1 = require("mongoose");
const facilitiesreservationSchema = new mongoose_1.Schema({
    facilityname: {
        type: String,
        default: ''
    },
    facilityimage: {
        type: String,
        default: ''
    },
    facilitydescription: {
        type: String,
        default: ''
    }
}, { versionKey: false });
exports.facilitiesreservationModel = (0, mongoose_1.model)("facilities", facilitiesreservationSchema);
