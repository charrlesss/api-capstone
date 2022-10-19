import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../config/store";
import { BackChangePasswordParams ,BackChangePasswordRepository ,BackChangePasswordResponse} from "../../data/change-pass.repository";


export enum BackChangepasswordState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: BackChangepasswordState;
  data: BackChangePasswordResponse | undefined;
} = {
  status: BackChangepasswordState.initial,
  data: undefined,
};

export const backChangePassword = createAsyncThunk(
  "backChangePassword",
  async (params:BackChangePasswordParams) => {
    const response: BackChangePasswordResponse = await BackChangePasswordRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const backChangePasswordSlice = createSlice({
  name: "backChangePassword",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(backChangePassword.pending, (state: any) => {
        state.status = BackChangepasswordState.inProgress;
      })
      .addCase(
        backChangePassword.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: BackChangePasswordResponse }>
        ) => {
          const data = action.payload;
          state.status = BackChangepasswordState.success;
          state.data = data.data;
        }
      )
      .addCase(
        backChangePassword.rejected,
        (
          state: any,
          action: PayloadAction<{ data: BackChangePasswordResponse }>
        ) => {
          state.data = action.payload;
          state.status = BackChangepasswordState.success;
        }
      );
  },
});

export const selectBackChangePassword= (state: RootState) =>
  state.backChangePassword;

export default backChangePasswordSlice.reducer;
