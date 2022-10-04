<<<<<<< HEAD
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
=======
import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom'
>>>>>>> ed4519ac69aab03135b8884b8f0ac7c391f7e929

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return navigate("/login");
  }
  return children;
};

<<<<<<< HEAD
export default PrivateRoute;
=======
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);    

    if(!isAuthenticated){
        return <Navigate to="/login" />
    }
    return children;
    
}

export default PrivateRoute;
>>>>>>> ed4519ac69aab03135b8884b8f0ac7c391f7e929
