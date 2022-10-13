import { model, Schema } from "mongoose";

const AdminAccountSchema = new Schema(
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
      type: Array<string>,
      default: [""],
    },
    logoutAt: {
      type: Array<string>,
      default: [""],
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
    contact: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
      require: true,
    },
    verify: {
      type: Boolean,
      default: true,
    },
    verifyCode: {
      type: String,
      default: "",
    },
    createdAt: {
      type: String,
      default: new Date().toLocaleString(),
    },
  },
  { versionKey: false }
);

export const AdminAccountModel = model("admin-account", AdminAccountSchema);
