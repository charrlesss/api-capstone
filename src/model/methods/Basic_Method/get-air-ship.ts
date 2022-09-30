
import {airshpiModel} from '../../schema/Basic_Model/air-ship.schema'

export async function get_air_ship(){
  return await airshpiModel.find({})
}
