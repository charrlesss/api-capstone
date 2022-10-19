import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import { UpdateProfileParams ,UpdateProfileRepository,UpdateProfileResponse } from "../../data/user.repository";


export enum UpdateProfileState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UpdateProfileState;
  data: UpdateProfileResponse | undefined;
} = {
  status: UpdateProfileState.initial,
  data: undefined,
};

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (params:UpdateProfileParams) => {
    const response: UpdateProfileResponse = await UpdateProfileRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const updateprofileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(updateProfile.pending, (state: any) => {
        state.status = UpdateProfileState.inProgress;
      })
      .addCase(
        updateProfile.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: UpdateProfileResponse }>
        ) => {
          const data = action.payload;
          state.status = UpdateProfileState.success;
          state.data = data?.data;
        }
      )
      .addCase(
        updateProfile.rejected,
        (
          state: any,
          action: PayloadAction<{ data: UpdateProfileResponse }>
        ) => {
          state.data = action.payload.data;
          state.status = UpdateProfileState.success;
        }
      );
  },
});

export const selectUpdateProfile = (state: RootState) =>
  state.updateProfile;

export default updateprofileSlice.reducer;
