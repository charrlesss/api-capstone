import express, { Router } from "express";
import cors from "cors";
import session from "express-session";
import CookieParser from "cookie-parser";
import passport from "passport";
import "../third-party/passport";
import bodyParser from "body-parser";
import { initializeClientAuth } from "../third-party/local-strategy";
import {
  get_client_from_email,
  get_client_from_id,
} from "../model/methods/client";
import flash from "connect-flash";
import fileUpload from "express-fileupload";

const middleware = Router();

const sevenDays = 1000 * 60 * 60 * 24 * 7;

middleware.use("/uploads", express.static("./assets"));
middleware.use(bodyParser.json());
middleware.use(bodyParser.urlencoded({ extended: true }));
middleware.use(cors({ origin: "http://localhost:3000", credentials: true }));
middleware.use(CookieParser());
middleware.use(fileUpload({ createParentPath: true }));
middleware.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: sevenDays,
    },
  })
);
middleware.use(flash());

initializeClientAuth(
  passport,
  async (email: any) => {
    return await get_client_from_email(email);
  },
  async (id: any) => {
    return await get_client_from_id(id);
  }
);

middleware.use(passport.initialize());
middleware.use(passport.session());

export default middleware;
