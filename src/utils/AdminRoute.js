import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../components/UI/spinners/Spinner";
import { logOut } from "../redux/actions/loginAction";
import { authActions } from "../redux/reducers/authSlice";

const AdminRoute = ({ children }) => {
  const [token,user,isAuthenticated] = useSelector((state) => {
    return [state.auth.access,state.auth.user,(state.auth.isAuthenticated && state.auth.user['user_type'] === 'admin')];
  });
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <CheckAdmin token={token}>
      <div>
        {children}
      </div>
    </CheckAdmin>
  );
};

const CheckAdmin = ({token,children})=>{
  
  const dispatch = useDispatch();

  useEffect(()=>{
    const sendReq = async ()=>{
      const response = await axios.get('http://localhost:8000/api/checkadmin',{
        headers:{
          'Authorization' : `Bearer ${token}`
        }
      })
      return response.data;
    } 

    sendReq().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
      dispatch(logOut());
    })


  },[])
  return children;
}

export default AdminRoute;
