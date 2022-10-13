import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";

config();
const sevenDays = 1000 * 60 * 60 * 24 * 7;

export const generateAccessToken = (user: { id: any }): string => {
  return jwt.sign(user, process.env.ACCESS_TOKEN as string, {
    expiresIn: "30m",
  });
};

export const generateRefreshToken = (user: { id: any }): string => {
  return jwt.sign(user, process.env.REFRESH_TOKEN as string, {
    expiresIn: sevenDays,
  });
};

export function verifyToken(req:Request, res:Response, next:NextFunction) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
        

      jwt.verify(bearerToken, process.env.ACCESS_TOKEN as string, function(err:any, decoded:any) {
        if(err)return res.sendStatus(402)
       return next();
    });

    } else {
      res.sendStatus(403);
    }
  }

