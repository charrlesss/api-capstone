import React  from "react";
import { Outlet, Navigate } from "react-router-dom";
import { BackdropLoading } from "../../../pages/loading.page";
import { useInterceptorAdminAxios } from "../../../../../../lib/interceptor-admin-axios";
export const AdministrativeProtectedAdminRoutesComponent = () => {
  const { isAuthenticated  } = useInterceptorAdminAxios();

  if (isAuthenticated() === undefined) {
    return <BackdropLoading open={true} />;
  }
  return (
    <React.Fragment>
      {isAuthenticated() ? <Outlet /> : <Navigate to="/admin" />}
    </React.Fragment>
  );
};
