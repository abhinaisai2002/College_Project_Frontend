import React from "react";
import { Spinner as Loader } from "react-bootstrap";

const Spinner = () => {
  return (
    <div className="spinner" style={{ width: "100%", height: "100%" }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Spinner;
