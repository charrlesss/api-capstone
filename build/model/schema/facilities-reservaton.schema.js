"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilitiesreservationModel = void 0;
const mongoose_1 = require("mongoose");
const client_schema_1 = require("./client.schema");
const facilitiesreservationSchema = new mongoose_1.Schema({
    full_name: {
        type: String,
        ref: client_schema_1.clientModel
    }
}, { versionKey: false });
exports.facilitiesreservationModel = (0, mongoose_1.model)('facility_reservation', facilitiesreservationSchema);
