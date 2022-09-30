import { Request, Response, Router } from "express";
import { check_refreshToken } from "../model/methods/Basic_Method/get-client-acc";
import { check_refreshToken_facebook } from "../model/methods/Basic_Method/get-client-facebook-acc";
import { check_refreshToken_google } from "../model/methods/Basic_Method/get-client-google-acc";
import { generateAccessToken } from "./jwt";
import jwt from "jsonwebtoken";
export const refreshTokenRoute = Router();

refreshTokenRoute.post(
  "/refresh-token",
  async function Client(req: Request, res: Response) {
    const refreshToken = req.body.REFRESH_TOKEN;
    const id = req.body.id;
    const isHaveRefreshToken =
      (await check_refreshToken(id, refreshToken)) ||
      (await check_refreshToken_facebook(id, refreshToken)) ||
      (await check_refreshToken_google(id, refreshToken));
    if (!refreshToken) return res.sendStatus(401);
    if (!isHaveRefreshToken) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN as string,
      (err: any, data: any) => {
        if (err) return res.sendStatus(403);
        const newAccessToken = generateAccessToken({ id });
        req.session.user = {
          ACCESS_TOKEN: newAccessToken,
          REFRESH_TOKEN: refreshToken,
          _id: id,
        };
        res.json({ success: true });
      }
    );
  }
);
