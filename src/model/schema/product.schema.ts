import {model ,Schema} from "mongoose";



interface productSchemaType {
  prod_name: string;
}
const productSchema = new Schema({
  prod_name: {
    type: String,
    default: "",
  },
});

const productModel = model<productSchemaType>("prudoct_items", productSchema);

export default productModel;
