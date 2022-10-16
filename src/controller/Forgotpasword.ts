import { Router, Response, Request } from "express";

import { generateCode } from "../lib/generate-code";
import { sendEmailToVerifyAccount } from "../lib/sendEmail";
import { get_client_from_email } from "../model/methods/client";
import { get_user_by_email_facebook } from "../model/methods/client-facebook-acc";
import { get_user_by_email_goggle } from "../model/methods/client-google-acc";
import bcryptjs from "bcryptjs";
export const Forgotpasword = Router();

Forgotpasword.get(
  "/forgotpassword-authorize",
  async (req: Request, res: Response) => {
    res.json({
      data: {
        success: true,
        messages: "fetch forgot password authorization",
        data: {
          authorized:
            req.session.forgotpaswordVerify !== undefined ? true : false,
        },
      },
    });
  }
);

Forgotpasword.post(
  "/forgotpassword-email",
  async (req: Request, res: Response) => {
    try {
      const code = generateCode();
      const email = req.body.email;
      const user: any =
        (await get_client_from_email(email)) ||
        (await get_user_by_email_goggle(email)) ||
        (await get_user_by_email_facebook(email));

      user.verifyCode = code;
      await user.save();
      await sendEmailToVerifyAccount(req.body.email, code);

      req.session.forgotpaswordEmail = email;
      res.json({
        data: {
          success: true,
          message: "successfuly send code to - " + email,
        },
      });
    } catch (err) {
      res.json({
        data: {
          success: false,
          message: err,
        },
      });
    }
  }
);

Forgotpasword.post(
  "/forgotpassword-code",
  async (req: Request, res: Response) => {
    try {
      const code = req.body.code;
      const email = req.session.forgotpaswordEmail;
      const user: any =
        (await get_client_from_email(email)) ||
        (await get_user_by_email_goggle(email)) ||
        (await get_user_by_email_facebook(email));

      if (user.verifyCode !== code) {
        return res.json({
          data: {
            success: false,
            message: "Invalid Code",
          },
        });
      }

      user.verifyCode = "";
      await user.save();
      req.session.forgotpaswordVerify = true;
      res.json({
        data: {
          success: true,
          message: "successfuly verify ",
        },
      });
    } catch (err) {
      res.json({
        data: {
          success: false,
          message: err,
        },
      });
    }
  }
);

Forgotpasword.post(
  "/forgotpassword-update",
  async (req: Request, res: Response) => {
    try {
      delete req.body.confirmPassword;
      const email = req.session.forgotpaswordEmail;
      const password = req.body.password;
      const newPassword = await bcryptjs.hash(password, 10);
      const client: any = await get_client_from_email(email);
      const clientgoogle: any = await get_user_by_email_goggle(email);
      const clientfacebook: any = await get_user_by_email_facebook(email);

      client.password = newPassword;
      clientgoogle.password = newPassword;
      clientfacebook.password = newPassword;
      await client.save();
      await clientgoogle.save();
      await clientfacebook.save();

      req.session.forgotpaswordVerify = undefined;
      req.session.forgotpaswordEmail = undefined;

      res.json({
        data: {
          success: true,
          message: "successfuly change password ",
        },
      });
    } catch (err) {
      res.json({
        data: {
          success: false,
          message: err,
        },
      });
    }
  }
);
