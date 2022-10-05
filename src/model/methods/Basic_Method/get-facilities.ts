import { facilitiesreservationModel } from "../../schema/Basic_Model/facilities-reservaton.schema";

export async function get_facilities() {
    return await facilitiesreservationModel.find()
}