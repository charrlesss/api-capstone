import { AxiosInstance } from "axios";


export interface GetVisitorTypesParams{
    ACCESS_TOKEN:string,
    interceptor:AxiosInstance
  }
export interface GetVisitorTypesResponse{
    data:any
}

export function GetVisitorTypesRepository(params:GetVisitorTypesParams ): Promise<GetVisitorTypesResponse> {
    return params.interceptor.get(`/visitor-types`, {
      headers: {
           Authorization: `Bearer ${params.ACCESS_TOKEN}`,
      },
    });
  }