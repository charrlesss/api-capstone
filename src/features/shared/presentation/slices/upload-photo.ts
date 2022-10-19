import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../config/store";
import { UploadPhotoRepository ,UploadPhotoParams,UploadPhotoResponse } from "../../data/upload.repository";



export enum UploadPhotoState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: UploadPhotoState;
  data: UploadPhotoResponse | undefined;
} = {
  status: UploadPhotoState.initial,
  data: undefined,
};

export const uploadPhoto = createAsyncThunk(
  "uploadPhoto",
  async (params:UploadPhotoParams) => {
    const response: UploadPhotoResponse = await UploadPhotoRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const uploadPhotoSlice = createSlice({
  name: "uploadPhoto",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(uploadPhoto.pending, (state: any) => {
        state.status = UploadPhotoState.inProgress;
      })
      .addCase(
        uploadPhoto.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: UploadPhotoResponse }>
        ) => {
          const data = action.payload;
          state.status = UploadPhotoState.success;
          state.data = data?.data;
        }
      )
      .addCase(
        uploadPhoto.rejected,
        (
          state: any,
          action: PayloadAction<{ data: UploadPhotoResponse }>
        ) => {
          state.data = action.payload.data;
          state.status = UploadPhotoState.success;
        }
      );
  },
});

export const selectUploadPhoto = (state: RootState) =>
  state.uploadPhoto;

export default uploadPhotoSlice.reducer;
