import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../config/store";

import { GetVisitorTypesParams ,GetVisitorTypesRepository,GetVisitorTypesResponse } from "../../data/make-appointment.request.repository";

export enum GetVisitorTypesState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetVisitorTypesState;
  data: GetVisitorTypesResponse | undefined;
} = {
  status: GetVisitorTypesState.initial,
  data: undefined,
};

export const getVisitorTypes = createAsyncThunk(
  "getVisitorTypes",
  async (params:GetVisitorTypesParams) => {
    const response: GetVisitorTypesResponse = await GetVisitorTypesRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const getVisitorTypesSlice = createSlice({
  name: "getVisitorTypes",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getVisitorTypes.pending, (state: any) => {
        state.status = GetVisitorTypesState.inProgress;
      })
      .addCase(
        getVisitorTypes.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: GetVisitorTypesResponse }>
        ) => {
          const {data} = action.payload;
          state.status = GetVisitorTypesState.success;
          state.data = data;
        }
      )
      .addCase(
        getVisitorTypes.rejected,
        (
          state: any,
          action: PayloadAction<{ data: GetVisitorTypesResponse }>
        ) => {
          state.data = action.payload;
          state.status = GetVisitorTypesState.success;
        }
      );
  },
});

export const selectGetVisitorTypes = (state: RootState) =>
  state.getVisitorTypes;

export default getVisitorTypesSlice.reducer;
