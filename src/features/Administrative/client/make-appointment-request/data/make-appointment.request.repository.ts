import { AxiosInstance } from "axios";

export interface VisitorAppointmentParams {
  ACCESS_TOKEN: string;
  interceptor: AxiosInstance;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  contact: string | undefined;
  address: string | undefined;
  city: string | undefined;
  zipcode: string | undefined;
  country: string | undefined;
  arrivalDate: string | undefined;
  departureDate: string | undefined;
  purpose: string | undefined;
  userIdRequest:string | undefined
}
export interface VisitorAppointmentResponse {
  data: any;
}

export function VisitorAppointmentRepository(
  params: VisitorAppointmentParams
): Promise<VisitorAppointmentResponse> {
  console.log("asdasd");
  const {ACCESS_TOKEN ,interceptor ,...rest} = params
  return interceptor.post(`/make-appointment`,rest, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    withCredentials: true,
  });
}

export interface GetVisitorAppointmentParams {
  ACCESS_TOKEN: string;
  interceptor: AxiosInstance;
}

export interface GetVisitorAppointmentResponse {
  data: {
    data:any,
    message:string,
    success:boolean
  };
}

export function GetVisitorAppointmentRepository(
  params:GetVisitorAppointmentParams
): Promise<any> {
  console.log("asdasd");
  const {ACCESS_TOKEN ,interceptor } = params
  return interceptor.get(`/get-appointments`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    withCredentials: true,
  });
}
