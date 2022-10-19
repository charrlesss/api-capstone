import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import {
  VerifyUserEmailWithCodeParams,
  VerifyUserEmailWithCodeRepository,
  VerifyUserEmailWithCodeResponse,
} from "../../data/authentication.repository";

export enum VerifyUserEmailWithCodeState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: VerifyUserEmailWithCodeState;
  data: VerifyUserEmailWithCodeResponse | undefined;
  success: boolean;
} = {
  status: VerifyUserEmailWithCodeState.initial,
  data: undefined,
  success: false,
};

export const verifyUserEmailWithCode = createAsyncThunk(
  "verifyUserEmailWithCode",
  async (params: VerifyUserEmailWithCodeParams) => {
    const response: VerifyUserEmailWithCodeResponse =
      await VerifyUserEmailWithCodeRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const verifyUserEmailWithCodeSlice = createSlice({
  name: "verifyUserEmailWithCode",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(verifyUserEmailWithCode.pending, (state: any) => {
        state.status = VerifyUserEmailWithCodeState.inProgress;
      })
      .addCase(
        verifyUserEmailWithCode.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: VerifyUserEmailWithCodeResponse }>
        ) => {
          const { data } = action.payload;
          state.status = VerifyUserEmailWithCodeState.success;
          state.data = data;
        }
      )
      .addCase(
        verifyUserEmailWithCode.rejected,
        (
          state: any,
          action: PayloadAction<{ data: VerifyUserEmailWithCodeResponse }>
        ) => {
          state.data = action.payload.data;
          state.status = VerifyUserEmailWithCodeState.success;
        }
      );
  },
});

export const selectVerifyUserEmailWithCode = (state: RootState) =>
  state.verifyUserEmailWithCode;

export default verifyUserEmailWithCodeSlice.reducer;
