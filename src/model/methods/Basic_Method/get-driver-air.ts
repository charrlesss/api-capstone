import { airdriverModel } from './../../schema/Basic_Model/driver-air-schema';

export async function get_driver_air(){
  return await airdriverModel.find({})
}
