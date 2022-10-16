import session from 'express-session';
import express from "express";

declare module 'express-session' {
  export interface SessionData {
    user: any,
    profile:string
    isChangePass:(boolean| undefined)
    verifying:boolean | null
    emailToVerify:string | null
    removeAll:boolean
    admin:{
      ACCESS_TOKEN:string,
      REFRESH_TOKEN:string,
      _id:any
    }
    forgotpaswordEmail:string,
    forgotpaswordVerify:boolean
}
}


declare global {
  namespace Express {
    interface Request {
      file?: Record<any>
    }
  }
}