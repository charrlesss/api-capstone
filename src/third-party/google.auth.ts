import { Router } from "express";
import passport from "passport";

export const googleAuthRouter = Router();

googleAuthRouter.get("/login", (req, res) => {
  res.sendStatus(404).json({ message: "failure login" });
});

googleAuthRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

googleAuthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:3000/dashboard",
  })
);
