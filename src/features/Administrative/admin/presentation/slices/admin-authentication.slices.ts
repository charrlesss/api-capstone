import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../config/store";
import {
  AdminAuthenticationRepository,
  AdminAuthenticationParams,
  AdminAuthenticationResponse,
} from "../../data/admin-authentication.repository";

export enum AdminAuthenticationState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AdminAuthenticationState;
  data: AdminAuthenticationResponse | undefined;
} = {
  status: AdminAuthenticationState.initial,
  data: undefined,
};

export const adminAuthentication = createAsyncThunk(
  "adminAuthentication",
  async (params: AdminAuthenticationParams) => {
    const response: AdminAuthenticationResponse =
      await AdminAuthenticationRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const adminAuthenticationSlice: any = createSlice({
  name: "adminAuthentication",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(adminAuthentication.pending, (state: any) => {
        state.status = AdminAuthenticationState.inProgress;
      })
      .addCase(
        adminAuthentication.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: AdminAuthenticationResponse }>
        ) => {
          const data = action.payload;
          state.status = AdminAuthenticationState.success;
          state.data = data;
        }
      )
      .addCase(
        adminAuthentication.rejected,
        (
          state: any,
          action: PayloadAction<{ data: AdminAuthenticationResponse }>
        ) => {
          state.data = action.payload.data;
          state.status = AdminAuthenticationState.success;
        }
      );
  },
});

export const selectAdminAuthentication = (state: RootState) =>
  state.adminAuthentication;

export default adminAuthenticationSlice.reducer;
