import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { BiSearch } from "react-icons/bi";

export const AdministrativeAdminSearchComponent = () => {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        fullWidth
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Schedule"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <BiSearch />
      </IconButton>
    </Paper>
  );
};
