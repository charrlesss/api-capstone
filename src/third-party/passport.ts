import { generateRefreshToken, generateAccessToken } from "./jwt";
import {
  auth_user_with_facebook,
  store_refreshToken_facebook,
} from "../model/methods/client-facebook-acc";
import {
  auth_user_with_google,
  store_refreshToken_google,
} from "../model/methods/client-google-acc";
import GoogleStrategy from "passport-google-oauth20";
import FacebookAuth from "passport-facebook";
import passport from "passport";
import { config } from "dotenv";

config();

passport.use(
  new GoogleStrategy.Strategy(
    {
      scope: ['profile', 'email'],
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/google/callback",
      proxy:true
    },
    async function (accessToken, refreshToken, profile: any, done) {
      const data = {
        auth_type: "google",
        email: profile.emails[0].value,
        profile: profile.photos[0].value,
        name: profile.displayName,
      };
      const userDetails: any = await auth_user_with_google(data.email, data);
      userDetails.loginAt?.push(`${new Date().toLocaleString()}`);
      await userDetails.save();
      const ACCESS_TOKEN = generateAccessToken({ id: userDetails._id });
      const REFRESH_TOKEN = generateRefreshToken({ id: userDetails._id });
      await store_refreshToken_google(userDetails._id, REFRESH_TOKEN);
      const user = {
        _id: userDetails._id,
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
      callbackURL: process.env.NODE_ENV === 'dev' ?"/facebook/callback" : "https://api-admin-capstone.herokuapp.com/facebook",
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

      const userDetails: any = await auth_user_with_facebook(data.email, data);
      userDetails.loginAt?.push(`${new Date().toLocaleString()}`);
      await userDetails.save();
      const ACCESS_TOKEN = generateAccessToken({ id: userDetails._id });
      const REFRESH_TOKEN = generateRefreshToken({ id: userDetails._id });
      await store_refreshToken_facebook(userDetails._id, REFRESH_TOKEN);

      const user = {
        _id: userDetails._id,
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
