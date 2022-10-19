import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import getAuthentication from "../features/shared/presentation/slices/authentication.slices";
import getClient from "../features/shared/presentation/slices/client.slices";
import getAuthUser from "../features/shared/presentation/slices/auth-user.slice";
import getRegisterUser from "./../features/shared/presentation/slices/register-user.slice";
import getLogoutClient from "../features/shared/presentation/slices/logout.slice";
import getCompleteDetailsUser from "../features/shared/presentation/slices/complete-details";
import getFacilities from "../features/Administrative/client/facilities/presentation/slices/facilities.slice";
import uploadPhoto from "../features/shared/presentation/slices/upload-photo";
import getUploadPhoto from "../features/shared/presentation/slices/get-uploded-photo";
import updateProfile from "../features/shared/presentation/slices/update-profile.slice";
import linkToChangePassword from "../features/Administrative/client/profile/presentation/slices/link-to-changepassword.slices";
import changePassword from "../features/Administrative/client/profile/presentation/slices/change-password.slices";
import backChangePassword from "../features/Administrative/client/profile/presentation/slices/back-change-password.slice";
import getVisitorTypes from "../features/Administrative/client/make-appointment-request/presentation/slices/get-visitor-types.slices";
import verifyUserEmail from "../features/shared/presentation/slices/verify-email.slices";
import verifyUserEmailWithCode from "../features/shared/presentation/slices/verify-email-with-code";
import removeAccountNotVerified from "../features/shared/presentation/slices/remove-acc-not-verified";
import adminAuthentication from "../features/Administrative/admin/presentation/slices/admin-authentication.slices";
import isAuthenticatedAdmin from "../features/Administrative/admin/presentation/slices/is-authenticated-admin.slices";
import getAdminDetails from "../features/Administrative/admin/presentation/slices/get-admin-datails.slice";
import forgotPassword from "../features/shared/presentation/slices/forgot-password.slices";
import forgotPaswordCodeVerification from "../features/shared/presentation/slices/forgot-password-code-verification.slices";
import forgotPaswordAuthorize from "../features/shared/presentation/slices/forgot-password-authorize.slice";
import forgotPasswordUpdate from "../features/shared/presentation/slices/forgot-password-updated";

export const store = configureStore({
  reducer: {
    getAuthentication,
    getClient,
    getAuthUser,
    getRegisterUser,
    verifyUserEmail,
    verifyUserEmailWithCode,
    getLogoutClient,
    getCompleteDetailsUser,
    getFacilities,
    uploadPhoto,
    getUploadPhoto,
    updateProfile,
    linkToChangePassword,
    changePassword,
    backChangePassword,
    getVisitorTypes,
    removeAccountNotVerified,
    adminAuthentication,
    isAuthenticatedAdmin,
    getAdminDetails,
    forgotPassword,
    forgotPaswordCodeVerification,
    forgotPaswordAuthorize,
    forgotPasswordUpdate
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
