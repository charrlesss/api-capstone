import { model, Schema } from "mongoose";

const facilitiesreservationSchema = new Schema(
  {
    client_details: {
      type: Schema.Types.ObjectId,
      ref: "clients",
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: "packages",
    },
    ship_air: {
      type: Schema.Types.ObjectId,
      ref: "air-ships",
    },
    ship_land: {
      type: Schema.Types.ObjectId,
      ref: "land-ships",
    },
    ship_water: {
      type: Schema.Types.ObjectId,
      ref: "sea-ships",
    },
    driver_water: {
      type: Schema.Types.ObjectId,
      ref: "sea-drivers",
    },
    driver_air: {
      type: Schema.Types.ObjectId,
      ref: "air-drivers",
    },
    driver_land: {
      type: Schema.Types.ObjectId,
      ref: "land-driver",
    },
  },
  { versionKey: false }
);


export const facilitiesreservationModel = model(
  "facility_reservation",
  facilitiesreservationSchema
);
