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
exports.check_refreshToken_admin = exports.store_refreshToken_from_admin = exports.get_admin_from_id = exports.get_admin_from_email = void 0;
const admin_acc_schema_1 = require("../schema/admin-acc-schema");
function get_admin_from_email(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_acc_schema_1.AdminAccountModel.findOne({ email });
    });
}
exports.get_admin_from_email = get_admin_from_email;
function get_admin_from_id(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin_acc_schema_1.AdminAccountModel.findById(id);
    });
}
exports.get_admin_from_id = get_admin_from_id;
const store_refreshToken_from_admin = (_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield admin_acc_schema_1.AdminAccountModel
        .findById(_id)
        .updateOne({ refreshToken: [token] });
});
exports.store_refreshToken_from_admin = store_refreshToken_from_admin;
const check_refreshToken_admin = (_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield admin_acc_schema_1.AdminAccountModel.findById(_id).where({ refreshToken: token });
});
exports.check_refreshToken_admin = check_refreshToken_admin;
