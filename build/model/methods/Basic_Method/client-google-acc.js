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
exports.get_google_client_from_id = exports.check_refreshToken_google = exports.store_refreshToken_google = exports.auth_user_with_google = exports.get_client_google_acc = void 0;
const client_google_acc_schema_1 = require("../../schema/Basic_Model/client-google-acc.schema");
function get_client_google_acc() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield client_google_acc_schema_1.clienGoogletAccountModel.find({});
    });
}
exports.get_client_google_acc = get_client_google_acc;
const auth_user_with_google = (email, params) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_google_acc_schema_1.clienGoogletAccountModel.findOne({ email: email });
    if (user)
        return user;
    return yield (yield client_google_acc_schema_1.clienGoogletAccountModel.create(params)).save();
});
exports.auth_user_with_google = auth_user_with_google;
const store_refreshToken_google = (_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_google_acc_schema_1.clienGoogletAccountModel.findById(_id).updateOne({ refreshToken: [token] });
});
exports.store_refreshToken_google = store_refreshToken_google;
const check_refreshToken_google = (_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_google_acc_schema_1.clienGoogletAccountModel.findById(_id).where({ refreshToken: token });
});
exports.check_refreshToken_google = check_refreshToken_google;
const get_google_client_from_id = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_google_acc_schema_1.clienGoogletAccountModel.findById(userId);
});
exports.get_google_client_from_id = get_google_client_from_id;
