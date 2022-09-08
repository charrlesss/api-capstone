const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  prod_name: {
    type: String,
    default: "",
  },
});

const productModel = mongoose.model("prudoct_items", productSchema);

module.exports = productModel;
