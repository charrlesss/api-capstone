import { Request, Response, Router } from "express";
import bcryptjs from "bcryptjs";
import { auth_user, get_client_from_email } from "../model/methods/Basic_Method/get-client-acc";

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

  const user = await auth_user(req.body.email, {
    name: fullname,
    password: hashPass,
    ...rest,
  });

  return res.json(user);
});

