import { seashpiModel } from './../../schema/Basic_Model/sea-ship.schema';


export async function get_sea_ship(){
  return await seashpiModel.find({})
}
