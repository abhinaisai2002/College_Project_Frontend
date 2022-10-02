import React from "react";
import "./Button.scss";

const Button = ({ text, secondary, type, rightIcon, ...other }) => {
  return (
    <button
      type={type ? type : "button"}
      className={`btn ${secondary ? "btn-secondary" : ""}`}
      {...other}
    >
      {text}{rightIcon}
    </button>
  );
};

export default Button;
