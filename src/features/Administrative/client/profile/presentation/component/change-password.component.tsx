import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Button, IconButton, InputAdornment } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Checkbox, Typography, TextField } from "@mui/material";
import { BiKey } from "react-icons/bi";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { changePassword } from "../slices/change-password.slices";
import { backChangePassword } from "../slices/back-change-password.slice";
import { useAppDispatch } from "../../../../../../hooks/dispatch-selector.hooks";
import { useInterceptorAxios } from "../../../../../../lib/interceptor-axios";

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

export const ChangePasswordComponent = () => {
  const { getAccessToken, instance } = useInterceptorAxios();
  const dispatch = useAppDispatch();
  const [passwordShow, setPasswordShow] = React.useState<PasswordType>({
    password: false,
    confirmPassword: false,
  });
  const [check, setCheckBox] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (input) => {
      dispatch(
        changePassword({
          ...input,
          ACCESS_TOKEN: getAccessToken(),
          insterceptor: instance,
        })
      );
      formik.resetForm();
    },
  });

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

  const handleCheckBox = () => {
    setCheckBox(!check);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleBackChanges = () => {
    dispatch(
      backChangePassword({
        ACCESS_TOKEN: getAccessToken(),
        insterceptor: instance,
      })
    );
    formik.resetForm();
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" flex fixed inset-0 z-30 flex items-center justify-center bg-secondary bg-opacity-30 backdrop-blur-sm "
    >
      <div
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
        className=" bg-white px-4 py-8 round w-[90%] sm:w-[450px] rounded-lg relative text-white border"
      >
        <h1 className="font-['Bebas_Neue'] text-black text-2xl tracking-[1.5px]">
          Change password
        </h1>
        <p className="font-sans text-black opacity-[.5] text-sm font-semibold">
          Create new, strong password that you don't use for other websites.
        </p>
        <br />
        <div className="flex flex-col gap-y-4">
          <TextField
            size="small"
            label="Password"
            placeholder="password"
            variant="outlined"
            type={passwordShow.password ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
            size="small"
            label="Confirm Password"
            placeholder="confirm password"
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
              formik.touched.confirmPassword && formik.errors.confirmPassword
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
        <Box
          style={{
            display: "flex",
            justifyContent: "left",
            paddingLeft: "10px",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={check}
                onChange={handleCheckBox}
                size="small"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label={
              <Typography variant="caption" className="text-black ">
                agree to terms and conditions.
              </Typography>
            }
          />
        </Box>
        <div className="flex justify-between">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!check}
          >
            Save Change
          </Button>
          <Button
            onClick={handleBackChanges}
            type="button"
            variant="contained"
            color="primary"
          >
            Back
          </Button>
        </div>
      </div>
    </form>
  );
};
