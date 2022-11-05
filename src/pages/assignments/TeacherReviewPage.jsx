import React, { useContext } from "react";

import { ThemeContext } from "../../contexts/ThemeContext";

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

export default TeacherReviewPage;
