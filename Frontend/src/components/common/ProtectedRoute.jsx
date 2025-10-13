import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, tokenKey }) => {
  const token = localStorage.getItem(tokenKey); // "adminToken" or "token"

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
