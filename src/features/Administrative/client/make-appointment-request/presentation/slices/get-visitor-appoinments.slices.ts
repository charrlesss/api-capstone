import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../config/store";

import {
  GetVisitorAppointmentParams,
  GetVisitorAppointmentRepository,
  GetVisitorAppointmentResponse,
} from "../../data/make-appointment.request.repository";

export enum GetVisitorAppointmentState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: GetVisitorAppointmentState;
  data: GetVisitorAppointmentResponse | undefined;
} = {
  status: GetVisitorAppointmentState.initial,
  data: undefined,
};

export const getVisitorAppointment= createAsyncThunk(
  "getVisitorAppointment",
  async (params: GetVisitorAppointmentParams) => {
    const response: GetVisitorAppointmentResponse =
      await GetVisitorAppointmentRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const getVisitorAppointmentSlice = createSlice({
  name: "getVisitorAppointment",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getVisitorAppointment.pending, (state: any) => {
        state.status = GetVisitorAppointmentState.inProgress;
      })
      .addCase(
        getVisitorAppointment.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: GetVisitorAppointmentResponse }>
        ) => {
          const { data } = action.payload;
          state.status = GetVisitorAppointmentState.success;
          state.data = data;
        }
      )
      .addCase(
        getVisitorAppointment.rejected,
        (
          state: any,
          action: PayloadAction<{ data: GetVisitorAppointmentResponse }>
        ) => {
          state.data = action.payload;
          state.status = GetVisitorAppointmentState.success;
        }
      );
  },
});

export const selectGetVisitorAppointment = (state: RootState) =>
  state.getVisitorAppointment;

export default getVisitorAppointmentSlice.reducer;
