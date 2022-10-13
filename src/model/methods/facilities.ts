import { facilitiesreservationModel } from "../schema/facilities-reservaton.schema";

export async function get_facilities() {
    return await facilitiesreservationModel.find()
}