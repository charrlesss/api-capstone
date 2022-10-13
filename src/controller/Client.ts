import { Request, Response, Router } from "express";
import { verifyToken } from "../third-party/jwt";
import { get_client_from_id } from "../model/methods/client";
import { get_facebook_client_from_id } from "../model/methods/client-facebook-acc";
import { get_google_client_from_id } from "../model/methods/client-google-acc";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { sendEmailToChangePassword } from "../lib/sendEmail";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const client = Router();

client.get("/authenticated-user", async function (req: Request, res: Response) {
  if (req.user) {
    req.session.user = req.session.user ? req.session.user : req.user;
    return res.json({
      message: "Authorise User",
      user: req.session.user,
      success: true,
    });
  }

  return res.json({ message: "Not Authorize User", data: [], success: false });
});

client.get(
  "/get-client-details",
  verifyToken,
  async (req: Request, res: Response) => {
    if (req.user === undefined) return res.sendStatus(401);
    const user: any = req.user;

    const getUserDetails: any =
      (await get_facebook_client_from_id(user._id)) ||
      (await get_google_client_from_id(user._id)) ||
      (await get_client_from_id(user._id));
    req.session.isChangePass =
      req.session.isChangePass === undefined ? false : req.session.isChangePass;
    const userDetails: any = {
      ...getUserDetails._doc,
      changePass: req.session.isChangePass,
    };

    res.json({
      data: userDetails,
    });
  }
);

client.post("/complete-details", verifyToken, async (req, res) => {
  const user: any = req.user;
  const getUserDetails: any =
    (await get_facebook_client_from_id(user._id)) ||
    (await get_google_client_from_id(user._id)) ||
    (await get_client_from_id(user._id));

  const profile = req.files?.profile as UploadedFile;
  const filename = uuidv4();
  const mimetype = profile?.mimetype.split("/")[1];
  const file = `${filename}.${mimetype}`;

  getUserDetails.gender = req.body.gender;
  getUserDetails.birthdate = req.body.birthdate;
  getUserDetails.contact = req.body.contact;
  getUserDetails.address = req.body.address;

  if (profile) {
    getUserDetails.profile = file;
  }

  await getUserDetails.save();
  profile?.mv(`./assets/${file}`, function (err) {
    if (err) return res.status(500).send(err);
  });

  res.json({ success: true, message: "Successfully set gender and birhtdate" });
});

client.post(
  "/update-profile",
  verifyToken,
  async (req: Request, res: Response) => {
    const user: any = req.user;
    const getUserDetails: any =
      (await get_facebook_client_from_id(user._id)) ||
      (await get_google_client_from_id(user._id)) ||
      (await get_client_from_id(user._id));

    getUserDetails.gender = req.body.gender;
    getUserDetails.birthdate = req.body.birthdate;
    getUserDetails.contact = req.body.contact;
    getUserDetails.address = req.body.address;
    getUserDetails.name = req.body.name;
    getUserDetails.email = req.body.email;
    getUserDetails.profile = req.body.profile;

    const files = fs.readdirSync("./assets/upload-photo");
    const file = files.filter((data) => {
      return data === req.body.profile;
    });
    if (file.length !== 0) {
      const sourceFile = `./assets/upload-photo/${file[0]}`;
      const moveFile = "./assets/";

      var source = fs.readFileSync(sourceFile);
      fs.writeFileSync(`${moveFile}${file[0]}`, source);
    }

    await getUserDetails.save();

    res.json({
      data: { message: "successfully update profile.", success: true },
    });
  }
);

client.post("/change-password", async (req: Request, res: Response) => {
  jwt.verify(
    req.body.ACCESS_TOKEN,
    process.env.ACCESS_TOKEN as string,
    function (err: any, decoded: any) {
      if (err) {
        return res.sendStatus(402);
      }
    }
  );

  await sendEmailToChangePassword(
    req.body.email,
    `http://localhost:4000/edit-password?link=${req.body.link}`
  );

  res.json({
    data: {
      success: true,
      message:
        "freight will send a link to your email click it to change your password",
    },
  });
});

client.get("/edit-password", async (req: Request, res: Response) => {
  req.session.isChangePass = true;
  res.redirect(req.query.link as string);
});

client.get("/close-changepass", async (req: Request, res: Response) => {
  req.session.isChangePass = false;

  res.json({
    data: {
      success: true,
      message: "close change password",
    },
  });
});

client.post(
  "/changepassword",
  verifyToken,
  async (req: Request, res: Response) => {
    delete req.body.confirmPassword;

    const password: string = req.body.password;
    const hashPass = await bcryptjs.hash(password, 10);
    const user: any = req.user;

    const getUserDetails: any =
      (await get_facebook_client_from_id(user._id)) ||
      (await get_google_client_from_id(user._id)) ||
      (await get_client_from_id(user._id));

    getUserDetails.password = hashPass;

    await getUserDetails.save();

    req.session.isChangePass = false;

    res.json({
      data: {
        success: true,
        message: "Successfully change password",
      },
    });
  }
);

client.delete("/logout", verifyToken, async (req: Request, res: Response) => {
  const user: any = req.user;
  const getUserDetails: any =
    (await get_facebook_client_from_id(user._id)) ||
    (await get_google_client_from_id(user._id)) ||
    (await get_client_from_id(user._id));
  getUserDetails.logoutAt.push(`${new Date().toLocaleString()}`);
  await getUserDetails.save();
  req.logout(function (err) {
    if (err) return res.sendStatus(401);
    res.json({ success: true, redirect: "/" });
  });
});
