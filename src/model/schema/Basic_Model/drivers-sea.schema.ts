import { model, Schema } from "mongoose";

const seadriverSchema = new Schema({
  first_name: {
    type: String,
    default: "",
  },
  midle_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },
  type_of_driver: {
    type: String,
    default: "",
  },
  license: {
    type: String,
    default: "",
  },
  work_hour: {
    type: String,
    default: "",
  },
  delivering: {
    type: String,
    default: "",
  },
},{versionKey:false});

export const seadriverModel = model("sea-drivers", seadriverSchema);