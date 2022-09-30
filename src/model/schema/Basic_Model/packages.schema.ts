import { model , Schema } from "mongoose";

const packagesSchema = new Schema({
    name_of_items: {
        type:String,
        default:""
    },
    weight: {
        type:String,
        default:""
    },
    amount_of_box: {
        type:String,
        default:''
    },
    amount_of_items: {
        type:String,
        default:''
    },
    items_per_box: {
        type:String,
        default:''
    },
    package_tracking_id: {
        type:String,
        default:""
    },
    delivered_date: {
        type:String,
        default:""
    },
    delivered_time: {
        type:String,
        default:""
    },
    from: {
        type:String,
        default:""
    },
    pick_date: {
        type:String,
        default:""
    },
    pick_time: {
        type:String,
        default:""
    },
    ship: {
        type:String,
        default:""
    },
    to: {
        type:String,
        default:""
    },
    client_details:{
        type:Schema.Types.ObjectId,
        ref:'clients'
    }
    
},{versionKey:false})

export const packagesModel = model('packages',packagesSchema)