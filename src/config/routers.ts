import { Router, Request, Response, NextFunction } from "express";
import { googleAuthRouter } from "../third-party/google.auth";
import { facebookAuthRouter } from "../third-party/facebook.auth";
import { client } from "../controller/Client";
import { refreshTokenRoute } from "../third-party/refreshToken";
import { auth } from "../controller/Authentication";
import { register } from "../controller/RegisterUser";
import cors from 'cors'
import { facilities } from "../controller/Facilities";
const routes = Router();


routes.use(cors({ origin: "http://localhost:3000", credentials: true }));


routes.use(googleAuthRouter);
routes.use(facebookAuthRouter);
routes.use(auth)
routes.use(register)
routes.use(client);
routes.use(refreshTokenRoute)
routes.use(facilities)






export default routes;


