import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import TeacherDashboard from "./dashboard/TeacherDashboard";
import StudentDashboard from "./dashboard/StudentDashboard";

import "./Home.scss";

const Home = () => {
  const user_type = useSelector((state) => state.auth.user.user_type);

  if (user_type === "admin") {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      {user_type === "student" && <StudentDashboard />}
      {user_type === "teacher" && <TeacherDashboard />}
    </>
  );
};

export default Home;
