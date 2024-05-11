import { useSuspenseQuery } from "@tanstack/react-query";
import { customAxios } from "../../api/axios.js";
import { SplashScreen } from "./splashScreen.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthCtx } from "../../context/authContext.jsx";
import { Suspense } from "react";
import { Loading } from "./loading.jsx";

const refreshSession = async () => {
  const { data } = await customAxios("/auth/refresh-session");
  return data;
};

export const PersistUser = () => {
  const { setUser, user } = useAuthCtx();
  const { isError, isLoading } = useSuspenseQuery({
    queryKey: ["refresh-session"],
    queryFn: refreshSession,
    staleTime: Infinity,
    onSuccess: (e) => setUser(e.data),
    enabled: !user.token,
  });

  if (isLoading) return <SplashScreen />;

  if (isError) {
    return <Navigate to={"/"} />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};
