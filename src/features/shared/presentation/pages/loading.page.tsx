import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/dispatch-selector.hooks";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthUserState, selectAuthUser } from "../slices/auth-user.slice";
import {
  selectRegisterUser,
  RegisterClientState,
} from "../slices/register-user.slice";
import {
  selectCompleteDetailsUser,
  completeDetailsState,
} from "../slices/complete-details";
import { SigninSignupComponent } from "../components/signin-signup.component";
import { selectUploadPhoto, UploadPhotoState } from "../slices/upload-photo";
import {
  selectUpdateProfile,
  UpdateProfileState,
} from "../slices/update-profile.slice";

import {
  selectVerifyUserEmailWithCode,
  VerifyUserEmailWithCodeState,
} from "../slices/verify-email-with-code";
import {
  RemoveAccountNotVerifiedState,
  selectRemoveAccountNotVerified,
} from "../slices/remove-acc-not-verified";
import {
  selectLinkToChangePassword,
  LinkToChangepasswordState,
} from "../../../Administrative/client/profile/presentation/slices/link-to-changepassword.slices";
import {
  selectChangePassword,
  ChangepasswordState,
} from "../../../Administrative/client/profile/presentation/slices/change-password.slices";
import {
  selectForgotPassword,
  ForgotPaswordState,
} from "../slices/forgot-password.slices";
import {
  selectForgotPaswordCodeVerification,
  ForgotPaswordCodeVerificationState,
} from "../slices/forgot-password-code-verification.slices";
import {
  selectForgotPaswordUpdate,
  ForgotPaswordUpdateState,
} from "../slices/forgot-password-updated";

