import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("key");
  return token ? <Outlet /> : <Navigate to="/register" />;
};
