import { Router,Request,Response} from "express";
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
  }),(req:Request,res:Response)=>{

    res.cookie('sidebar' ,'open')
    // if(process.env.NODE_ENV === 'dev'){

    
    // }

    // return res.redirect("http://localhost:3000/production")

    return res.redirect("http://localhost:3000/dashboard");
  }
);





