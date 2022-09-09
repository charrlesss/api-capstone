import  productModel  from '../schema/product.schema'

export default async function getAllProducts():Promise<Array<{prod_name:string , _id:string} | null>>{
    return await productModel.find({})
}