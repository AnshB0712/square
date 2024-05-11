import { useQuery } from "@tanstack/react-query";
import { customAxios } from "../../api/axios.js";
import { SplashScreen } from "./splashScreen.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthCtx } from "../../context/authContext.jsx";

const refreshSession = async () => {
  const { data } = await customAxios("/auth/refresh-session");
  return data;
};

export const PersistUser = () => {
  const { setUser } = useAuthCtx();
  const { isError, isLoading } = useQuery({
    queryKey: ["refresh-session"],
    queryFn: refreshSession,
    staleTime: Infinity,
    onSuccess: (e) => setUser(e.data),
  });

  if (isLoading) return <SplashScreen />;

  if (isError) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};
