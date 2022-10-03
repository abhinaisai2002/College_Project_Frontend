import "./App.scss";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
import PublicRoute from "./utils/PublicRoute";
import React from "react";


function App() {

  return (
    <Routes>
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
