import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../config/store";
import {
  IsAuthenticatedAdminRepository,
  IsAuthenticatedAdminResponse
} from "../../data/admin-authentication.repository";

export enum IsAuthenticatedAdminState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: IsAuthenticatedAdminState;
  data: IsAuthenticatedAdminResponse | undefined;
} = {
  status: IsAuthenticatedAdminState.initial,
  data: undefined,
};

export const isAuthenticatedAdmin = createAsyncThunk(
  "isAuthenticatedAdmin",
  async () => {
    const response: IsAuthenticatedAdminResponse =
      await IsAuthenticatedAdminRepository();
    return response.data;
  }
);

/* Main Slice */
export const isAuthenticatedAdminSlice: any = createSlice({
  name: "isAuthenticatedAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(isAuthenticatedAdmin.pending, (state: any) => {
        state.status = IsAuthenticatedAdminState.inProgress;
      })
      .addCase(
        isAuthenticatedAdmin.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: IsAuthenticatedAdminResponse }>
        ) => {
          const {data} = action.payload;
          state.status = IsAuthenticatedAdminState.success;
          state.data = data;
        }
      )
      .addCase(
        isAuthenticatedAdmin.rejected,
        (
          state: any,
          action: PayloadAction<{ data: IsAuthenticatedAdminResponse }>
        ) => {
          state.data = action.payload.data;
          state.status = IsAuthenticatedAdminState.success;
        }
      );
  },
});

export const selectIsAuthenticatedAdmin = (state: RootState) =>
  state.isAuthenticatedAdmin;

export default isAuthenticatedAdminSlice.reducer;
