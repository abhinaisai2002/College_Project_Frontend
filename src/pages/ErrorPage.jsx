import React from "react";

import ErrorPageImage from "../assets/errorPageLight.jpeg";

import "../styles/ErrorPage.scss";

const ErrorPage = () => {
  return (
    <div className="error_page__wrapper">
      <img src={ErrorPageImage} alt="Error Page" />
    </div>
  );
};

export default ErrorPage;
