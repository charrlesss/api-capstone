const LocalStrategy = require("passport-local").Strategy;
import bcryptjs from "bcryptjs";
import { store_refreshToken } from "../model/methods/Basic_Method/get-client-acc";
import { generateAccessToken, generateRefreshToken } from "./jwt";

export function initialize(
  passport: any,
  getUserByEmail: any,
  getUserById: any
) {
  const authenticateUser = async (email: any, password: any, done: any) => {
    const user = await getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "No user with that email"  ,success:false});
    }
    try {
      if (await bcryptjs.compare(password, user.password)) {
        const _id = user._id;
        const ACCESS_TOKEN = generateAccessToken({ id: _id });
        const REFRESH_TOKEN = generateRefreshToken({ id: _id });
        await store_refreshToken(_id, REFRESH_TOKEN);
        const authUser = {
          _id,
          ACCESS_TOKEN,
          REFRESH_TOKEN,
        };

        return done(null, authUser);
      } else {
        return done(null, false, { message: "Password incorrect"  , success:false});
      }
    } catch (e) {
      console.log(e);
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user: any, done: any) => done(null, user.id));
  passport.deserializeUser((id: any, done: any) => {
    return done(null, getUserById(id));
  });
}
