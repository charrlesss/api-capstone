import { Router, Response, Request } from "express";
import {
  get_admin_from_email,
  store_refreshToken_from_admin,
  get_admin_from_id
} from "../model/methods/admin";
import bcryptjs from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../third-party/jwt";
export const admin = Router();

admin.post("/auth-admin", async (req: Request, res: Response) => {
  console.log(req.body);
  const user: any = await get_admin_from_email(req.body.email);

  if (!user) {
    return res.json({
      data: {
        message: "No user with that email",
        success: false,
      },
    });
  }

  try {
    if (await bcryptjs.compare(req.body.password, user.password)) {
      user.loginAt?.push(`${new Date().toLocaleString()}`);
      await user.save();

      const _id = user._id;
      const ACCESS_TOKEN = generateAccessToken({ id: _id });
      const REFRESH_TOKEN = generateRefreshToken({ id: _id });
      await store_refreshToken_from_admin(_id, REFRESH_TOKEN);

      const authUser = {
        _id,
        ACCESS_TOKEN,
        REFRESH_TOKEN,
      };

      req.session.admin = authUser;
      res.cookie('sidebar' ,'open')
      return res.json({
        data: { message: "successfuly login.", success: true },
      });
    } else {
      return res.json({
        data: {
          message: "Password incorrect",
          success: false,
        },
      });
    }
  } catch (e) {
    return res.json({
      data: {
        message: `${e}`,
        success: false,
      },
    });
  }
});

admin.get("/authenticated-admin", async (req: Request, res: Response) => {

  if (req.session.admin) {
    return res.json({
      data: {
        message: "Authorise User",
        data: req.session.admin,
        success: true,
      },
    });
  }


  return res.json({
    data: {
      message: "Not Authorize User",
      data: { _id: "", ACCESS_TOKEN: "", REFRESH_TOKEN: "" },
      success: false,
    },
  });
});



admin.get("/get-admin-details",verifyToken, async (req: Request, res: Response) => {

  return res.json({
    data: {
      message: "Not Authorize User",
      data: await get_admin_from_id(req.session.admin?._id as any),
      success: false,
    },
  });
});