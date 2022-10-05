import React, { useState } from "react";
import { useEffect } from "react";

import { Table } from "react-bootstrap";
import "../../styles/Teachers.scss";

const DUMMY_TEACHERS = [
  {
    id: 1,
    name: "N Praveen Kumar",
    department: "CSE",
    job_title: "Associate Professor",
    mail: "praveen@gmail.com",
    phone: "8523490246",
  },
  {
    id: 2,
    name: "Putta Abhinai Sai",
    department: "CSE",
    job_title: "Professor",
    mail: "abhinaisai@gmail.com",
    phone: "6782348792",
  },
  {
    id: 3,
    name: "Hemanth VMK",
    department: "CSE",
    job_title: "HOD",
    mail: "hemujunior@gmail.com",
    phone: "8923748367",
  },
  {
    id: 4,
    name: "Jinna",
    department: "CSE",
    job_title: "Assistant Professor",
    mail: "jinnamanchu@gmail.com",
    phone: "7898394389",
  },
];

const TeachersTable = ({ teachersData }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(
      teachersData.map((teacher) => {
        return {
          ...teacher,
          value: teacher.name.split(" ").join("_"),
          isChecked: false,
        };
      })
    );
  }, [teachersData]);

  const handleAllCheckHandler = (e) => {
    setData((prev) =>
      prev.map((teacher) => {
        return {
          ...teacher,
          isChecked: e.target.checked,
        };
      })
    );
  };

  const handleCheckChildElement = (e) => {
    setData((prev) =>
      prev.map((teacher) => {
        return {
          ...teacher,
          isChecked:
            teacher.value === e.target.value
              ? e.target.checked
              : teacher.isChecked,
        };
      })
    );
  };

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              value="checkedAll"
              onChange={handleAllCheckHandler}
            />
          </th>
          {["name", "department", "job title", "mail", "phone"].map(
            (header) => (
              <th key={header}>{header.toUpperCase()}</th>
            )
          )}
          <th>
            <Button title="Approve All" className="btn-success" />
          </th>
          <th>
            <Button title="Disapprove All" className="btn-danger" />
          </th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((teacher) => (
            <tr key={teacher.id}>
              <td>
                <input
                  type="checkbox"
                  checked={teacher.isChecked}
                  onChange={handleCheckChildElement}
                  value={teacher.value}
                />
              </td>
              <td>{teacher.name}</td>
              <td>{teacher.department}</td>
              <td>{teacher.job_title}</td>
              <td>{teacher.mail}</td>
              <td>{teacher.phone}</td>
              <td>
                <Button
                  title="Approve"
                  className="btn-success"
                  disabled={teacher.isChecked}
                />
              </td>
              <td>
                <Button
                  title="Disapprove"
                  className="btn-danger"
                  disabled={teacher.isChecked}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const Button = ({ title, className, ...otherprops }) => {
  return (
    <button className={`table__button ${className}`} {...otherprops}>
      {title}
    </button>
  );
};

const Teachers = () => {
  return (
    <>
      <div className="teachers_page__wrapper">
        <header>
          <h1>
            Teachers <span>Approval/Disapproval</span>
          </h1>
        </header>
        <main>
          <TeachersTable teachersData={DUMMY_TEACHERS} />
        </main>
      </div>
    </>
  );
};

export default Teachers;


