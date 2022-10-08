import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [user,isAuthenticated] = useSelector((state) => {
    return [state.auth.user,(state.auth.isAuthenticated && state.auth.user['user_type'] === 'admin')];
  });
  console.log(user,isAuthenticated);
  if(!user && !isAuthenticated){
    return <p>Loading......</p>
  }
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;
