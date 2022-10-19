import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import {
  AuthenticationRepository,
  AuthenticationResponse,
} from "../../data/authentication.repository";

export enum AuthState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AuthState;
  data: AuthenticationResponse | undefined;
} = {
  status: AuthState.initial,
  data: undefined,
};

export const getAuthentication = createAsyncThunk(
  "getAuthentication",
  async () => {
    const response: AuthenticationResponse = await AuthenticationRepository();
    return response.data;
  }
);

/* Main Slice */
export const getAuthenticationSlice: any = createSlice({
  name: "getAuthentication",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAuthentication.pending, (state: any) => {
        state.status = AuthState.inProgress;
      })
      .addCase(
        getAuthentication.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: AuthenticationResponse }>
        ) => {
          const data = action.payload;
          state.status = AuthState.success;
          state.data = data;
        }
      )
      .addCase(
        getAuthentication.rejected,
        (
          state: any,
          action: PayloadAction<{ data: AuthenticationResponse }>
        ) => {
          state.data = action.payload.data;
          state.status = AuthState.success;
        }
      );
  },
});

export const selectAuthentication = (state: RootState) =>
  state.getAuthentication;

export default getAuthenticationSlice.reducer;
