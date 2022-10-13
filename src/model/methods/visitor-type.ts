import { visitorTypeModel } from "../schema/visitor-type";



export async function get_visitor_types() {
    return await visitorTypeModel.find()
}

