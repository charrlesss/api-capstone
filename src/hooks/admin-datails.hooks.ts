import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./dispatch-selector.hooks";
import {
  getAdminDetails,
  selectGetAdminDetails,
} from "./../features/Administrative/admin/presentation/slices/get-admin-datails.slice";
import { useInterceptorAdminAxios } from "../lib/interceptor-admin-axios";
interface useGetClientDetailsTypes {
  admin: any;
}

export const useGetAdminDetails = (): useGetClientDetailsTypes => {
  const addminDetails = useAppSelector(selectGetAdminDetails);
  const { isAuthenticated, getAccessToken, instance } = useInterceptorAdminAxios();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        getAdminDetails({
          ACCESS_TOKEN: getAccessToken(),
          interceptor: instance,
        })
      );
    }
  }, [dispatch, isAuthenticated, getAccessToken, instance]);

  return {
    admin: addminDetails?.data?.data,
  };
};
