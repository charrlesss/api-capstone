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
exports.get_client_from_id = exports.update_refreshToken = exports.get_client_from_email = exports.check_refreshToken = exports.store_refreshToken = exports.auth_user = exports.get_client = void 0;
const client_acc_schema_1 = require("../../schema/Basic_Model/client-acc.schema");
function get_client() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield client_acc_schema_1.clientAccountModel.find({});
    });
}
exports.get_client = get_client;
const auth_user = (email, params) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_acc_schema_1.clientAccountModel.findOne({ email: email });
    if (user)
        return { messages: "this email is already used.", success: false };
    yield (yield client_acc_schema_1.clientAccountModel.create(params)).save();
    return { messages: "Successfuly create account.", success: true };
});
exports.auth_user = auth_user;
const store_refreshToken = (_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_acc_schema_1.clientAccountModel
        .findById(_id)
        .updateOne({ refreshToken: [token] });
});
exports.store_refreshToken = store_refreshToken;
const check_refreshToken = (_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_acc_schema_1.clientAccountModel.findById(_id).where({ refreshToken: token });
});
exports.check_refreshToken = check_refreshToken;
const get_client_from_email = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_acc_schema_1.clientAccountModel.findOne({ email: email });
});
exports.get_client_from_email = get_client_from_email;
const update_refreshToken = (userId, refreshtoken) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_acc_schema_1.clientAccountModel.findById(userId).updateOne({ refreshToken: [refreshtoken] });
});
exports.update_refreshToken = update_refreshToken;
const get_client_from_id = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_acc_schema_1.clientAccountModel.findById(userId);
});
exports.get_client_from_id = get_client_from_id;
