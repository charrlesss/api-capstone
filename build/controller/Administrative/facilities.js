"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_packages_1 = require("../../model/methods/Basic_Method/get-packages");
const get_driver_sea_1 = require("../../model/methods/Basic_Method/get-driver-sea");
const get_driver_land_1 = require("../../model/methods/Basic_Method/get-driver-land");
const get_driver_air_1 = require("../../model/methods/Basic_Method/get-driver-air");
const get_air_ship_1 = require("../../model/methods/Basic_Method/get-air-ship");
const get_land_ship_1 = require("../../model/methods/Basic_Method/get-land-ship");
const get_sea_ship_1 = require("../../model/methods/Basic_Method/get-sea-ship");
const get_client_1 = require("../../model/methods/Basic_Method/get-client");
function facilities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({
            "package": yield (0, get_packages_1.get_package)(),
            "driver-sea": yield (0, get_driver_sea_1.get_driver_sea)(),
            "driver-land": yield (0, get_driver_land_1.get_driver_land)(),
            "get_driver_air": yield (0, get_driver_air_1.get_driver_air)(),
            "get_air_ship": yield (0, get_air_ship_1.get_air_ship)(),
            "get_land_ship": yield (0, get_land_ship_1.get_land_ship)(),
            "get_sea_ship": yield (0, get_sea_ship_1.get_sea_ship)(),
            "get_client": yield (0, get_client_1.get_client)()
        });
    });
}
exports.default = facilities;
