import { useEffect } from "react";
import {
  getClient,
  selectClient,
} from "../features/shared/presentation/slices/client.slices";
import { useInterceptorAxios } from "../lib/interceptor-axios";
import { useAppDispatch, useAppSelector } from "./dispatch-selector.hooks";

interface useGetClientDetailsTypes {
  client: any;
}

export const useGetClientDetails = (): useGetClientDetailsTypes => {
  const getClientDetails = useAppSelector(selectClient);
  const { isAuthenticated, getAccessToken, instance } = useInterceptorAxios();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        getClient({
          ACCESS_TOKEN: getAccessToken(),
          interceptor: instance,
        })
      );
    }
  }, [dispatch, isAuthenticated, getAccessToken, instance]);

  return {
    client: getClientDetails?.data?.data,
  };
};
