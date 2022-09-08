const productModel = require('../schema/product.schema.js')

module.exports = async function getAllProducts(){
    return await productModel.find({})
}