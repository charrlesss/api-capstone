import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import {
 ForgotPaswordCodeVerificationRepository,
 ForgotPaswordCodeVerificationParams,
 ForgotPaswordCodeVerificationResponse
} from "../../data/forgot-password";

export enum ForgotPaswordCodeVerificationState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: ForgotPaswordCodeVerificationState;
  data: ForgotPaswordCodeVerificationResponse | undefined;
} = {
  status: ForgotPaswordCodeVerificationState.initial,
  data: undefined,
};

export const forgotPaswordCodeVerification= createAsyncThunk(
  "forgotPaswordCodeVerification",
  async (params: ForgotPaswordCodeVerificationParams) => {
    const response: ForgotPaswordCodeVerificationResponse = await ForgotPaswordCodeVerificationRepository(
      params
    );
    return response.data;
  }
);

/* Main Slice */
export const forgotPaswordCodeVerificationSlice = createSlice({
  name: "forgotPaswordCodeVerification",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(forgotPaswordCodeVerification.pending, (state: any) => {
        state.status = ForgotPaswordCodeVerificationState.inProgress;
      })
      .addCase(
        forgotPaswordCodeVerification.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: ForgotPaswordCodeVerificationResponse }>
        ) => {
          const { data } = action.payload;
          state.status = ForgotPaswordCodeVerificationState.success;
          state.data = data;
        }
      )
      .addCase(
        forgotPaswordCodeVerification.rejected,
        (
          state: any,
          action: PayloadAction<{ data: ForgotPaswordCodeVerificationResponse }>
        ) => {
          state.data = action.payload;
          state.status = ForgotPaswordCodeVerificationState.success;
        }
      );
  },
});

export const selectForgotPaswordCodeVerification = (state: RootState) => state.forgotPaswordCodeVerification;

export default forgotPaswordCodeVerificationSlice.reducer;
