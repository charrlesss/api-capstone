"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const authentication_slices_1 = __importDefault(require("../features/shared/presentation/slices/authentication.slices"));
const client_slices_1 = __importDefault(require("../features/shared/presentation/slices/client.slices"));
const auth_user_slice_1 = __importDefault(require("../features/shared/presentation/slices/auth-user.slice"));
const register_user_slice_1 = __importDefault(require("./../features/shared/presentation/slices/register-user.slice"));
const logout_slice_1 = __importDefault(require("../features/shared/presentation/slices/logout.slice"));
const complete_details_1 = __importDefault(require("../features/shared/presentation/slices/complete-details"));
const facilities_slice_1 = __importDefault(require("../features/Administrative/client/facilities/presentation/slices/facilities.slice"));
const upload_photo_1 = __importDefault(require("../features/shared/presentation/slices/upload-photo"));
const get_uploded_photo_1 = __importDefault(require("../features/shared/presentation/slices/get-uploded-photo"));
const update_profile_slice_1 = __importDefault(require("../features/shared/presentation/slices/update-profile.slice"));
const link_to_changepassword_slices_1 = __importDefault(require("../features/Administrative/client/profile/presentation/slices/link-to-changepassword.slices"));
const change_password_slices_1 = __importDefault(require("../features/Administrative/client/profile/presentation/slices/change-password.slices"));
const back_change_password_slice_1 = __importDefault(require("../features/Administrative/client/profile/presentation/slices/back-change-password.slice"));
const get_visitor_types_slices_1 = __importDefault(require("../features/Administrative/client/make-appointment-request/presentation/slices/get-visitor-types.slices"));
const verify_email_slices_1 = __importDefault(require("../features/shared/presentation/slices/verify-email.slices"));
const verify_email_with_code_1 = __importDefault(require("../features/shared/presentation/slices/verify-email-with-code"));
const remove_acc_not_verified_1 = __importDefault(require("../features/shared/presentation/slices/remove-acc-not-verified"));
const admin_authentication_slices_1 = __importDefault(require("../features/Administrative/admin/presentation/slices/admin-authentication.slices"));
const is_authenticated_admin_slices_1 = __importDefault(require("../features/Administrative/admin/presentation/slices/is-authenticated-admin.slices"));
const get_admin_datails_slice_1 = __importDefault(require("../features/Administrative/admin/presentation/slices/get-admin-datails.slice"));
const forgot_password_slices_1 = __importDefault(require("../features/shared/presentation/slices/forgot-password.slices"));
const forgot_password_code_verification_slices_1 = __importDefault(require("../features/shared/presentation/slices/forgot-password-code-verification.slices"));
const forgot_password_authorize_slice_1 = __importDefault(require("../features/shared/presentation/slices/forgot-password-authorize.slice"));
const forgot_password_updated_1 = __importDefault(require("../features/shared/presentation/slices/forgot-password-updated"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        getAuthentication: authentication_slices_1.default,
        getClient: client_slices_1.default,
        getAuthUser: auth_user_slice_1.default,
        getRegisterUser: register_user_slice_1.default,
        verifyUserEmail: verify_email_slices_1.default,
        verifyUserEmailWithCode: verify_email_with_code_1.default,
        getLogoutClient: logout_slice_1.default,
        getCompleteDetailsUser: complete_details_1.default,
        getFacilities: facilities_slice_1.default,
        uploadPhoto: upload_photo_1.default,
        getUploadPhoto: get_uploded_photo_1.default,
        updateProfile: update_profile_slice_1.default,
        linkToChangePassword: link_to_changepassword_slices_1.default,
        changePassword: change_password_slices_1.default,
        backChangePassword: back_change_password_slice_1.default,
        getVisitorTypes: get_visitor_types_slices_1.default,
        removeAccountNotVerified: remove_acc_not_verified_1.default,
        adminAuthentication: admin_authentication_slices_1.default,
        isAuthenticatedAdmin: is_authenticated_admin_slices_1.default,
        getAdminDetails: get_admin_datails_slice_1.default,
        forgotPassword: forgot_password_slices_1.default,
        forgotPaswordCodeVerification: forgot_password_code_verification_slices_1.default,
        forgotPaswordAuthorize: forgot_password_authorize_slice_1.default,
        forgotPasswordUpdate: forgot_password_updated_1.default
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
