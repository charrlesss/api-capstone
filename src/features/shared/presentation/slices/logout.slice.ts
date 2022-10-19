import { AxiosInstance } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import { GetLogoutClientRepository } from "../../data/authentication.repository";

export enum LogoutState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: LogoutState;
  data: any | undefined;
} = {
  status: LogoutState.initial,
  data: undefined,
};

export const getLogoutClient = createAsyncThunk(
  "getLogoutClient",
  async (params: { ACCESS_TOKEN: string; interceptor: AxiosInstance }) => {
    const response: any = await GetLogoutClientRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const getClientLogoutSlice = createSlice({
  name: "getLogoutClient",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getLogoutClient.pending, (state: any) => {
        state.status = LogoutState.inProgress;
      })
      .addCase(
        getLogoutClient.fulfilled,
        (state: any, action: PayloadAction<{ data: any }>) => {
          const data = action.payload;
          state.status = LogoutState.success;
          state.data = data;
        }
      )
      .addCase(
        getLogoutClient.rejected,
        (state: any, action: PayloadAction<{ data: any }>) => {
          state.data = action.payload.data;
          state.status = LogoutState.success;
        }
      );
  },
});

export const selectClientLogout = (state: RootState) => state.getLogoutClient;

export default getClientLogoutSlice.reducer;
