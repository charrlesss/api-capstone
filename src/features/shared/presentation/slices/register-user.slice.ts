import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";

import { RegisterRepository ,RegisterResponse ,RegisterParams } from "../../data/user.repository";


export enum RegisterClientState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: RegisterClientState;
  data: RegisterResponse | undefined;
} = {
  status: RegisterClientState.initial,
  data: undefined,
};

export const getRegisterUser = createAsyncThunk(
  "getRegisterUser",
  async (params:RegisterParams) => {
    const response: RegisterResponse = await RegisterRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const getRegisterUserSlice = createSlice({
  name: "getRegisterUser",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getRegisterUser.pending, (state: any) => {
        state.status = RegisterClientState.inProgress;
      })
      .addCase(
        getRegisterUser.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: RegisterResponse }>
        ) => {
          const data = action.payload;
          state.status = RegisterClientState.success;
          state.data = data;
        }
      )
      .addCase(
        getRegisterUser.rejected,
        (
          state: any,
          action: PayloadAction<{ data: RegisterResponse }>
        ) => {
          state.data = action.payload.data;
          state.status = RegisterClientState.success;
        }
      );
  },
});

export const selectRegisterUser = (state: RootState) =>
  state.getRegisterUser;

export default getRegisterUserSlice.reducer;
