import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../components/UI/spinners/Spinner";

const PrivateRoute = ({ children }) => {
  const {user,isAuthenticated} = useSelector((state) => state.auth);

  const isLoading = useSelector(state => state.loader.showLoader);

  if(isLoading)
    return <Spinner />

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
