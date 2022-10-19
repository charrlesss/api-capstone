import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import {
  AuthUserResponse,
  CompleteDetailsRepository,
  CompleteDetailsResponse,
  CompleteDetailsParams
} from "../../data/user.repository";

export enum completeDetailsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: completeDetailsState;
  data: CompleteDetailsResponse | undefined;
} = {
  status: completeDetailsState.initial,
  data: undefined,
};

export const getCompleteDetailsUser = createAsyncThunk(
  "getCompleteDetailsUser",
  async (params:CompleteDetailsParams) => {
    const response: CompleteDetailsResponse = await CompleteDetailsRepository(
      params
    );
    return response.data;
  }
);

/* Main Slice */
export const getCompleteDetailsUserSlice = createSlice({
  name: "getCompleteDetailsUser",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getCompleteDetailsUser.pending, (state: any) => {
        state.status = completeDetailsState.inProgress;
      })
      .addCase(
        getCompleteDetailsUser.fulfilled,
        (state: any, action: PayloadAction<{ data: AuthUserResponse }>) => {
          const data = action.payload;
          state.status = completeDetailsState.success;
          state.data = data;
        }
      )
      .addCase(
        getCompleteDetailsUser.rejected,
        (state: any, action: PayloadAction<{ data: AuthUserResponse }>) => {
          state.data = action.payload;
          state.status = completeDetailsState.success;
        }
      );
  },
});

export const selectCompleteDetailsUser = (state: RootState) =>
  state.getCompleteDetailsUser;

export default getCompleteDetailsUserSlice.reducer;
