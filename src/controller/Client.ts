import { Request, Response, Router } from "express";
import { verifyToken } from "../third-party/jwt";
import { get_client_from_id } from "../model/methods/Basic_Method/get-client-acc";
import { get_facebook_client_from_id } from "../model/methods/Basic_Method/get-client-facebook-acc";
import { get_google_client_from_id } from "../model/methods/Basic_Method/get-client-google-acc";
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

    const getUserDetails =
      (await get_facebook_client_from_id(user._id)) ||
      (await get_google_client_from_id(user._id)) ||
      (await get_client_from_id(user._id));

    res.json({
      data: getUserDetails,
    });
  }
);

client.post('/complete-details',verifyToken ,async (req,res)=>{
  const user: any = req.user;
  const getUserDetails:any =
  (await get_facebook_client_from_id(user._id)) ||
  (await get_google_client_from_id(user._id)) ||
  (await get_client_from_id(user._id));
  getUserDetails.gender = req.body.gender
  getUserDetails.birthdate = req.body.birthdate
  await getUserDetails.save()
 

  res.json({success:true,message:"Successfully set gender and birhtdate"})
})



client.delete("/logout", verifyToken, (req: Request, res: Response) => {
  req.logout(function (err) {
    if (err) return res.sendStatus(401);
    res.json({ success: true, redirect: "/" });
  });
});
