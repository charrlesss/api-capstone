import { model, Schema } from "mongoose";


const seashpiShema = new Schema({
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

export const seashpiModel = model("sea-ships", seashpiShema);