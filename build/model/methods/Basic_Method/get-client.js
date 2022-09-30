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
exports.checkRefreshToken = exports.storeRefreshToken = exports.authUser = exports.get_client = void 0;
const client_acc_schema_1 = require("../../schema/Basic_Model/client-acc.schema");
function get_client() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield client_acc_schema_1.clientAccountModel.find({});
    });
}
exports.get_client = get_client;
const authUser = (email, auth_type, params) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_acc_schema_1.clientAccountModel.findOne({ email: email }).where({ auth_type });
    if (user)
        return user;
    return yield (yield client_acc_schema_1.clientAccountModel.create(params)).save();
});
exports.authUser = authUser;
const storeRefreshToken = (_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_acc_schema_1.clientAccountModel.findById(_id).updateOne({ refreshToken: [token] });
});
exports.storeRefreshToken = storeRefreshToken;
const checkRefreshToken = (_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_acc_schema_1.clientAccountModel.findById(_id).where({ refreshToken: token });
});
exports.checkRefreshToken = checkRefreshToken;
