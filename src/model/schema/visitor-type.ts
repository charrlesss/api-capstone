import { model, Schema } from "mongoose";

const visitorTypeSchema = new Schema(
  {
    typeofVisitory: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

export const visitorTypeModel = model(
  "visitor-type",
  visitorTypeSchema
);
