import React from "react";
import { TextField, IconButton, Button } from "@mui/material";
import { MdAlternateEmail } from "react-icons/md";
import { BiKey } from "react-icons/bi";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import * as yup from "yup";
import { getAuthUser } from "../slices/auth-user.slice";
import { useAppDispatch } from "../../../../hooks/dispatch-selector.hooks";

const validationSchema = yup.object({
  email: yup.string().email().required().min(8),
  password: yup.string().required().min(5),
});

export const SigninFormComponent: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [passwordShow, setPasswordShow] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (input) => {
      dispatch(getAuthUser(input));
      formik.resetForm();
    },
  });

  const handlePassword = () => {
    setPasswordShow(!passwordShow);
  };

  return (
    <main className="relative">
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          placeholder="email"
          variant="outlined"
          type="email"
          name="email"
          id="email"
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
          label="Password"
          placeholder="password"
          variant="outlined"
          type={passwordShow ? "text" : "password"}
          name="password"
          id="password"
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
                >
                  {passwordShow ? <IoEyeSharp /> : <BsEyeSlashFill />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
      </form>
      <div className="w-full text-black text-sm mt-2 ">
        <a href="/forgot-password" className="hover:underline hover:text-blue-400">Forgot Password?</a>
        <div className="relative">
          Don't have an account?{" "}
          <a href="/signup" className="font-bold underline  hover:text-blue-400">
            Sign up.
          </a>
        </div>
      </div>
    </main>
  );
};
