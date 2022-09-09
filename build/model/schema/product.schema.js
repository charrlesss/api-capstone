"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    prod_name: {
        type: String,
        default: "",
    },
});
const productModel = (0, mongoose_1.model)("prudoct_items", productSchema);
exports.default = productModel;
