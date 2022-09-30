import { landdriverModel } from './../../schema/Basic_Model/drivers-land.schema';

export async function get_driver_land(){
  return await landdriverModel.find({})
}
