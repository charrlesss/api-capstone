import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../config/store";
import { GetFacilitiesResponse ,GetFacilitiesParams  ,GetFacilities} from "../../data/facilities.repository";

export enum getFacilitiesState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: getFacilitiesState;
  data: GetFacilitiesResponse | undefined;
} = {
  status: getFacilitiesState.initial,
  data: undefined,
};

export const getFacilities = createAsyncThunk(
  "getFacilities",
  async (params:GetFacilitiesParams) => {
    const response: GetFacilitiesResponse = await GetFacilities(params);
    return response.data;
  }
);

/* Main Slice */
export const getFacilitiesSlice = createSlice({
  name: "getFacilities",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getFacilities.pending, (state: any) => {
        state.status = getFacilitiesState.inProgress;
      })
      .addCase(
        getFacilities.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: GetFacilitiesResponse }>
        ) => {
          const data = action.payload;
          state.status = getFacilitiesState.success;
          state.data = data;
        }
      )
      .addCase(
        getFacilities.rejected,
        (
          state: any,
          action: PayloadAction<{ data: GetFacilitiesResponse }>
        ) => {
          state.data = action.payload;
          state.status = getFacilitiesState.success;
        }
      );
  },
});

export const selectFacilitiesSlice = (state: RootState) =>
  state.getFacilities;

export default getFacilitiesSlice.reducer;
