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
    loginAt: {
      type: Array<string>,
      default: [""],
    },
    logoutAt: {
      type: Array<string>,
      default: [""],
    },
    createdAt: {
      type: String,
      default: new Date().toLocaleString(),
    },
    contact: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
      require: true,
    },
  },
  { versionKey: false }
);

export const clientAccountModel = model("clients-account", clientAccountSchema);
