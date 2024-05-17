import { useQuery } from "@tanstack/react-query";
import { customAxios } from "../../api/axios.js";
import { SplashScreen } from "./splashScreen.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthCtx } from "../../context/authContext.jsx";
import { useEffect } from "react";

const refreshSession = async () => {
  const { data } = await customAxios("/auth/refresh-session");
  return data;
};

export const PersistUser = () => {
  const { setUser, user } = useAuthCtx();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["refresh-session"],
    queryFn: refreshSession,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isError) {
    return <Navigate to={"/"} />;
  }

  if (isLoading || !user.token) return <SplashScreen />;

  return <Outlet />;
};
