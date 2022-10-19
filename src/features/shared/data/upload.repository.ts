import { AxiosInstance } from "axios";

export interface UploadPhotoParams {
  updloadProfile: any;
  ACCESS_TOKEN: string;
  insterceptor: AxiosInstance;
}
export interface GetUploadPhotoParams {
  ACCESS_TOKEN: string;
  insterceptor: AxiosInstance;
}

export interface GetUploadPhotoResponse {
  data: {
    messages: string;
    success: boolean;
    data: any;
  };
}

export interface UploadPhotoResponse {
  data: {
    messages: string;
    success: boolean;
    data:any
  };
}

export function UploadPhotoRepository(
  params: UploadPhotoParams
): Promise<UploadPhotoResponse> {
  const formData = new FormData();
  formData.append("updloadProfile", params.updloadProfile);
  return params.insterceptor.post(
    `${process.env.REACT_APP_API}/upload-file`,
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

export function GetUploadPhotoRepository(
  params: GetUploadPhotoParams
): Promise<GetUploadPhotoResponse> {
  return params.insterceptor.get(`${process.env.REACT_APP_API}/get-upload-file`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.ACCESS_TOKEN}`,
    },
    withCredentials: true,
  });
}
