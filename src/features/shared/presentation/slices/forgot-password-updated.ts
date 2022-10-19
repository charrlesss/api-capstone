import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import {
  ForgotPasswordUpdateParams,
  ForgotPaswordUpdateRepository,
  ForgotPasswordUpdateResponse,
} from "../../data/forgot-password";

export enum ForgotPaswordUpdateState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: ForgotPaswordUpdateState;
  data: ForgotPasswordUpdateResponse | undefined;
} = {
  status: ForgotPaswordUpdateState.initial,
  data: undefined,
};

export const forgotPasswordUpdate = createAsyncThunk(
  "forgotPasswordUpdate",
  async (params: ForgotPasswordUpdateParams) => {
    const response: ForgotPasswordUpdateResponse =
      await ForgotPaswordUpdateRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const forgotPasswordUpdateSlice = createSlice({
  name: "forgotPasswordUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(forgotPasswordUpdate.pending, (state: any) => {
        state.status = ForgotPaswordUpdateState.inProgress;
      })
      .addCase(
        forgotPasswordUpdate.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: ForgotPasswordUpdateResponse }>
        ) => {
          const { data } = action.payload;
          state.status = ForgotPaswordUpdateState.success;
          state.data = data;
        }
      )
      .addCase(
        forgotPasswordUpdate.rejected,
        (
          state: any,
          action: PayloadAction<{ data: ForgotPasswordUpdateResponse }>
        ) => {
          state.data = action.payload;
          state.status = ForgotPaswordUpdateState.success;
        }
      );
  },
});

export const selectForgotPaswordUpdate = (state: RootState) =>
  state.forgotPasswordUpdate;

export default forgotPasswordUpdateSlice.reducer;
