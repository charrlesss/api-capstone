import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import {
  RemoveAccountNotVerifiedRepository,
  RemoveAccountNotVerifiedParams,
  RemoveAccountNotVerifiedResponse,
} from "../../data/authentication.repository";

export enum RemoveAccountNotVerifiedState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: RemoveAccountNotVerifiedState;
  data: RemoveAccountNotVerifiedResponse | undefined;
  success: boolean;
} = {
  status: RemoveAccountNotVerifiedState.initial,
  data: undefined,
  success: false,
};

export const removeAccountNotVerified = createAsyncThunk(
  "removeAccountNotVerified",
  async (params: RemoveAccountNotVerifiedParams) => {
    const response: RemoveAccountNotVerifiedResponse =
      await RemoveAccountNotVerifiedRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const removeAccountNotVerifiedSlice = createSlice({
  name: "removeAccountNotVerified",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(removeAccountNotVerified.pending, (state: any) => {
        state.status = RemoveAccountNotVerifiedState.inProgress;
      })
      .addCase(
        removeAccountNotVerified.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: RemoveAccountNotVerifiedResponse }>
        ) => {
          const { data } = action.payload;
          state.status = RemoveAccountNotVerifiedState.success;
          state.data = data;
        }
      )
      .addCase(
        removeAccountNotVerified.rejected,
        (
          state: any,
          action: PayloadAction<{ data: RemoveAccountNotVerifiedResponse }>
        ) => {
          state.data = action.payload.data;
          state.status = RemoveAccountNotVerifiedState.success;
        }
      );
  },
});

export const selectRemoveAccountNotVerified = (state: RootState) =>
  state.removeAccountNotVerified;

export default removeAccountNotVerifiedSlice.reducer;
