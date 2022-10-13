import { model, Schema } from "mongoose";
const clientFacebookAccountSchema = new Schema(
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
    loginAt: {
      type: Array<string>,
      default: [''],
    },
    logoutAt: {
      type: Array<string>,
      default: [''],
    },
    createdAt: {
      type: String,
      default: new Date().toLocaleString(),
    },
    gender: {
      type: String,
      default: "",
    },
    birthdate: {
      type: String,
      default: "",
    },
    contact:{
      type: String,
      default: "",
    },
    address:{
      type: String,
      default: "",
    },
    password:{
      type: String,
      default: "",
    }
  },
  { versionKey: false }
);

export const clientFacebookAccountModel = model(
  "clients-facebook-account",
  clientFacebookAccountSchema
);
