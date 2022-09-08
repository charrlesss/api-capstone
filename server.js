const express = require("express");
require("dotenv").config();
const connectDB = require("./connect.db.js");
const getAllProducts = require("./model/methods/get-all-products.js");
const cors = require('cors')
const app = express();
const PORT = 4000;



async function main() {
  try {

    app.use(express.json())
    app.use(cors({origin:"http://localhost:3000" , credentials:true}))

    app.get("/",async (req, res) => {

      res.json(await getAllProducts());
    });

    await connectDB();
    app.listen(process.env.PORT || PORT, () =>
      console.log(`listen in port ${PORT}`)
    )
  } catch (err) {
    console.log(err);
  }
}

main();
