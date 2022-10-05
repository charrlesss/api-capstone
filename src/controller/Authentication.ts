import { Router ,Response,Request,NextFunction} from "express";

import passport from "passport";
export const auth = Router();

auth.post(
  "/auth-user", (req:Request,res:Response,next:NextFunction)=>{
    passport.authenticate("local", (err:any,user:any,info:any)=>{
      if(err) return next(err)

      if(!user && info.message){
        return res.json(info)
      }

      req.login(user, function(err){
        if(err){
          return next(err);
        }
        res.cookie('sidebar' ,'open')
        return res.json({message:'successfuly login.' ,success:true})      
      })

    })(req,res,next)
  });
