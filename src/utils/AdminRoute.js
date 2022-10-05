import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.isAuthenticated && state.auth.user['user_type'] === 'admin';
  });

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;
