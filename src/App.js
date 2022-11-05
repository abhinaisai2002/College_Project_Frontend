import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { authActions } from "./redux/reducers/authSlice";
import { loaderActions } from "./redux/reducers/loaderSlice";

import { ThemeProvider } from "./contexts/ThemeContext";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Upload from "./pages/admin/UploadPage";
import Admin from "./pages/Admin";

import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

import ErrorPage from "./pages/ErrorPage";
import AdminRoute from "./utils/AdminRoute";
import ModalComp from "./utils/Modal";
import Layout from "./Layout";
import Teachers from "./pages/admin/Teachers";
import Assignment from "./pages/assignments/AssignmentD";
import ProfilePage from "./pages/ProfilePage";

import TeacherReviewPage from "./pages/assignments/TeacherReviewPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loaderActions.showLoading());
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const user =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    if (!access || !refresh || !user) {
    } else {
      dispatch(authActions.loginDataFromLocal({ access, refresh, user }));
    }
    dispatch(loaderActions.stopLoading());
  }, []);

  return (
    <ThemeProvider>
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
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/assignment/:id"
            element={
              <PrivateRoute>
                <Assignment />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/admin"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin/upload"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <Upload />
                </AdminRoute>
              </PrivateRoute>
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

          <Route
            exact
            path="/admin/teachers"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <Teachers />
                </AdminRoute>
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/teachers/"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <Teachers />
                </AdminRoute>
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <TeacherReviewPage />
                </AdminRoute>
              </PrivateRoute>
            }
          />

          <Route exact path="*" element={<ErrorPage />} />
        </Routes>

        <div>
          <ModalComp />
        </div>
      </Layout>
    </ThemeProvider>
  );
}
export default App;
