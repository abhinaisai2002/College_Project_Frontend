import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { authActions } from "./redux/reducers/authSlice";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Upload from "./pages/admin/Upload";
import Teachers from "./pages/admin/Teachers";
import Admin from "./pages/Admin";

import PublicRoute from "./utils/PublicRoute";
// import PrivateRoute from "./utils/PrivateRoute";

import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const user =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    if (!access || !refresh || !user) {
    } else {
      dispatch(authActions.loginDataFromLocal({ access, refresh, user }));
    }
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          // <PrivateRoute>
          <Home />
          // </PrivateRoute>
        }
      />
      <Route exact path="admin" element={<Admin />} />
      <Route exact path="admin/upload" element={<Upload />} />
      <Route exact path="admin/teachers" element={<Teachers />} />

      <Route
        exact
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        exact
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
    </Routes>
  );
}
export default App;
