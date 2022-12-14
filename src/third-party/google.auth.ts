import { Router, Response, Request } from "express";
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
  }),
  (req: Request, res: Response) => {
    res.cookie("sidebar", "open");
    if(process.env.NODE_ENV === 'dev'){

      return res.redirect("http://localhost:3000/dashboard");
    }
    return res.redirect('https://facilities-reservation.herokuapp.com/dashboard')
  }
);
