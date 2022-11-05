import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Table } from "react-bootstrap";

const TeacherReviewPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <Table
        striped
        bordered
        hover
        variant={theme === "dark" ? "dark" : "light"}
      >
        <thead>
          <tr>
            {[""]?.map((header) => (
              <th key={header}>{header.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
      </Table>
    </div>
  );
};
