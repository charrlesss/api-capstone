// const express = require("express");
// require("dotenv").config();
// const connectDB = require("./connect.db.js");
// const getAllProducts = require("./model/methods/get-all-products.js");
// const cors = require('cors')
// const app = express();
// const PORT = 4000;

// async function main() {
//   try {

//     app.use(express.json())
//     app.use(cors({origin:"http://localhost:3000" , credentials:true}))

//     app.get("/",async (req, res) => {

//       res.json(await getAllProducts());
//     });

//     await connectDB();
//     app.listen(process.env.PORT || PORT, () =>
//       console.log(`listen in port ${PORT}`)
//     )
//   } catch (err) {
//     console.log(err);
//   }
// }

// main();

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./connect.db";
import getAllProducts from "./model/methods/get-all-products";

dotenv.config();

const app: Express = express();
const PORT: number = 4000;

async function main() {
  try {
    app.use(express.json());
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));

    app.get("/", async (req: Request, res: Response) => {
      res.json(await getAllProducts());
    });

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
