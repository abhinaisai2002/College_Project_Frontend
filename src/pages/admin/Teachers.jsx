import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Table, Dropdown } from "react-bootstrap";
import LordIcon from "../../components/UI/lordIcons/LordIcon";

import { ReactComponent as SearchIcon } from "../../assets/Search.svg";
import { ReactComponent as MoreIcon } from "../../assets/more-vertical.svg";
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
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    setData((p) => teachersData);
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

  const handleApprove = async (id) => {
    console.log(id);
    const sendReq = async () => {
      const response = await axios.post(
        "http://localhost:8000/api/auth/approve",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };

    try {
      await sendReq();
    } catch (err) {
      console.log(err);
      return;
    }
    const dummyData = [...data];
    const dummyTeacherIndex = dummyData.findIndex(
      (teacher) => teacher.id === id
    );
    const dummyTeacher = dummyData[dummyTeacherIndex];
    dummyTeacher.approved = true;
    dummyData[dummyTeacherIndex] = dummyTeacher;
    setData((p) => dummyData);
  };

  const handleDissapprove = async (id) => {
    const sendReq = async () => {
      const response = await axios.post(
        "http://localhost:8000/api/auth/approve",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };

    try {
      await sendReq();
    } catch (err) {
      console.log(err);
    }

    const dummyData = [...data];
    const dummyTeacherIndex = dummyData.findIndex(
      (teacher) => teacher.id === id
    );
    const dummyTeacher = dummyData[dummyTeacherIndex];
    dummyTeacher.approved = false;
    dummyData[dummyTeacherIndex] = dummyTeacher;
    setData((p) => dummyData);
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
                  title={`${teacher.approved ? "Approved" : "Approve"}`}
                  className={`${
                    teacher.approved ? "btn-success" : "btn-danger"
                  }`}
                  disabled={teacher.isChecked}
                  onClick={() => handleApprove(teacher.id)}
                />
              </td>
              <td>
                <Button
                  title="Disapprove"
                  className="btn-danger"
                  disabled={teacher.isChecked}
                  onClick={() => handleDissapprove(teacher.id)}
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
  const [teachers, setTeachers] = useState([]);
  const [realTeachers, setRealTeachers] = useState([]);

  const [query, setQuery] = useState("");
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    //TODO: get teachers from api
    const getTeachers = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/auth/getteachers"
      );

      return response;
    };
    getTeachers().then((res) => {
      const { data } = res;
      setRealTeachers((prev) => data.teachers);
      setTeachers((prev) => data.teachers);
    });
  }, [refreshCounter]);

  useEffect(() => {
    if (query !== "") {
      let tempTeachers = [...teachers];
      tempTeachers = realTeachers.filter((teacher) =>
        ["name", "phone", "mail"].some((key) =>
          teacher[key].toLowerCase().includes(query)
        )
      );
      setTeachers((prev) => tempTeachers);
    } else setTeachers(realTeachers);
  }, [query, teachers, realTeachers]);

  const onSearchHandler = (e) => setQuery(e.target.value);

  const handleRefresh = () => {
    setRefreshCounter((p) => p + 1);
  };

  return (
    <>
      <header>
        <div className="header__left">
          <h1>
            Teachers <span>Approval/Disapproval</span>
          </h1>
        </div>
        <div className="header__right">
          <div className="search__wrapper">
            <SearchIcon className="search_icon" />
            <input
              className="search__inp"
              type="text"
              placeholder="Search by Name, Mail, Phone..."
              value={query}
              onChange={onSearchHandler}
            />
          </div>
          <button className="reload__wrapper" onClick={handleRefresh}>
            <LordIcon icon="autoNew" />
          </button>
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="more__wrapper"
            >
              {/* <div className="more__wrapper"> */}
              <MoreIcon />
              {/* </div> */}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#/action-1">Approve All</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-2">Disapprove All</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-3">Reload</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <section>
        <TeachersTable teachersData={teachers} />
      </section>
    </>
  );
};

export default Teachers;
