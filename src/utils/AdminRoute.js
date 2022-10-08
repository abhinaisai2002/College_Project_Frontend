import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [token,user,isAuthenticated] = useSelector((state) => {
    return [state.auth.access,state.auth.user,(state.auth.isAuthenticated && state.auth.user['user_type'] === 'admin')];
  });
  console.log(user,isAuthenticated);
  if(!user && !isAuthenticated){
    return <p>Loading.....</p>
  }
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <CheckAdmin token={token}>
      {children}
    </CheckAdmin>
  );
};

const CheckAdmin = ({token,children})=>{
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
    })


  },[])

  return children;
}

export default AdminRoute;
