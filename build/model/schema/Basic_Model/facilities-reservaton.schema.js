"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilitiesreservationModel = void 0;
const mongoose_1 = require("mongoose");
const facilitiesreservationSchema = new mongoose_1.Schema({
    client_details: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "clients",
    },
    package: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "packages",
    },
    ship_air: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "air-ships",
    },
    ship_land: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "land-ships",
    },
    ship_water: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "sea-ships",
    },
    driver_water: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "sea-drivers",
    },
    driver_air: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "air-drivers",
    },
    driver_land: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "land-driver",
    },
}, { versionKey: false });
exports.facilitiesreservationModel = (0, mongoose_1.model)("facility_reservation", facilitiesreservationSchema);
