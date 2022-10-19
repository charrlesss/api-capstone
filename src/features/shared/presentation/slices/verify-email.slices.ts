import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import {
  VerifyUserEmailRepository,
  VerifyUserEmailResponse,
} from "../../data/authentication.repository";

export enum VerifyUserEmailState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: VerifyUserEmailState;
  data: VerifyUserEmailResponse | undefined;
  success: boolean;
} = {
  status: VerifyUserEmailState.initial,
  data: undefined,
  success: false,
};

export const verifyUserEmail = createAsyncThunk("verifyUserEmail", async () => {
  const response: VerifyUserEmailResponse = await VerifyUserEmailRepository();
  return response.data;
});

/* Main Slice */
export const verifyUserEmailSlice = createSlice({
  name: "verifyUserEmail",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(verifyUserEmail.pending, (state: any) => {
        state.status = VerifyUserEmailState.inProgress;
      })
      .addCase(
        verifyUserEmail.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: VerifyUserEmailResponse }>
        ) => {
          const { data } = action.payload;
          state.status = VerifyUserEmailState.success;
          state.data = data;
        }
      )
      .addCase(
        verifyUserEmail.rejected,
        (
          state: any,
          action: PayloadAction<{ data: VerifyUserEmailResponse }>
        ) => {
          state.data = action.payload.data;
          state.status = VerifyUserEmailState.success;
        }
      );
  },
});

export const selectverifyUserEmail = (state: RootState) =>
  state.verifyUserEmail;

export default verifyUserEmailSlice.reducer;
