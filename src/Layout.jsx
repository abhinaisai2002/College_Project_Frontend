import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./pages/sidebar/Sidebar";

const Layout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="app">
      {isAuthenticated && <Sidebar />}
      {isAuthenticated ? (
        <div className="app_content">{children}</div>
      ) : (
        children
      )}
    </div>
  );
};

export default Layout;
