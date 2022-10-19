import axios, { AxiosInstance } from "axios";

export interface AuthParams {
  email: string;
  password: string;
}
export interface RegisterParams {
  fullname: string;
  gender: string;
  email: string;
  confirmPassword: string;
  birthdate: string;
  password: string;
}

export interface CompleteDetailsParams {
  gender: string;
  birthdate: string;
  address: string;
  contact: string;
  profile: any;
  ACCESS_TOKEN: string;
  insterceptor: AxiosInstance;
}

export interface UpdateProfileParams {
  _id:any
  gender: string;
  birthdate: string;
  address: string;
  contact: string;
  profile: any;
  name: string;
  email: string;
  ACCESS_TOKEN: string;
  insterceptor: AxiosInstance;
}

export interface AuthUserResponse {
  data: {
    REFRESH_TOKEN: string;
    ACCESS_TOKEN: string;
    _id: any;
  };
}

export interface RegisterResponse {
  data: {
    messages: string;
    success: boolean;
  };
}

export interface CompleteDetailsResponse {
  data: {
    messages: string;
    success: boolean;
  };
}

export interface UpdateProfileResponse {
  data: {
    messages: string;
    success: boolean;
  };
}

const REACT_APP_API = process.env.REACT_APP_API;

export function AuthUserRepository(
  params: AuthParams
): Promise<AuthUserResponse> {
  return axios.post(`${REACT_APP_API}/auth-user`, params, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function RegisterRepository(
  params: RegisterParams
): Promise<RegisterResponse> {
  return axios.post(`${REACT_APP_API}/register-user`, params, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function CompleteDetailsRepository(
  params: CompleteDetailsParams
): Promise<CompleteDetailsResponse> {
  const formData = new FormData();
  formData.append("gender", params.gender);
  formData.append("birthdate", params.birthdate);
  formData.append("address", params.address);
  formData.append("contact", params.contact);
  formData.append("profile", params.profile);

  return params.insterceptor.post(
    `${REACT_APP_API}/complete-details`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${params.ACCESS_TOKEN}`,
      },
      withCredentials: true,
    }
  );
}

export function UpdateProfileRepository(
  params: UpdateProfileParams
): Promise<UpdateProfileResponse> {
  const formData = new FormData();
  formData.append("gender", params.gender);
  formData.append("birthdate", params.birthdate);
  formData.append("address", params.address);
  formData.append("contact", params.contact);
  formData.append("profile", params.profile);
  formData.append("email", params.email);
  formData.append("name", params.name);

  return params.insterceptor.post(
    `${process.env.REACT_APP_API}/update-profile`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${params.ACCESS_TOKEN}`,
      },
      withCredentials: true,
    }
  );
}
