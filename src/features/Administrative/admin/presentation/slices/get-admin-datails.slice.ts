import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../config/store";
import { GetAdminDetailsParams ,GetAdminDetailsRepository} from "../../data/admin-authentication.repository";
export enum GetAdminDetailsState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetAdminDetailsState;
  data: any | undefined;
  success: boolean;
} = {
  status: GetAdminDetailsState.initial,
  data: undefined,
  success: false,
};

export const getAdminDetails = createAsyncThunk(
  "getAdminDetails",
  async (params: GetAdminDetailsParams) => {
    const response: any = await GetAdminDetailsRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const getAdminDetailsSlice = createSlice({
  name: "getAdminDetails",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAdminDetails.pending, (state: any) => {
        state.status = GetAdminDetailsState.inProgress;
      })
      .addCase(
        getAdminDetails.fulfilled,
        (state: any, action: PayloadAction<{ data: any }>) => {
          const {data} = action.payload;
          state.status = GetAdminDetailsState.success;
          state.data = data;
        }
      )
      .addCase(
        getAdminDetails.rejected,
        (state: any, action: PayloadAction<{ data: any }>) => {
          state.data = action.payload.data;
          state.status = GetAdminDetailsState.success;
        }
      );
  },
});

export const selectGetAdminDetails = (state: RootState) => state.getAdminDetails;

export default getAdminDetailsSlice.reducer;
