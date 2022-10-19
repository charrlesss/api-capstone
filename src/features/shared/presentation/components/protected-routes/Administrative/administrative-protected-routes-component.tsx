import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useInterceptorAxios } from "../../../../../../lib/interceptor-axios";
import { BackdropLoading } from "../../../pages/loading.page";
export const AdministrativeProtectedRoutesComponent = () => {
  const { isAuthenticated } = useInterceptorAxios();

  if (isAuthenticated() === undefined) {
    return <BackdropLoading open={true} />;
  }

  return <div>{isAuthenticated() ? <Outlet /> : <Navigate to="/" />}</div>;
};
