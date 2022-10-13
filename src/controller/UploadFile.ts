import { Request, Response, Router } from "express";
import { verifyToken } from "../third-party/jwt";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";

export const uploadfile = Router();

uploadfile.post("/upload-file" ,verifyToken, async (req: Request, res: Response) => {
  const profile = req.files?.updloadProfile as UploadedFile;
  const filename = uuidv4();
  const mimetype = profile?.mimetype.split("/")[1];
  const file = `${filename}.${mimetype}`;
  req.session.profile = file;
  profile?.mv(`./assets/upload-photo/${file}`, function (err) {
    if (err)
      return res.json({
        data: { filename: undefined, message: err, success: false },
      });
  });

  res.json({
    data: { filename: file, message: "successfully upload", success: true },
  });
});



