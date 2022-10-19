import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import {
  ForgotPaswordAuthorizeRepository,
  ForgotPaswordAuthorizeResponse,
} from "../../data/forgot-password";

export enum ForgotPaswordAuthorizeState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: ForgotPaswordAuthorizeState;
  data: ForgotPaswordAuthorizeResponse | undefined;
} = {
  status: ForgotPaswordAuthorizeState.initial,
  data: undefined,
};

export const forgotPaswordAuthorize = createAsyncThunk(
  "forgotPaswordAuthorize",
  async () => {
    const response: ForgotPaswordAuthorizeResponse =
      await ForgotPaswordAuthorizeRepository();
    return response.data;
  }
);

/* Main Slice */
export const forgotPaswordAuthorizeSlice = createSlice({
  name: "forgotPaswordAuthorize",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(forgotPaswordAuthorize.pending, (state: any) => {
        state.status = ForgotPaswordAuthorizeState.inProgress;
      })
      .addCase(
        forgotPaswordAuthorize.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: ForgotPaswordAuthorizeResponse }>
        ) => {
          const { data } = action.payload;
          state.status = ForgotPaswordAuthorizeState.success;
          state.data = data;
        }
      )
      .addCase(
        forgotPaswordAuthorize.rejected,
        (
          state: any,
          action: PayloadAction<{ data: ForgotPaswordAuthorizeResponse }>
        ) => {
          state.data = action.payload;
          state.status = ForgotPaswordAuthorizeState.success;
        }
      );
  },
});

export const selectForgotPaswordAuthorize = (state: RootState) =>
  state.forgotPaswordAuthorize;

export default forgotPaswordAuthorizeSlice.reducer;
