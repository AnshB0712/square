import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthCtx = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    role: [],
    token: "",
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
