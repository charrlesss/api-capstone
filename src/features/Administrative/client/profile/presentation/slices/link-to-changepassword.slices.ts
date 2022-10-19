import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../config/store";

import { LinkToChangePasswordRepository ,LinkToChangePasswordParams ,LinkToChangePasswordResponse } from "../../data/change-pass.repository";


export enum LinkToChangepasswordState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: LinkToChangepasswordState;
  data: LinkToChangePasswordResponse | undefined;
} = {
  status: LinkToChangepasswordState.initial,
  data: undefined,
};

export const linkToChangePassword = createAsyncThunk(
  "linkToChangePassword",
  async (params:LinkToChangePasswordParams) => {
    const response: LinkToChangePasswordResponse = await LinkToChangePasswordRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const linkToChangePasswordSlice = createSlice({
  name: "linkToChangePassword",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(linkToChangePassword.pending, (state: any) => {
        state.status = LinkToChangepasswordState.inProgress;
      })
      .addCase(
        linkToChangePassword.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: LinkToChangePasswordResponse }>
        ) => {
          const data = action.payload;
          state.status = LinkToChangepasswordState.success;
          state.data = data.data;
        }
      )
      .addCase(
        linkToChangePassword.rejected,
        (
          state: any,
          action: PayloadAction<{ data: LinkToChangePasswordResponse }>
        ) => {
          state.data = action.payload;
          state.status = LinkToChangepasswordState.success;
        }
      );
  },
});

export const selectLinkToChangePassword= (state: RootState) =>
  state.linkToChangePassword;

export default linkToChangePasswordSlice.reducer;
