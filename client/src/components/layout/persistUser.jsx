import { customAxios } from "../../api/axios.js";
import { SplashScreen } from "./splashScreen.jsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthCtx } from "../../context/authContext.jsx";
import { useEffect } from "react";

const refreshSession = async () => {
  try {
    const { data } = await customAxios("/auth/refresh-session");
    return data;
  } catch (error) {
    console.error("Error refreshing session:", error);
    throw error;
  }
};

import { useState } from "react";

export const PersistUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, user } = useAuthCtx();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const data = await refreshSession();
        setUser(data.data);
      } catch (err) {
        console.error(err);
        navigate("/", { state: { from: location }, replace: true });
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !user?.token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLoading ? <SplashScreen /> : <Outlet />}</>;
};
