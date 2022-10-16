import { model, Schema } from "mongoose";

const facilitiesreservationSchema = new Schema(
  {
    facilityname:{
      type:String,
      default:''
    },
    facilityimage:{
      type:String,
      default:''
    },
    facilitydescription:{
      type:String,
      default:''
    },
    amenities:{
      type:Array<string>,
      default:['']
    },
    services:{
      type:Array<string>,
      default:['']
    }
  },
  { versionKey: false }
);


export const facilitiesreservationModel = model(
  "facilities",
  facilitiesreservationSchema
);
