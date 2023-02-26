import React, { useContext, useReducer } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import TeacherFilterForm from "../assignments/teacher/TeacherFilterFormD";

const TeacherDashboard = () => {
  const { theme } = useContext(ThemeContext);

  return <TeacherFilterForm />;
};

export default TeacherDashboard;
