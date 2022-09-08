const express = require("express");
require("dotenv").config();
const connectDB = require("./connect.db.js");
const getProductModel = require("./model/schema/product.schema.js");
const app = express();
const PORT = 4000;



async function main() {
  try {

    app.use(express.json())

    app.get("/",async (req, res) => {

      res.send(await getProductModel.find({}));
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
