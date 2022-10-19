import React, { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { InitialBackroundComponent } from "../components/initial-backround-component";
import * as yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import { BiKey } from "react-icons/bi";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/dispatch-selector.hooks";
import { forgotPassword } from "../slices/forgot-password.slices";
import { forgotPaswordCodeVerification } from "../slices/forgot-password-code-verification.slices";
import {
  selectForgotPaswordAuthorize,
  forgotPaswordAuthorize,
} from "../slices/forgot-password-authorize.slice";
import {forgotPasswordUpdate} from "../slices/forgot-password-updated";

interface PasswordType {
  password?: boolean;
  confirmPassword?: boolean;
}

const validationSchema = yup.object({
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  password: yup.string().required().min(5),
});

export const ForgotPasswordPages: React.FC = (): JSX.Element => {
  const [passwordShow, setPasswordShow] = React.useState<PasswordType>({
    password: false,
    confirmPassword: false,
  });
  const [requiredCode, setRequiredCode] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const authorizeUser: any = useAppSelector(selectForgotPaswordAuthorize);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (input) => {
      console.log(input);
      dispatch(forgotPasswordUpdate(input))
      formik.resetForm()
    },
  });

  useEffect(() => {
    dispatch(forgotPaswordAuthorize());
  }, [dispatch]);

  const handleEmailSubmit = (e: any) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };
  const handleVerifyCode = (e: any) => {
    e.preventDefault();
    if (code) {
      return dispatch(forgotPaswordCodeVerification({ code }));
    }
    setRequiredCode("This field is required.");
  };

  const handlePassword = () => {
    setPasswordShow((pass: PasswordType) => ({
      password: !pass.password,
      confirmPassword: pass.confirmPassword,
    }));
  };
  const handleConfirmPassword = () => {
    setPasswordShow((pass: PasswordType) => ({
      confirmPassword: !pass.confirmPassword,
      password: pass.password,
    }));
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  console.log(authorizeUser?.data?.data?.authorized);
  return (
    <div className="w-full h-[100vh]">
      <InitialBackroundComponent />
      <div className="flex fixed inset-0 z-30 flex items-center justify-center bg-secondary bg-opacity-30 backdrop-blur-sm ">
        <div className=" bg-white px-4 py-8 round  sm:w-[600px] w-[90%]  rounded-lg relative text-white border md:flex block">
          <div className="w-full  h-auto md:space-y-4 ">
            <div className="w-full h-auto flex flex-col gap-y-4 ">
              <form onSubmit={handleEmailSubmit}>
                <h1 className="text-black text-[1.5em] font-bold">Step 1</h1>
                <div className="relative w-full flex justify-between mb-4">
                  <p className="text-black leading-6">
                    Enter your email we sent to you a verification code to
                    verify your email.
                  </p>
                </div>
                <TextField
                  required
                  fullWidth
                  type="email"
                  variant="outlined"
                  label="Enter your email "
                  size="small"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className="relative w-full flex justify-between mt-4">
                  <Button
                    color="primary"
                    type="button"
                    href="/"
                    variant="outlined"
                  >
                    Back
                  </Button>
                  <Button color="primary" type="submit" variant="contained">
                    Submit
                  </Button>
                </div>
              </form>
              <form onSubmit={handleVerifyCode}>
                <h1 className="text-black text-[1.5em] font-bold ">Step 2</h1>
                <div className="relative w-full flex justify-between mb-4">
                  <p className="text-black leading-6">
                    We've sent a verification code to your email
                  </p>
                </div>
                <div className="mt-4">
                  {requiredCode && (
                    <div
                      className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Oooppppss!</strong>
                      <span className="block sm:inline">{requiredCode}</span>
                      <span
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                        onClick={() => {
                          setRequiredCode("");
                        }}
                      >
                        <svg
                          className="fill-current h-6 w-6 text-red-500"
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <title>Close</title>
                          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                      </span>
                    </div>
                  )}
                  <MuiOtpInput
                    value={code}
                    onChange={(otp) => {
                      setCode(otp);
                      setRequiredCode("");
                    }}
                    length={5}
                    TextFieldsProps={{ size: "medium", placeholder: "-" }}
                  />
                </div>

                <div className="relative w-full flex justify-between mt-4">
                  <Button
                    color="primary"
                    type="button"
                    href="/"
                    variant="outlined"
                  >
                    Back
                  </Button>
                  <Button color="primary" type="submit" variant="contained">
                    verify
                  </Button>
                </div>
              </form>
              <form onSubmit={formik.handleSubmit}>
                <h1 className="text-black text-[1.5em] font-bold ">Step 3</h1>
                <div className="relative w-full flex justify-between mb-4">
                  <p className="text-black leading-6">
                    We've sent a verification code to your email
                  </p>
                </div>
                <div className="flex flex-col gap-y-4">
                  <TextField
                    autoComplete="on"
                    size="small"
                    label="Password"
                    variant="outlined"
                    type={passwordShow.password ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    fullWidth
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      startAdornment: <BiKey className=" text-[2rem] mr-2" />,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handlePassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {passwordShow.password ? (
                              <IoEyeSharp className="text-[1rem]" />
                            ) : (
                              <BsEyeSlashFill className="text-[1rem]" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    autoComplete="on"
                    size="small"
                    label="Confirm Password"
                    variant="outlined"
                    type={passwordShow.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    fullWidth
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    InputProps={{
                      startAdornment: <BiKey className=" text-[2rem] mr-2" />,

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {passwordShow.confirmPassword ? (
                              <IoEyeSharp className="text-[1rem]" />
                            ) : (
                              <BsEyeSlashFill className="text-[1rem]" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="relative w-full flex justify-between mt-4">
                  <Button
                    color="primary"
                    type="button"
                    href="/"
                    variant="outlined"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!authorizeUser?.data?.data?.authorized}
                    color="primary"
                    type="submit"
                    variant="contained"
                  >
                    {authorizeUser?.data?.data?.authorized
                      ? "Change Password"
                      : "Verify Your Email"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
