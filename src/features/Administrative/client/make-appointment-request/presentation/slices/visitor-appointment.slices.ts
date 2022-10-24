import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../config/store";

import {
  VisitorAppointmentParams,
  VisitorAppointmentRepository,
  VisitorAppointmentResponse,
} from "../../data/make-appointment.request.repository";

export enum VisitorAppointmentState {
  initial,
  inProgress,
  success,
  fail,
}

const initialState: {
  status: VisitorAppointmentState;
  data: VisitorAppointmentResponse | undefined;
} = {
  status: VisitorAppointmentState.initial,
  data: undefined,
};

export const visitorAppointment = createAsyncThunk(
  "visitorAppointment",
  async (params: VisitorAppointmentParams) => {
    const response: VisitorAppointmentResponse =
      await VisitorAppointmentRepository(params);
    return response.data;
  }
);

/* Main Slice */
export const visitorAppointmentSlice = createSlice({
  name: "visitorAppointment",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(visitorAppointment.pending, (state: any) => {
        state.status = VisitorAppointmentState.inProgress;
      })
      .addCase(
        visitorAppointment.fulfilled,
        (
          state: any,
          action: PayloadAction<{ data: VisitorAppointmentResponse }>
        ) => {
          const { data } = action.payload;
          state.status = VisitorAppointmentState.success;
          state.data = data;
        }
      )
      .addCase(
        visitorAppointment.rejected,
        (
          state: any,
          action: PayloadAction<{ data: VisitorAppointmentResponse }>
        ) => {
          state.data = action.payload;
          state.status = VisitorAppointmentState.success;
        }
      );
  },
});

export const selectVisitorAppointment = (state: RootState) =>
  state.visitorAppointment;

export default visitorAppointmentSlice.reducer;
