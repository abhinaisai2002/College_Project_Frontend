import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { authActions } from "./redux/reducers/authSlice";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/HomeD";
import Upload from "./pages/admin/Upload";
import Admin from "./pages/Admin";
import Layout from './Layout'

import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

import ErrorPage from "./pages/ErrorPage";
import AdminRoute from "./utils/AdminRoute";
import ModalComp from "./utils/Modal";

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
    <Layout>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="admin/upload"
          element={
            <AdminRoute>
              <Upload />
            </AdminRoute>
          }
        />

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

        <Route exact path="*" element={<ErrorPage />} />
      </Routes>

      <div>
        <ModalComp />
      </div>
    </Layout>

  );
}
export default App;
