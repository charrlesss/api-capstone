import { AxiosInstance } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import { GetClientRepository } from "../../data/authentication.repository";

export enum ClientState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: ClientState;
  data: any | undefined;
  success: boolean;
} = {
  status: ClientState.initial,
  data: undefined,
  success: false,
};

export const getClient = createAsyncThunk(
  "getClient",
  async (params: { ACCESS_TOKEN: string; interceptor: AxiosInstance }) => {
    const response: any = await GetClientRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const getClientSlice = createSlice({
  name: "getClient",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getClient.pending, (state: any) => {
        state.status = ClientState.inProgress;
      })
      .addCase(
        getClient.fulfilled,
        (state: any, action: PayloadAction<{ data: any }>) => {
          const data = action.payload;
          state.status = ClientState.success;
          state.data = data;
        }
      )
      .addCase(
        getClient.rejected,
        (state: any, action: PayloadAction<{ data: any }>) => {
          state.data = action.payload.data;
          state.status = ClientState.success;
        }
      );
  },
});

export const selectClient = (state: RootState) => state.getClient;

export default getClientSlice.reducer;
