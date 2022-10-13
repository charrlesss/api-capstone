import { Router, Response, Request } from "express";
import { get_visitor_types } from "../model/methods/visitor-type";

export const makeAppointmentRequest = Router();

makeAppointmentRequest.get(
  "/visitor-types",
  async (req: Request, res: Response) => {
    res.json({
      data: {
        message: "fetch successfully",
        data: await get_visitor_types(),
        success: false,
      },
    });
  }
);
