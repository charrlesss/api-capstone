import { Request, Response ,Router } from "express";
import { verifyToken } from "../third-party/jwt";

export const client = Router();


client.get('/authenticated-user',async function (req: Request, res: Response) {
  if (req.user) {

    req.session.user =  req.session.user ?  req.session.user :  req.user
    return res.json({ message: "Authorise User", user:   req.session.user  ,success:true});
  }

  return res.json({ message: "Not Authorize User", data: [] ,success:false });
})




client.get('/get-client-details',verifyToken,async function (req: Request, res: Response) {
  res.json({
    data:"asdasdasdasd"
  });
})
