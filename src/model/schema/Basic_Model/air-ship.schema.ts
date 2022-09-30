import { model, Schema } from "mongoose";


const airshpiShema = new Schema({
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
},{versionKey:false});

export const airshpiModel = model("air-ships", airshpiShema);
