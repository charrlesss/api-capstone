import { Request, Response } from "express";
import getAllProducts from "../../model/methods/get-all-products";


export default async function Products(req: Request, res: Response) {
  res.json(await getAllProducts());
}
