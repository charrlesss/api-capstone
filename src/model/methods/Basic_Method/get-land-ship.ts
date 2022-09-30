import { landshpiModel } from './../../schema/Basic_Model/land-ships.schema';

export async function get_land_ship(){
  return await landshpiModel.find({})
}
