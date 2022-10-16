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
exports.get_user_by_email_facebook = exports.get_facebook_client_from_id = exports.check_refreshToken_facebook = exports.store_refreshToken_facebook = exports.auth_user_with_facebook = exports.get_client_facebook_acc = void 0;
const client_facebook_acc_schema_1 = require("./../schema/client-facebook-acc.schema");
function get_client_facebook_acc() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield client_facebook_acc_schema_1.clientFacebookAccountModel.find({});
    });
}
exports.get_client_facebook_acc = get_client_facebook_acc;
const auth_user_with_facebook = (email, params) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_facebook_acc_schema_1.clientFacebookAccountModel.findOne({ email: email });
    if (user)
        return user;
    return yield (yield client_facebook_acc_schema_1.clientFacebookAccountModel.create(params)).save();
});
exports.auth_user_with_facebook = auth_user_with_facebook;
const store_refreshToken_facebook = (_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_facebook_acc_schema_1.clientFacebookAccountModel
        .findById(_id)
        .updateOne({ refreshToken: [token] });
});
exports.store_refreshToken_facebook = store_refreshToken_facebook;
const check_refreshToken_facebook = (_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_facebook_acc_schema_1.clientFacebookAccountModel
        .findById(_id)
        .where({ refreshToken: token });
});
exports.check_refreshToken_facebook = check_refreshToken_facebook;
const get_facebook_client_from_id = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_facebook_acc_schema_1.clientFacebookAccountModel.findById(userId);
});
exports.get_facebook_client_from_id = get_facebook_client_from_id;
const get_user_by_email_facebook = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_facebook_acc_schema_1.clientFacebookAccountModel.findOne({ email });
});
exports.get_user_by_email_facebook = get_user_by_email_facebook;
