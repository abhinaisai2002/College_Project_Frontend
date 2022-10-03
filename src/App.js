import "./App.scss";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
import PublicRoute from "./utils/PublicRoute";
import React, { useEffect } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import {useDispatch} from 'react-redux';
import {authActions} from './redux/reducers/authSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    if(!access|| !refresh || !user){
    }
    else{
      console.log('hi');
        dispatch(authActions.loginDataFromLocal(user));
    }

  },[])

  return (
    <Routes>
      <Route exact path='/' element={<PrivateRoute>
                                              <Home />
                                            </PrivateRoute>}>
                                            
      </Route>
      <Route exact path="/signup" element={<PublicRoute>
                                              <Signup />  
                                            </PublicRoute>}>
      </Route>
      <Route exact path="/login" element={<PublicRoute>
                                              <Login />  
                                            </PublicRoute>}>
                              
      </Route>
      
    </Routes>
  );
}

export default App;
