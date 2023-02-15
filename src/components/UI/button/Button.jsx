import React from "react";
import "./Button.scss";

const Button = ({ text, secondary, type, leftIcon, rightIcon, ...other }) => {
  return (
    <button
      type={type ? type : "button"}
      className={`btn ${secondary ? "btn-secondary" : ""}`}
      {...other}
    >
      {leftIcon}
      {text}
      {rightIcon}
    </button>
  );
};

export default Button;
