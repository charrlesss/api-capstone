import React from "react";
import { Box, Button, FormControlLabel, TextField } from "@mui/material";
import { Checkbox, MenuItem, Typography } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { BsGenderAmbiguous } from "react-icons/bs";
import { useAppDispatch } from "../../../../hooks/dispatch-selector.hooks";
import { getCompleteDetailsUser } from "../slices/complete-details";
import { useInterceptorAxios } from "../../../../lib/interceptor-axios";
import { useGetClientDetails } from "../../../../hooks/user-details.hooks";

const validationSchemaNoProfile = yup.object({
  gender: yup.string().trim().required(),
  address: yup.string().trim().required(),
  contact: yup.string().trim().required(),
  profile: yup.mixed().required(),
  birthdate: yup.string().required(),
});
const validationSchema = yup.object({
  gender: yup.string().trim().required(),
  address: yup.string().trim().required(),
  contact: yup.string().trim().required(),
  profile: yup.mixed(),
  birthdate: yup.string().required(),
});

const genderSelection: { value: string }[] = [
  {
    value: "Male",
  },
  {
    value: "Female",
  },
];

interface LoginChooserModalProps {
  open: boolean;
  onClose: () => void;
}

export const FillDetailsComponent: React.FC<LoginChooserModalProps> = (
  props
): JSX.Element => {
  const { client } = useGetClientDetails();
  const { getAccessToken, instance } = useInterceptorAxios();
  const dispatch = useAppDispatch();

  const [check, setCheckBox] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      gender: "",
      birthdate: "",
      address: "",
      contact: "",
      profile: "",
    },
    validationSchema: client?.profile
      ? validationSchema
      : validationSchemaNoProfile,
    onSubmit: (fields) => {
      console.log(fields);
      dispatch(
        getCompleteDetailsUser({
          ACCESS_TOKEN: getAccessToken(),
          insterceptor: instance,
          ...fields,
        })
      );
    },
  });

  const handleCheckBox = () => {
    setCheckBox(!check);
  };
  return (
    <>
      <div
        style={{ display: props.open ? "flex" : "none" }}
        className=" fixed inset-0 z-30 flex items-center justify-center bg-secondary bg-opacity-30 backdrop-blur-sm "
      >
        <div
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
          }}
          className=" bg-white px-4 py-8 round w-[90%] sm:w-[450px] h-auto rounded-lg relative text-white border "
        >
          <form
            encType="multipart/form-data"
            onSubmit={formik.handleSubmit}
            className=" flex flex-col gap-4"
          >
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                id="profile"
                hidden
                onChange={(e: any) => {
                  formik.setFieldValue("profile", e.currentTarget.files[0]);
                }}
              />
            </Button>
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
              fullWidth
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              error={
                formik.touched.birthdate && Boolean(formik.errors.birthdate)
              }
              helperText={formik.touched.birthdate && formik.errors.birthdate}
            />
            <TextField
              size="small"
              name="contact"
              label="contact"
              InputLabelProps={{ shrink: true, required: true }}
              type="text"
              fullWidth
              value={formik.values.contact}
              onChange={formik.handleChange}
              error={formik.touched.contact && Boolean(formik.errors.contact)}
              helperText={formik.touched.contact && formik.errors.contact}
            />
            <TextField
              size="small"
              name="address"
              label="address"
              InputLabelProps={{ shrink: true, required: true }}
              type="text"
              fullWidth
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <Box className="flex">
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
        </div>
      </div>
    </>
  );
};
