import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./pages/sidebar/Sidebar";

import { ThemeContext } from "./contexts/ThemeContext";

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
      <div className={`app app-${theme}`}>
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
