import React from 'react';
import { useSelector } from 'react-redux';
import {Redirect,Route, useNavigate} from 'react-router-dom'


const PrivateRoute = ({children})=>{

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);    
    const navigate = useNavigate();

    if(isAuthenticated){
        return navigate("/login");
    }
    return children;
    
}

export default PrivateRoute;