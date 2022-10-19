import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../config/store";
import { ChangePasswordParams ,ChangePasswordRepository,ChangePasswordResponse} from "../../data/change-pass.repository";


export enum ChangepasswordState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: ChangepasswordState;
  data: ChangePasswordResponse | undefined;
} = {
  status: ChangepasswordState.initial,
  data: undefined,
};

export const changePassword = createAsyncThunk(
  "changePassword",
  async (params:ChangePasswordParams) => {
    const response: ChangePasswordResponse = await ChangePasswordRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(changePassword.pending, (state: any) => {
        state.status = ChangepasswordState.inProgress;
      })
      .addCase(
        changePassword.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: ChangePasswordResponse }>
        ) => {
          const data = action.payload;
          state.status = ChangepasswordState.success;
          state.data = data.data;
        }
      )
      .addCase(
        changePassword.rejected,
        (
          state: any,
          action: PayloadAction<{ data: ChangePasswordResponse }>
        ) => {
          state.data = action.payload;
          state.status = ChangepasswordState.success;
        }
      );
  },
});

export const selectChangePassword= (state: RootState) =>
  state.changePassword;

export default changePasswordSlice.reducer;
