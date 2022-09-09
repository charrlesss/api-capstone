import { Router, json } from "express";
import cors from "cors";

const midlewareRoutes = Router();

midlewareRoutes.use(json());
midlewareRoutes.use(
  cors({ origin: "http://localhost:3000", credentials: true })
);

export default midlewareRoutes;
