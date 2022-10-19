import { AxiosInstance } from "axios";


export interface GetFacilitiesParams{
    ACCESS_TOKEN:string,
    interceptor:AxiosInstance
  }
export interface GetFacilitiesResponse{
    data:any
}

export function GetFacilities(params:GetFacilitiesParams ): Promise<GetFacilitiesResponse> {
    return params.interceptor.get(`/facilities`, {
      headers: {
           Authorization: `Bearer ${params.ACCESS_TOKEN}`,
      },
    });
  }