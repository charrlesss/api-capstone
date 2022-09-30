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
exports.practice = void 0;
const packages_schema_1 = require("./../schema/packages.schema");
function practice() {
    return __awaiter(this, void 0, void 0, function* () {
        // packagesModel.create({client_details:"6324089b8b2f575dee778d9b"})
        const user = yield packages_schema_1.packagesModel.find().populate('client_details', 'full_name');
        console.log(user);
    });
}
exports.practice = practice;
