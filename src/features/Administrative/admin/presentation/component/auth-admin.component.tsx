import React from "react";
import { TextField, IconButton, Button } from "@mui/material";
import { MdAlternateEmail } from "react-icons/md";
import { BiKey } from "react-icons/bi";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import InputAdornment from "@mui/material/InputAdornment";
import { Field, useFormik } from "formik";
import * as yup from "yup";
import { RiAdminLine } from "react-icons/ri";
import axios from "axios";

const validationSchema = yup.object({
  email: yup.string().email().required().min(8),
  password: yup.string().required().min(5),
});

export const AuthAdminComponent: React.FC = (): JSX.Element => {
  const [passwordShow, setPasswordShow] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (input) => {
      axios.post(`${process.env.REACT_APP_API}/auth-admin`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      formik.resetForm();
    },
  });

  const handlePassword = () => {
    setPasswordShow(!passwordShow);
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
              <div className="sm:flex sm:items-star ">
                <div className="  mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <RiAdminLine />
                </div>
                <div className="mt-3 ml-3 text-center sm:w-[calc(100%-100px)] sm:text-left ">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Login your Account
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please login with your email and password below.
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-4 mt-4 ">
                    <TextField
                      placeholder="email"
                      variant="outlined"
                      type="email"
                      name="email"
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      fullWidth
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      InputProps={{
                        startAdornment: (
                          <MdAlternateEmail className=" text-[1.5rem] mr-2" />
                        ),
                      }}
                    />
                 

                    <TextField
                      placeholder="password"
                      variant="outlined"
                      type={passwordShow ? "text" : "password"}
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      fullWidth
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
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
                            >
                              {passwordShow ? (
                                <IoEyeSharp />
                              ) : (
                                <BsEyeSlashFill />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className="w-full">
                      <a href="/">Forgot Password?</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <div className="relative w-auto">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    width: "100%",
                    height: "45px",
                  }}
                >
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
