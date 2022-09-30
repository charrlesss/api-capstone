import { seadriverModel } from './../../schema/Basic_Model/drivers-sea.schema';

export  async function get_driver_sea(){
  return await seadriverModel.find({})
}
