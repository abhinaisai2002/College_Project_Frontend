import React from "react";
// import Signup from "./pages/Signup";

const Layout = ({ children }) => {
  return (
    <div className="app">
      {/* Sidebar */}
      <div className="app_content">{children}</div>
    </div>
  );
};

export default Layout;
