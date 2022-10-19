import React from "react";
import * as yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Box, Button, TextField } from "@mui/material";
import { Checkbox, MenuItem, Typography } from "@mui/material";
import { useFormik } from "formik";
import { FormControlLabel } from "@mui/material";
import { BsPersonCircle } from "react-icons/bs";
import { BsGenderAmbiguous } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { BiKey } from "react-icons/bi";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { useAppDispatch } from "../../../../hooks/dispatch-selector.hooks";
import { getRegisterUser } from "../slices/register-user.slice";

interface PasswordType {
  password?: boolean;
  confirmPassword?: boolean;
}

const validationSchema = yup.object({
  fullname: yup.string().trim().required().min(5),
  email: yup.string().trim().email().required().min(8),
  gender: yup.string().trim().required(),
  birthdate: yup.string().required(),
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  password: yup.string().required().min(5),
});

const genderSelection: { value: string }[] = [
  {
    value: "Male",
  },
  {
    value: "Female",
  },
];

export const SignupFormComponent = () => {
  const dispatch = useAppDispatch();
  const [passwordShow, setPasswordShow] = React.useState<PasswordType>({
    password: false,
    confirmPassword: false,
  });
  const [check, setCheckBox] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      gender: "",
      email: "",
      confirmPassword: "",
      birthdate: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (input) => {
      dispatch(getRegisterUser(input));
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

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleCheckBox = () => {
    setCheckBox(!check);
  };

  return (
    <main className="container mx-auto ">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid xs:grid-cols-2  gap-4">
          <TextField
            size="small"
            label="full name"
            placeholder="full name"
            variant="outlined"
            type="text"
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
            InputProps={{
              startAdornment: (
                <BsPersonCircle className=" text-[1.5rem] mr-2" />
              ),
            }}
          />

          <TextField
            size="small"
            select
            label="Gender"
            placeholder="Gender"
            variant="outlined"
            type="text"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
            InputProps={{
              startAdornment: (
                <BsGenderAmbiguous className=" text-[1.5rem] mr-2" />
              ),
            }}
          >
            {genderSelection.map((option: { value: string }) => (
              <MenuItem
                key={option.value}
                value={option.value}
                style={{
                  width: "100%",
                  height: "fit-content",
                  display: "flex",
                  justifyContent: "start",
                  paddingLeft: "10px",
                }}
              >
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            name="birthdate"
            label="Some Date"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            value={formik.values.birthdate}
            onChange={formik.handleChange}
            error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
            helperText={formik.touched.birthdate && formik.errors.birthdate}
          />

          <TextField
            size="small"
            label="Email"
            placeholder="email"
            variant="outlined"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <MdAlternateEmail className=" text-[1.5rem] mr-2" />
              ),
            }}
          />

          <TextField
             autoComplete="on"
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
             autoComplete="on"
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
               I agree to terms of conditions  and Privacy Policy.
              </Typography>
            }
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!check}
          style={{
            width: "100%",
          }}
        >
          Sign up
        </Button>
      </form>
      <div className="w-full text-black text-sm mt-2 ">
        <div className="relative">
        Already have an account?{" "}
          <a href="/signin" className="font-bold text-blue-400">
            Log in.
          </a>
        </div>
      </div>
    </main>
  );
};
