import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";

import { AuthUserRepository ,AuthUserResponse ,AuthParams} from "../../data/user.repository";



export enum AuthUserState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: AuthUserState;
  data: AuthUserResponse | undefined;
} = {
  status: AuthUserState.initial,
  data: undefined,
};

export const getAuthUser = createAsyncThunk(
  "getAuthUser",
  async (params:AuthParams) => {
    const response: AuthUserResponse = await AuthUserRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const getAuthUserSlice = createSlice({
  name: "getAuthUser",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAuthUser.pending, (state: any) => {
        state.status = AuthUserState.inProgress;
      })
      .addCase(
        getAuthUser.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: AuthUserResponse }>
        ) => {
          const data = action.payload;
          state.status = AuthUserState.success;
          state.data = data;
        }
      )
      .addCase(
        getAuthUser.rejected,
        (
          state: any,
          action: PayloadAction<{ data: AuthUserResponse }>
        ) => {
          state.data = action.payload;
          state.status = AuthUserState.success;
        }
      );
  },
});

export const selectAuthUser = (state: RootState) =>
  state.getAuthUser;

export default getAuthUserSlice.reducer;
