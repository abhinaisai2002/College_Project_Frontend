import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ToastContainer } from "react-toastify";
import { toast_container_props } from "./Config";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer {...toast_container_props}  />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
