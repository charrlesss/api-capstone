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
exports.get_client_from_id = exports.get_client_from_email = void 0;
const admin_acc_schema_1 = require("../../schema/Basic_Model/admin-acc-schema");
function get_client_from_email(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_acc_schema_1.AdminAccountModel.findOne({ email });
    });
}
exports.get_client_from_email = get_client_from_email;
function get_client_from_id(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_acc_schema_1.AdminAccountModel.findById(id);
    });
}
exports.get_client_from_id = get_client_from_id;
