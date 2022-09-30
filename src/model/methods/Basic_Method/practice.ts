import { facilitiesreservationModel } from "../../schema/Basic_Model/facilities-reservaton.schema";

export async function practice() {
  const user = await facilitiesreservationModel
    .find()
    .populate(
      "client_details driver_land driver_air driver_water ship_water ship_land ship_air package",
      "full_name name_of_items"
    );

  console.log(user);
}
