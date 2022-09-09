import { Router } from "express";
import User from "../controller/Administrative/Products";

const routes = Router();

routes.get("/products", User);




export default routes
