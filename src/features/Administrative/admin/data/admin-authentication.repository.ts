import axios, { AxiosInstance } from "axios";

export interface AdminAuthenticationResponse {
  data: {
    success: boolean;
    message: string;
  };
}

export interface AdminAuthenticationParams {
  email: string;
  password: string;
}

export interface IsAuthenticatedAdminResponse {
  data: {
    success: boolean;
    message: string;
    data: {
      ACCESS_TOKEN: string;
      REFRESH_TOKEN: string;
      _id: any;
    };
  };
}

export interface GetAdminDetailsResponse {
  data: {
    success: boolean;
    message: string;
    data: any;
  };
}

export interface GetAdminDetailsParams {
  ACCESS_TOKEN: string;
  interceptor: AxiosInstance;
}

export function AdminAuthenticationRepository(
  params: AdminAuthenticationParams
): Promise<AdminAuthenticationResponse> {
  return axios.post(`${process.env.REACT_APP_API}/auth-admin`, params, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function IsAuthenticatedAdminRepository(): Promise<IsAuthenticatedAdminResponse> {
  return axios.get(`${process.env.REACT_APP_API}/authenticated-admin`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetAdminDetailsRepository(
  params: GetAdminDetailsParams
): Promise<GetAdminDetailsResponse> {
  return params.interceptor.get(
    `${process.env.REACT_APP_API}/get-admin-details`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.ACCESS_TOKEN}`,
      },
      withCredentials: true,
    }
  );
}
