import axios from "axios";

export interface ForgotPaswordParams {
  email: string;
}

export interface ForgotPaswordResponse {
  data: {
    message: string;
    success: boolean;
  };
}

const REACT_APP_API = process.env.REACT_APP_API;

export function ForgotPaswordRepository(
  params: ForgotPaswordParams
): Promise<ForgotPaswordResponse> {
  return axios.post(`${REACT_APP_API}/forgotpassword-email`, params, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export interface ForgotPaswordCodeVerificationParams {
  code: string;
}

export interface ForgotPaswordCodeVerificationResponse {
  data: {
    message: string;
    success: boolean;
  };
}

export function ForgotPaswordCodeVerificationRepository(
  params: ForgotPaswordCodeVerificationParams
): Promise<ForgotPaswordCodeVerificationResponse> {
  return axios.post(`${REACT_APP_API}/forgotpassword-code`, params, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export interface ForgotPaswordAuthorizeResponse {
  data: {
    message: string;
    success: boolean;
    data: {
      authorized: boolean;
    };
  };
}

export function ForgotPaswordAuthorizeRepository(): Promise<ForgotPaswordAuthorizeResponse> {
  return axios.get(`${REACT_APP_API}/forgotpassword-authorize`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export interface ForgotPasswordUpdateParams {
  confirmPassword: string;
  password: string;
}

export interface ForgotPasswordUpdateResponse {
  data: {
    message: string;
    success: boolean;
  };
}

export function ForgotPaswordUpdateRepository(
  params: ForgotPasswordUpdateParams
): Promise<ForgotPasswordUpdateResponse> {
  return axios.post(`${REACT_APP_API}/forgotpassword-update`, params, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}
