import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { authActions } from "./redux/reducers/authSlice";
import { loaderActions } from "./redux/reducers/loaderSlice";

import { ThemeProvider } from "./contexts/ThemeContext";

import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Upload from "./pages/admin/UploadPage";
import Admin from "./pages/admin/Admin";

import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

import ErrorPage from "./pages/404/ErrorPage";
import AdminRoute from "./utils/AdminRoute";
import ModalComp from "./utils/Modal";
import Layout from "./Layout";
import Teachers from "./pages/admin/Teachers";
import Assignment from "./pages/assignments/AssignmentD";
import ProfilePage from "./pages/ProfilePage";
import GradeAssignment from "./pages/assignments/teacher/GradeAssignment";

const PRIVATE_ROUTES = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/assignment/:id",
    element: <Assignment />,
  },
  {
    path: "/grade-assignment/:id",
    element: <GradeAssignment />,
  },
];

const ADMIN_ROUTES = [
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/upload",
    element: <Upload />,
  },
  {
    path: "/admin/teachers",
    element: <Teachers />,
  },
];

const PUBLIC_ROUTES = [
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(loaderActions.showLoading());
    ////////////////////////
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const user =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    if (!access || !refresh || !user) {
    } else {
      dispatch(authActions.loginDataFromLocal({ access, refresh, user }));
    }
    ////////////////////////
    dispatch(loaderActions.stopLoading());
  }, []);

  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          {PRIVATE_ROUTES?.map((route) => (
            <Route
              exact
              key={route?.path}
              path={route?.path}
              element={<>{route?.element}</>}
              // element={<PrivateRoute>{route?.element}</PrivateRoute>}
            />
          ))}

          {ADMIN_ROUTES?.map((route) => (
            <Route
              exact
              key={route?.path}
              path={route?.path}
              element={<>{route?.element}</>}
              // element={
              //   <PrivateRoute>
              //     <AdminRoute>{route?.element}</AdminRoute>
              //   </PrivateRoute>
              // }
            />
          ))}

          {PUBLIC_ROUTES?.map((route) => (
            <Route
              exact
              key={route?.path}
              path={route?.path}
              element={<>{route?.element}</>}
              // element={<PublicRoute>{route?.element}</PublicRoute>}
            />
          ))}

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