export const LoadingPage: React.FC = (): JSX.Element => {
  const AuthUserSignin: any = useAppSelector(selectAuthUser);
  const RegisterUserSignup: any = useAppSelector(selectRegisterUser);
  const CompleteDetailsUser: any = useAppSelector(selectCompleteDetailsUser);
  const linkToChangePassword: any = useAppSelector(selectLinkToChangePassword);
  const changePassword: any = useAppSelector(selectChangePassword);
  const verifyUserEmailWithCode: any = useAppSelector(
    selectVerifyUserEmailWithCode
  );
  const removeAccountNotVerified: any = useAppSelector(
    selectRemoveAccountNotVerified
  );

  const [openLoginChooserModal, setOpenLoginChooserModal] =
    useState<boolean>(false);
  const [openBackdropLoading, setOpenBackdropLoading] = useState(false);
  const uploadPhoto: any = useAppSelector(selectUploadPhoto);
  const updateProfile: any = useAppSelector(selectUpdateProfile);
  const forgotPasword: any = useAppSelector(selectForgotPassword);
  const forgotPaswordCodeVerification: any = useAppSelector(
    selectForgotPaswordCodeVerification
  );
  const forgotPaswordUpdate: any = useAppSelector(selectForgotPaswordUpdate);

  const [successAlert, setSuccessAlert] = useState<{
    status: boolean;
    message?: string;
  }>({
    status: false,
  });

  const [failsAlert, setFailsAlert] = useState<{
    status: boolean;
    message?: string;
  }>({
    status: false,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (AuthUserSignin.status) {
      case AuthUserState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case AuthUserState.initial:
        setOpenBackdropLoading(false);
        break;
      case AuthUserState.success:
        if (!AuthUserSignin.data.success) {
          showAlert(setFailsAlert, AuthUserSignin.data.message);
          setOpenBackdropLoading(false);
          return;
        }
        console.log(AuthUserSignin.data.message);
        showAlert(setSuccessAlert, AuthUserSignin.data.message);
        setOpenBackdropLoading(false);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
        break;
      case AuthUserState.fail:
        showAlert(setFailsAlert, AuthUserSignin.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [AuthUserSignin, dispatch]);

  useEffect(() => {
    switch (RegisterUserSignup.status) {
      case RegisterClientState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case RegisterClientState.initial:
        setOpenBackdropLoading(false);
        break;
      case RegisterClientState.success:
        if (!RegisterUserSignup.data.success) {
          showAlert(setFailsAlert, RegisterUserSignup.data.message);
          setOpenBackdropLoading(false);
          return;
        }
        showAlert(setSuccessAlert, RegisterUserSignup.data.message);
        window.location.href = "/";
        setOpenBackdropLoading(false);
        break;
      case RegisterClientState.fail:
        showAlert(setFailsAlert, RegisterUserSignup.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [RegisterUserSignup, dispatch]);

  useEffect(() => {
    switch (verifyUserEmailWithCode.status) {
      case VerifyUserEmailWithCodeState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case VerifyUserEmailWithCodeState.initial:
        setOpenBackdropLoading(false);
        break;
      case VerifyUserEmailWithCodeState.success:
        if (!verifyUserEmailWithCode.data.success) {
          showAlert(setFailsAlert, verifyUserEmailWithCode.data.message);
          setOpenBackdropLoading(false);
          return;
        }
        showAlert(setSuccessAlert, verifyUserEmailWithCode.data.message);
        setOpenBackdropLoading(false);
        setOpenLoginChooserModal(true);
        break;
      case VerifyUserEmailWithCodeState.fail:
        showAlert(setFailsAlert, verifyUserEmailWithCode.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [verifyUserEmailWithCode, dispatch]);
  useEffect(() => {
    switch (removeAccountNotVerified.status) {
      case RemoveAccountNotVerifiedState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case RemoveAccountNotVerifiedState.initial:
        setOpenBackdropLoading(false);
        break;
      case RemoveAccountNotVerifiedState.success:
        showAlert(setFailsAlert, removeAccountNotVerified.data.message);
        setOpenBackdropLoading(false);
        window.location.reload();
        break;
      case RemoveAccountNotVerifiedState.fail:
        showAlert(setFailsAlert, removeAccountNotVerified.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [removeAccountNotVerified, dispatch]);

  useEffect(() => {
    switch (CompleteDetailsUser.status) {
      case completeDetailsState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case completeDetailsState.initial:
        setOpenBackdropLoading(false);
        break;
      case completeDetailsState.success:
        showAlert(setSuccessAlert, CompleteDetailsUser.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setOpenBackdropLoading(false);
        break;
      case completeDetailsState.fail:
        showAlert(setFailsAlert, CompleteDetailsUser.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [CompleteDetailsUser, dispatch]);

  useEffect(() => {
    switch (uploadPhoto.status) {
      case UploadPhotoState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UploadPhotoState.initial:
        setOpenBackdropLoading(false);
        break;
      case UploadPhotoState.success:
        window.localStorage.setItem(
          "upload-photo",
          uploadPhoto?.data?.filename
        );

        showAlert(setSuccessAlert, uploadPhoto?.data?.message);

        setOpenBackdropLoading(false);
        window.location.reload();

        break;
      case UploadPhotoState.fail:
        showAlert(setFailsAlert, uploadPhoto.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [uploadPhoto, dispatch]);

  useEffect(() => {
    switch (updateProfile.status) {
      case UpdateProfileState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case UpdateProfileState.initial:
        setOpenBackdropLoading(false);
        break;
      case UpdateProfileState.success:
        window.localStorage.removeItem("upload-photo");
        showAlert(setSuccessAlert, updateProfile?.data?.message);

        setOpenBackdropLoading(false);
        window.location.reload();
        break;
      case UpdateProfileState.fail:
        showAlert(setFailsAlert, updateProfile?.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [updateProfile, dispatch]);

  useEffect(() => {
    switch (linkToChangePassword.status) {
      case LinkToChangepasswordState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case LinkToChangepasswordState.initial:
        setOpenBackdropLoading(false);
        break;
      case LinkToChangepasswordState.success:
        showAlert(setSuccessAlert, linkToChangePassword?.data?.message);
        setOpenBackdropLoading(false);
        break;
      case LinkToChangepasswordState.fail:
        showAlert(setFailsAlert, linkToChangePassword?.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [linkToChangePassword, dispatch]);

  useEffect(() => {
    switch (changePassword.status) {
      case ChangepasswordState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case ChangepasswordState.initial:
        setOpenBackdropLoading(false);
        break;
      case ChangepasswordState.success:
        showAlert(setSuccessAlert, changePassword?.data?.message);
        setOpenBackdropLoading(false);
        break;
      case ChangepasswordState.fail:
        showAlert(setFailsAlert, changePassword?.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [changePassword, dispatch]);

  useEffect(() => {
    switch (forgotPasword.status) {
      case ForgotPaswordState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case ForgotPaswordState.initial:
        setOpenBackdropLoading(false);
        break;
      case ForgotPaswordState.success:
        showAlert(setSuccessAlert, forgotPasword?.data?.message);
        setOpenBackdropLoading(false);
        break;
      case ForgotPaswordState.fail:
        showAlert(setFailsAlert, forgotPasword?.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [forgotPasword, dispatch]);

  useEffect(() => {
    switch (forgotPaswordCodeVerification.status) {
      case ForgotPaswordCodeVerificationState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case ForgotPaswordCodeVerificationState.initial:
        setOpenBackdropLoading(false);
        break;
      case ForgotPaswordCodeVerificationState.success:
        showAlert(
          setSuccessAlert,
          forgotPaswordCodeVerification?.data?.message
        );
        setOpenBackdropLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        break;
      case ForgotPaswordCodeVerificationState.fail:
        showAlert(setFailsAlert, forgotPaswordCodeVerification?.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [forgotPaswordCodeVerification, dispatch]);

  useEffect(() => {
    switch (forgotPaswordUpdate.status) {
      case ForgotPaswordUpdateState.inProgress:
        setOpenBackdropLoading(true);
        break;
      case ForgotPaswordUpdateState.initial:
        setOpenBackdropLoading(false);
        break;
      case ForgotPaswordUpdateState.success:
        showAlert(setSuccessAlert, forgotPaswordUpdate?.data?.message);
        setOpenBackdropLoading(false);
        setTimeout(() => {
          window.location.href ='/signin';
        }, 1000);

        break;
      case ForgotPaswordUpdateState.fail:
        showAlert(setFailsAlert, forgotPaswordUpdate?.data.message);
        setOpenBackdropLoading(false);
        break;
    }
  }, [forgotPaswordUpdate, dispatch]);

  return (
    <div>
      <Outlet />
      <SnackbarAlert
        open={successAlert.status}
        severity="success"
        message={successAlert.message}
      />
      <SnackbarAlert
        open={failsAlert.status}
        severity="error"
        message={failsAlert.message}
      />
      <BackdropLoading open={openBackdropLoading} />
      <SigninSignupComponent
        whatForm={openLoginChooserModal ? "signin" : ""}
        open={openLoginChooserModal}
        onClose={() => {
          window.location.href = "/";
          setOpenLoginChooserModal(false);
        }}
      />
    </div>
  );
};

export function showAlert(
  toggleStateAction: Dispatch<
    SetStateAction<{ status: boolean; message?: string | undefined }>
  >,
  message: string
) {
  toggleStateAction({
    status: true,
    message: message,
  });

  setTimeout(() => {
    toggleStateAction({
      status: false,
      message: message,
    });
  }, 3000);
}

interface SnackbarAlertProps {
  open: boolean;
  severity: "success" | "error";
  message: string | undefined;
}

export function SnackbarAlert(props: SnackbarAlertProps) {
  return (
    <>
      <div className="hidden lg:block">
        <Snackbar
          open={props.open}
          autoHideDuration={20000}
          sx={{ zIndex: 2004 }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={Slide}
        >
          <MuiAlert severity={props.severity} variant="filled">
            {props.message}
          </MuiAlert>
        </Snackbar>
      </div>
      <div className="lg:hidden">
        <Snackbar
          open={props.open}
          autoHideDuration={20000}
          sx={{ zIndex: 2004, marginBottom: 7 }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={Slide}
        >
          <MuiAlert severity={props.severity} variant="filled">
            {props.message}
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
}

interface BackdropLoadingProps {
  open: boolean;
}

export function BackdropLoading(props: BackdropLoadingProps) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </div>
  );
}

interface BackdropLoadingPopClubProps {
  open: boolean;
}

export function BackdropLoadingPopClub(props: BackdropLoadingPopClubProps) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
      >
        <img src="dance.gif" alt="Poppy Dancing" width={300} />
      </Backdrop>
    </div>
  );
}
