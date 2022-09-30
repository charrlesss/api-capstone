import { model, Schema } from "mongoose";

const clientAccountSchema = new Schema(
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
    password:{
      type: String,
      default: "",
      require:true
    }
  },
  { versionKey: false }
);

export const clientAccountModel = model("clients-account", clientAccountSchema);
