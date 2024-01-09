import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({children}){
  let isUserLoggedIn = sessionStorage.getItem("userToken") ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
   return useContext(AuthContext);
}