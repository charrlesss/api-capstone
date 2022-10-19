import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { linkToChangePassword } from "../slices/link-to-changepassword.slices";
import { useInterceptorAxios } from "../../../../../../lib/interceptor-axios";
import { updateProfile } from "../../../../../shared/presentation/slices/update-profile.slice";
import { useAppDispatch } from "../../../../../../hooks/dispatch-selector.hooks";
// import { uploadPhoto } from "../../../../../shared/presentation/slices/upload-photo";
const validationSchema = yup.object({
  name: yup.string().trim().required("name is required."),
  email: yup.string().trim().required(),
  gender: yup.string().trim().required(),
  address: yup.string().trim().required(),
  contact: yup.string().min(12).trim().required(),
  profile: yup.mixed(),
  birthdate: yup.string().trim().required(),
});

const genderSelection: { value: string }[] = [
  {
    value: "Male",
  },
  {
    value: "Female",
  },
];

export const ProfileDetailsComponent: React.FC<{ client: any }> = ({
  client,
}) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { getAccessToken, instance } = useInterceptorAxios();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: client?.name,
      email: client?.email,
      gender: client?.gender,
      address: client?.address,
      contact: client?.contact,
      profile:  client?.profile,
      birthdate: client?.birthdate,
    },
    validationSchema: validationSchema,
    onSubmit: (fields) => {
      dispatch(
        updateProfile({
          _id: client?._id,
          ...fields,
          ACCESS_TOKEN: getAccessToken(),
          insterceptor: instance,
        })
      );
    },
  });



  const handlePhoneChange = (value: any) => {
    if (value) {
      formik.setFieldValue("contact", value);
    }
  };

  const handleUploadChange = (e: any) => {
    const file = e.currentTarget.files[0];
    setSelectedImage(URL.createObjectURL(file));
    formik.setFieldValue("profile", e.currentTarget.files[0]);
  };

  const displayImage = () => {
    if (selectedImage) {
      return selectedImage;
    }
    if (client?.profile?.split("https")[1]) {
      return client?.profile;
    } else {
      return process.env.REACT_APP_UPLOAD_URL + client?.profile;
    }
  };

  const handleChangePassword = () => {
    dispatch(
      linkToChangePassword({
        ACCESS_TOKEN: getAccessToken(),
        insterceptor: instance,
        email: client?.email,
        link:
          process.env.REACT_APP_DOMAIN_URL === "/"
            ? 'http://localhost:3000/dashboard/profile"'
            : process.env.REACT_APP_DOMAIN_URL,
      })
    );
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      className=" md:container mx-auto h-full p-4 "
    >
      <div className=" w-full h-auto flex lg:flex-row flex-col gap-4  ">
        <div className="lg:hidden  relative ">
          <img
            className="object-cover h-56 w-56 rounded-full mx-auto mb-5"
            src={displayImage()}
            alt="profile"
          />
          <div className="text-center w-full">
            <Button variant="contained" component="label">
              Select File
              <input
                type="file"
                id="profile"
                hidden
                onChange={handleUploadChange}
              />
            </Button>
          </div>
        </div>
        <div className="flex-1 ">
          <div className=" w-full  lg:flex">
            <div className=" p-4 flex flex-col justify-between leading-normal w-full">
              <div className="mb-8 w-full">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Guest
                </p>
                <div className="text-gray-900 font-bold text-2xl mb-2 capitalize font-mono">
                  {client?.name}
                </div>
                <p className="text-gray-700 text-base">
                  Our information collection and use policies with respect to
                  the privacy of such User Information are set forth in the
                  Site’s Privacy Policy, which is incorporated herein by
                  reference for all purposes.
                </p>
              </div>
              <div className="relative flex  flex-col w-full gap-y-4 ">
                <span className="text-gray-600 pt-4 block opacity-70 ">
                  Personal information of your account
                </span>
                <div className="grid md:grid-cols-2 grid-cols-1 w-full md:gap-x-20 justify-center">
                  <div className="pb-6">
                    <TextField
                      size="small"
                      name="name"
                      label="Name"
                      type="text"
                      fullWidth
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={
                        formik.touched.name && (formik.errors.name as string)
                      }
                    />
                  </div>
                  <div className="pb-4">
                    <TextField
                      id="email"
                      size="small"
                      name="email"
                      label="Email"
                      type="text"
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={
                        formik.touched.email && (formik.errors.email as string)
                      }
                    />
                  </div>
                  <div className="pb-4">
                    <TextField
                      size="small"
                      select
                      label="Gender"
                      placeholder="Gender"
                      variant="outlined"
                      type="text"
                      id="gender"
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      fullWidth
                      error={
                        formik.touched.gender && Boolean(formik.errors.gender)
                      }
                      helperText={
                        formik.touched.gender &&
                        (formik.errors.gender as string)
                      }
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
                  </div>

                  <div className="pb-4">
                    <MuiPhoneNumber
                      variant="outlined"
                      fullWidth
                      label="Contact"
                      size="small"
                      name="contact"
                      onChange={handlePhoneChange}
                      value={formik.values.contact}
                      defaultCountry={"ph"}
                      disableDropdown={true}
                      error={
                        formik.touched.contact && Boolean(formik.errors.contact)
                      }
                      helperText={
                        formik.touched.contact &&
                        (formik.errors.contact as string)
                      }
                    />
                  </div>
                  <div className="pb-4">
                    <TextField
                      size="small"
                      name="birthdate"
                      label="Birth date"
                      InputLabelProps={{ shrink: true, required: true }}
                      type="date"
                      fullWidth
                      value={formik.values.birthdate}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.birthdate &&
                        Boolean(formik.errors.birthdate)
                      }
                      helperText={
                        formik.touched.birthdate &&
                        (formik.errors.birthdate as string)
                      }
                    />
                  </div>
                  <div className="pb-4">
                    <TextField
                      size="small"
                      name="address"
                      label="Address"
                      InputLabelProps={{ shrink: true, required: true }}
                      type="text"
                      fullWidth
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      helperText={
                        formik.touched.address &&
                        (formik.errors.address as string)
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-between md:gap-0 gap-4 md:flex-row flex-col">
                  <div className="md:hidden ">
                    <Button
                      onClick={handleChangePassword}
                      type="button"
                      variant="contained"
                    >
                      Changes Password
                    </Button>
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" variant="contained">
                      update
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        window.location.href = "/dashboard/profile";
                        window.localStorage.removeItem("upload-photo");
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                  <div className="md:block hidden ">
                    <Button
                      onClick={handleChangePassword}
                      type="button"
                      variant="contained"
                    >
                      Changes Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:block hidden relative  flex justify-center ">
          <img
            className="object-cover h-56 w-56 rounded-full mx-auto mb-5"
            src={displayImage()}
            alt="profile"
          />
          <br />
          <div className="text-center w-full">
            <Button variant="contained" component="label">
              Select File
              <input
                type="file"
                id="profile"
                hidden
                onChange={handleUploadChange}
              />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
