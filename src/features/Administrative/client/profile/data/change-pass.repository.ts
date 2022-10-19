import { AxiosInstance } from "axios";

export interface LinkToChangePasswordParams {
  email: string;
  link: string | undefined;
  ACCESS_TOKEN: string;
  insterceptor: AxiosInstance;
}

export interface LinkToChangePasswordResponse {
  data: {
    message: string;
    success: false;
  };
}

export interface ChangePasswordParams {
  confirmPassword: string;
  password: string;
  ACCESS_TOKEN: string;
  insterceptor: AxiosInstance;
}

export interface ChangePasswordResponse {
  data: {
    message: string;
    success: false;
  };
}

export interface BackChangePasswordParams {
  ACCESS_TOKEN: string;
  insterceptor: AxiosInstance;
}

export interface BackChangePasswordResponse {
  data: {
    message: string;
    success: false;
  };
}


export function LinkToChangePasswordRepository(
  params: LinkToChangePasswordParams
): Promise<LinkToChangePasswordResponse> {
  return params.insterceptor.post(
    `${process.env.REACT_APP_API}/change-password`,
    params,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.ACCESS_TOKEN}`,
      },
      withCredentials: true,
    }
  );
}



export function ChangePasswordRepository(
  params: ChangePasswordParams
): Promise<ChangePasswordResponse> {
  return params.insterceptor.post(
    `${process.env.REACT_APP_API}/changepassword`,
    params,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.ACCESS_TOKEN}`,
      },
      withCredentials: true,
    }
  );
}



export function BackChangePasswordRepository(
  params: BackChangePasswordParams
): Promise<BackChangePasswordResponse> {
  return params.insterceptor.get(
    `${process.env.REACT_APP_API}/close-changepass`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.ACCESS_TOKEN}`,
      },
      withCredentials: true,
    }
  );
}
