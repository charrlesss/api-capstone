import { useEffect, useCallback } from "react";
import axios from "axios";
import {
  useAppDispatch,
  useAppSelector,
} from "../hooks/dispatch-selector.hooks";
import {
  selectAuthentication,
  getAuthentication,
} from "../features/shared/presentation/slices/authentication.slices";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const useInterceptorAxios = () => {
  const authenticateUser: any = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuthentication());
  }, [dispatch]);

  useEffect(() => {
    if (authenticateUser?.data === undefined) return;

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
              id: authenticateUser?.data?.user._id,
              REFRESH_TOKEN: authenticateUser?.data?.user.REFRESH_TOKEN,
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
  }, [authenticateUser]);

  const getAccessToken = useCallback(
    (): string =>
      authenticateUser?.data?.success
        ? authenticateUser?.data.user.ACCESS_TOKEN
        : "",
    [authenticateUser]
  );
  const getRefreshToken = useCallback(
    (): string =>
      authenticateUser?.data?.success
        ? authenticateUser?.data.user.REFRESH_TOKEN
        : "",
    [authenticateUser]
  );
  const isAuthenticated = useCallback(
    (): boolean => authenticateUser?.data?.success,
    [authenticateUser]
  );

  return {
    getAccessToken,
    getRefreshToken,
    isAuthenticated,
    instance,
  };
};
