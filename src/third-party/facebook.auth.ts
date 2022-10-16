import { Router} from "express";
import passport from "passport";

export const facebookAuthRouter = Router();


facebookAuthRouter.get(
  "/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

facebookAuthRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    successRedirect:"https://localhost:3000/dashboard"
  })
);





