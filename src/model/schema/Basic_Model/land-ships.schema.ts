import { model, Schema } from "mongoose";


const landshpiShema = new Schema({
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

export const landshpiModel = model("land-ships", landshpiShema);
