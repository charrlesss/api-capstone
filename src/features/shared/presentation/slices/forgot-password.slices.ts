import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import {
  ForgotPaswordParams,
  ForgotPaswordRepository,
  ForgotPaswordResponse,
} from "../../data/forgot-password";

export enum ForgotPaswordState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: ForgotPaswordState;
  data: ForgotPaswordResponse | undefined;
} = {
  status: ForgotPaswordState.initial,
  data: undefined,
};

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (params: ForgotPaswordParams) => {
    const response: ForgotPaswordResponse = await ForgotPaswordRepository(
      params
    );
    return response.data;
  }
);

/* Main Slice */
export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(forgotPassword.pending, (state: any) => {
        state.status = ForgotPaswordState.inProgress;
      })
      .addCase(
        forgotPassword.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: ForgotPaswordResponse }>
        ) => {
          const { data } = action.payload;
          state.status = ForgotPaswordState.success;
          state.data = data;
        }
      )
      .addCase(
        forgotPassword.rejected,
        (
          state: any,
          action: PayloadAction<{ data: ForgotPaswordResponse }>
        ) => {
          state.data = action.payload;
          state.status = ForgotPaswordState.success;
        }
      );
  },
});

export const selectForgotPassword = (state: RootState) => state.forgotPassword;

export default forgotPasswordSlice.reducer;
