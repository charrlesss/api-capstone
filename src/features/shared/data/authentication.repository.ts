import axios, { AxiosInstance } from "axios";

export interface AuthenticationResponse {
  data: {
    messages: string;
    success: boolean;
    user: {
      REFRESH_TOKEN: string;
      ACCESS_TOKEN: string;
      _id: any;
    };
  };
}
export interface VerifyUserEmailResponse {
  data: {
    verifying: boolean | undefined;
    email: string;
  };
}

export interface VerifyUserEmailWithCodeResponse {
  data: {
    message: string;
    success: boolean;
  };
}
export interface VerifyUserEmailWithCodeParams {
  code: string;
  email: string;
}

const REACT_APP_API = process.env.REACT_APP_API;

export function AuthenticationRepository(): Promise<AuthenticationResponse> {
  return axios.get(`${REACT_APP_API}/authenticated-user`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function GetClientRepository(params: {
  ACCESS_TOKEN: string;
  interceptor: AxiosInstance;
}): Promise<any> {
  return params.interceptor.get(`/get-client-details`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.ACCESS_TOKEN}`,
    },
    withCredentials:true
  });
}

export function GetLogoutClientRepository(params: {
  ACCESS_TOKEN: string;
  interceptor: AxiosInstance;
}): Promise<any> {
  return params.interceptor.delete(`/logout`, {
    headers: {
      Authorization: `Bearer ${params.ACCESS_TOKEN}`,
    },
    withCredentials:true
  });
}

export function VerifyUserEmailRepository(): Promise<VerifyUserEmailResponse> {


  return axios.get(process.env.REACT_APP_API + "/verifying-account", {
    withCredentials: true,
    headers: {
      "Content-Type": "appplication/json",
    },
  });
}

export function VerifyUserEmailWithCodeRepository(
  params: VerifyUserEmailWithCodeParams
): Promise<VerifyUserEmailWithCodeResponse> {
  return axios.post(
    process.env.REACT_APP_API + "/verifying-account-with-code",
    params,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
}

export interface RemoveAccountNotVerifiedResponse {
  data: {
    message: string;
    success: boolean;
  };
}
export interface RemoveAccountNotVerifiedParams {
  email: string;
}

export function RemoveAccountNotVerifiedRepository(
  params: RemoveAccountNotVerifiedParams
): Promise<RemoveAccountNotVerifiedResponse> {
  return axios.post(process.env.REACT_APP_API + "/not-verify-account", params, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}
