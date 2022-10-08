import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Admin.scss";

const Admin = () => {
  const navigate = useNavigate();
  console.log('hi era');
  return (
    <>
      <header>
        <div className="header__left">
          <h1>Admin</h1>
        </div>
        <div className="header__right"></div>
      </header>
      <section>
        <ul>
          <li onClick={() => navigate("teachers")}>
            navigate to <span>/teachers</span>
          </li>
          <li onClick={() => navigate("upload")}>
            navigate to <span>/upload</span>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Admin;
