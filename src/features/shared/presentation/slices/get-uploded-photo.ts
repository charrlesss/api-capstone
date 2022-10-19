import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import { GetUploadPhotoParams ,GetUploadPhotoRepository ,GetUploadPhotoResponse } from "../../data/upload.repository";



export enum UploadPhotoState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UploadPhotoState;
  data: GetUploadPhotoResponse | undefined;
} = {
  status: UploadPhotoState.initial,
  data: undefined,
};

export const getUploadPhoto = createAsyncThunk(
  "uploadPhoto",
  async (params:GetUploadPhotoParams) => {
    const response: GetUploadPhotoResponse = await GetUploadPhotoRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const getUploadPhotoSlice = createSlice({
  name: "uploadPhoto",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getUploadPhoto.pending, (state: any) => {
        state.status = UploadPhotoState.inProgress;
      })
      .addCase(
        getUploadPhoto.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: GetUploadPhotoResponse }>
        ) => {
          const data = action.payload;
          state.status = UploadPhotoState.success;
          state.data = data;
        }
      )
      .addCase(
        getUploadPhoto.rejected,
        (
          state: any,
          action: PayloadAction<{ data: GetUploadPhotoResponse }>
        ) => {
          state.data = action.payload.data;
          state.status = UploadPhotoState.success;
        }
      );
  },
});

export const selectGetUploadPhoto = (state: RootState) =>
  state.getUploadPhoto;

export default getUploadPhotoSlice.reducer;
