import { generateRefreshToken, generateAccessToken } from "./jwt";
import {
  auth_user_with_facebook,
  store_refreshToken_facebook,
} from "../model/methods/Basic_Method/get-client-facebook-acc";
import {
  auth_user_with_google,
  store_refreshToken_google,
} from "../model/methods/Basic_Method/get-client-google-acc";
import GoogleStrategy from "passport-google-oauth20";
import FacebookAuth from "passport-facebook";
import passport from "passport";
import { config } from "dotenv";

config();

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/google/callback",
    },
    async function (accessToken, refreshToken, profile: any, done) {
      const data = {
        auth_type: "google",
        email: profile.emails[0].value,
        profile: profile.photos[0].value,
        name: profile.displayName,
      };
      const { _id } = await auth_user_with_google(data.email, data);
      const ACCESS_TOKEN = generateAccessToken({ id: _id });
      const REFRESH_TOKEN = generateRefreshToken({ id: _id });
      await store_refreshToken_google(_id, REFRESH_TOKEN);
      const user = {
        _id,
        ACCESS_TOKEN,
        REFRESH_TOKEN,
      };

      done(null, user);
    }
  )
);

passport.use(
  new FacebookAuth.Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: "/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "name",
        "gender",
        "photos",
        "email",
        "link",
      ],
    },
    async function (accessToken, refreshToken, profile: any, done) {
      const data = {
        name: profile.displayName,
        auth_type: "facebook",
        email: profile.emails[0].value,
        profile: profile.photos[0].value,
      };

      const { _id } = await auth_user_with_facebook(data.email, data);
      const ACCESS_TOKEN = generateAccessToken({ id: _id });
      const REFRESH_TOKEN = generateRefreshToken({ id: _id });
      await store_refreshToken_facebook(_id, REFRESH_TOKEN);

      const user = {
        _id,
        ACCESS_TOKEN,
        REFRESH_TOKEN,
      };
      done(null, user);
    }
  )
);

passport.serializeUser((user: any, done) => {
  return done(null, user);
});

passport.deserializeUser((user: any, done) => {
  return done(null, user);
});


