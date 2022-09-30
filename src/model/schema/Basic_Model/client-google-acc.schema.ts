import { model, Schema } from "mongoose";

const clienGoogletAccountSchema = new Schema(
  {
    email: {
      type: String,
      default: "",
    },
    profile: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    loginAt: {
      type: Date,
      default: Date.now(),
    },
    refreshToken: {
      type: Array<String>,
      default: [""],
    },
    gender: {
      type: String,
      default: "",
    },
    birthdate: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

export const clienGoogletAccountModel = model(
  "clients-google-account",
  clienGoogletAccountSchema
);
