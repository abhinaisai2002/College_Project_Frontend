import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../assets/Search.svg";
import DatePickerComponent from "../../components/UI/datePicker/DatePickerComponent";
import { Select } from "../../components/UI/input/Input";
import { ThemeContext } from "../../contexts/ThemeContext";

import "../../styles/Assignments.scss";
import "../../styles/TeacherAssignments.scss";

const TeacherAssignments = ({ subjectColors, assignments }) => {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const [subjectAssignments, setSubjectAssignments] = useState(assignments);
  const [realSubjectAssignments, setRealSubjectAssignments] =
    useState(subjectAssignments);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query !== "") {
      const tempAssignments = realSubjectAssignments.filter((assignment) =>
        ["title", "subject_short_code"].some((key) =>
          assignment[key].toLowerCase().includes(query.toLowerCase())
        )
      );
      setSubjectAssignments((prev) => tempAssignments);
    } else setSubjectAssignments(realSubjectAssignments);
  }, [query]);

  const onSubjectClickHandler = (subject) => {
    const filteredAssignments = assignments?.filter(
      (assignment) => assignment.subject_short_code === subject
    );

    if (filteredAssignments) {
      setSubjectAssignments(filteredAssignments);
    }
  };

  const onSearchHandler = (e) => setQuery(e.target.value);

  return (
    <>
      {/* <div className={`assignments__header ${theme}`}>
        <div className="header__left">
          <div className="subject_code__wrapper">
            {Object.entries(subjectColors)?.map(([subject, color]) => (
              <div
                key={subject}
                className="subject"
                style={{ color }}
                onClick={() => onSubjectClickHandler(subject)}
              >
                <div
                  className="subject_color_code"
                  style={{
                    background: color,
                  }}
                />
                {subject}
              </div>
            ))}
          </div>
        </div>
        <div className="header__right">
          <button onClick={() => setSubjectAssignments(assignments)}>
            Show All
          </button>
          <div className={`search__wrapper ${theme}`}>
            <SearchIcon className="search_icon" />
            <input
              className="search__inp"
              type="text"
              placeholder="Search"
              value={query}
              onChange={onSearchHandler}
            />
          </div>
        </div>
      </div> */}

      <div className={`teacher_filter__form ${theme}`}>
        <form style={{ width: "20rem !important" }}>
          <Select
            label="Batch"
            name="batch"
            optionInitialValue=""
            options={["2019", "2020", "2021", "2022"]}
            required
          />
          <Select
            label="Branch"
            name="branch"
            // value=""
            optionInitialValue=""
            options={["CSE", "IT", "ECE", "EEE", "CIVIL", "MECH"]}
            required
            // disabled={}
          />
          <Select
            label="Subject"
            name="subject"
            optionInitialValue=""
            options={["ML", "UML", "IOT", "BDA", "CNS"]}
          />
          <div className="section__wrapper">
            <Form.Label>Section</Form.Label>
            {["A", "B", "C", "D"].map((section) => (
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label={section} />
              </Form.Group>
            ))}
          </div>
        </form>
      </div>

      {/* <div className={`assignments__wrapper ${theme}`}>
        {subjectAssignments?.map((assignment) => (
          <div
            key={assignment.id}
            className="assignment__wrapper"
            onClick={() => navigate(`assignment/${assignment.id}`)}
          >
            <div
              className="assignment_subject_color_code"
              style={{ background: assignment.color_code }}
            />
            <div className="assignment_subject">
              {assignment.subject_short_code}
            </div>
            <div className="assignment_body">
              <span>{assignment.title}</span>
              <span>{assignment.due_date}</span>
            </div>
          </div>
        ))}
        {!null && (
          <div className="assignment__wrapper is-loading">
            <div className="assignment_subject_color_code"></div>
            <div className="assignment_subject">
              <span></span>
            </div>
            <div className="assignment_body">
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};

export default TeacherAssignments;