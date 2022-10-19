import { useEffect, useCallback } from "react";
import axios from "axios";
import {
  useAppDispatch,
  useAppSelector,
} from "../hooks/dispatch-selector.hooks";
import {
  selectIsAuthenticatedAdmin,
  isAuthenticatedAdmin,
} from "../features/Administrative/admin/presentation/slices/is-authenticated-admin.slices";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const useInterceptorAdminAxios = () => {
  const isAuthenticateAdmin: any = useAppSelector(selectIsAuthenticatedAdmin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isAuthenticatedAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticateAdmin?.data === undefined) return;

    instance.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const originalConfig = err.config;

        if (err.response.status === 402 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const res = await instance.post("/refresh-token", {
              id: isAuthenticateAdmin?.data?.data._id,
              REFRESH_TOKEN: isAuthenticateAdmin?.data?.data.REFRESH_TOKEN,
            });
            if (res.data.success) {
              window.location.reload();
            }
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
        return Promise.reject(err);
      }
    );
  }, [isAuthenticateAdmin]);

  const getAccessToken = useCallback(
    (): string =>
      isAuthenticateAdmin?.data?.success
        ? isAuthenticateAdmin?.data.data.ACCESS_TOKEN
        : "",
    [isAuthenticateAdmin]
  );
  const getRefreshToken = useCallback(
    (): string =>
      isAuthenticateAdmin?.data?.success
        ? isAuthenticateAdmin?.data.data.REFRESH_TOKEN
        : "",
    [isAuthenticateAdmin]
  );
  const isAuthenticated = useCallback(
    (): boolean => isAuthenticateAdmin?.data?.success,
    [isAuthenticateAdmin]
  );
  return {
    getAccessToken,
    getRefreshToken,
    isAuthenticated,
    instance,
  };
};
