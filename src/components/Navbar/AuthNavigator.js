import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

export  default function AuthNavigator({children})
{
  const { isLoggedIn } = useAuth();
  const { pathname } = useLocation();
  
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ prevPath: pathname }} />
  );
};