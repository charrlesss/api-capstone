import express, { Express } from "express";
import dotenv from "dotenv";
import connectDb from "./connect.db";
import middleware from "./config/middleware";
import appRoutes from "./config/routers";
dotenv.config();

const app: Express = express();
const PORT: number = 4000;

async function main(): Promise<void> {
  try {
    app.enable('trust proxy')
    app.use(middleware);
    app.use(appRoutes);

    await connectDb();
    app.listen(process.env.PORT || PORT, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${PORT}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();
