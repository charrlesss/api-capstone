import { Request, Response, Router } from "express";
import bcryptjs from "bcryptjs";
import {
  get_client_from_email,
  remove_acc_by_email,
  store_new_user,
  verify_code_send,
} from "../model/methods/client";
import { generateCode } from "../lib/generate-code";
import { sendEmailToVerifyAccount } from "../lib/sendEmail";
import { v4 as uuidV4 } from "uuid";
export const register = Router();

const arrayOfRandomProfileIconForUserFeMale: Array<string> = [
  "girl1.jpg",
  "girl2.jpg",
  "girl3.jpg",
];
const arrayOfRandomProfileIconForUserMale: Array<string> = [
  "boy1.jpg",
  "boy2.jpg",
  "boy3.jpg",
];

register.post("/register-user", async function (req: Request, res: Response) {
  delete req.body.confirmPassword;

  const randomNumber = Math.floor(Math.random() * 3);
  let profile: string | null;
  if (req.body.gender.toLowerCase() === "male") {
    profile = arrayOfRandomProfileIconForUserMale[randomNumber];
  } else {
    profile = arrayOfRandomProfileIconForUserFeMale[randomNumber];
  }

  const { fullname, password, ...rest }: any = { profile, ...req.body };
  const hashPass = await bcryptjs.hash(password, 10);

  const getUserFromEmail = await get_client_from_email(req.body.email);

  if (getUserFromEmail) {
    return res.json({ message: "this email is already used.", success: false });
  }

  res.cookie("verifying", uuidV4(), { maxAge: 99999999, httpOnly: true });
  res.cookie("email_to_verify", req.body.email, {
    maxAge: 99999999,
    httpOnly: true,
    secure: true,
  });

  const code = generateCode();

  await store_new_user({
    name: fullname,
    password: hashPass,
    ...rest,
    verifyCode: code,
  });
  console.log("asdasd");
  await sendEmailToVerifyAccount(req.body.email, code);

  return res.json({ message: "Successfuly create account.", success: true });
});

register.get("/verifying-account", (req, res) => {
  res.json({
    data: {
      verifying: req.cookies["verifying"] !== undefined,
      email: req.cookies["email_to_verify"],
    },
  });
});

register.post(
  "/verifying-account-with-code",
  async (req: Request, res: Response) => {
    const getUser = await verify_code_send(req.body.email, req.body.code);

    if (!getUser) {
      return res.json({ data: { message: "Invalid Code ", success: false } });
    }
    getUser.verify = true;
    getUser.verifyCode = "";
    await getUser.save();
    res.clearCookie("verifying");
    res.clearCookie("email_to_verify");

    res.json({ data: { message: "successfully verify", success: true } });
  }
);

register.post("/not-verify-account", async (req: Request, res: Response) => {
  await remove_acc_by_email(req.body.email);
  res.clearCookie("verifying");
  res.clearCookie("email_to_verify");
  res.json({
    data: {
      message:
        "Your account has been removed by the system because it is no longer verified",
      success: true,
    },
  });
});
