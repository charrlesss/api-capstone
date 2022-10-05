import { Request, Response, Router } from "express";
import { verifyToken } from "../third-party/jwt";
import { get_facilities } from "../model/methods/Basic_Method/get-facilities";
export const facilities = Router();

facilities.get("/facilities",verifyToken,async (req: Request, res: Response) => {

    return res.json(await get_facilities())
});


