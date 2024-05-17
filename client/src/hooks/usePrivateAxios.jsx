/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import { useEffect } from "react";
import refreshAccessToken from "../api/refreshAccessToken";
import { useAuthCtx } from "../context/authContext";
import { customAxios } from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const usePrivateAxios = () => {
  const { user, setUser } = useAuthCtx();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const requestInterceptor = customAxios.interceptors.request.use(
      (config) => {
        if (!config.headers.authorization) {
          config.headers.authorization = user.token
            ? `Bearer ${user.token}`
            : undefined;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );
    const responseInterceptor = customAxios.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevReq = err?.config;
        if (err?.response?.status === 428)
          navigate("/", { state: { from: location }, replace: true });
        if (err?.response?.status === 401 && !prevReq?.sent) {
          prevReq.sent = true;
          const token = await refreshAccessToken();
          setUser((p) => ({ ...p, token }));
          prevReq.headers.authorization = `Bearer ${token}`;
          return customAxios(prevReq);
        }
        return Promise.reject(err);
      }
    );
    return () => {
      customAxios.interceptors.request.eject(requestInterceptor);
      customAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, setUser]);

  return customAxios;
};

export default usePrivateAxios;
