import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../../assets/Search.svg";
import DatePickerComponent from "../../../components/UI/datePicker/DatePickerComponent";
import { ThemeContext } from "../../../contexts/ThemeContext";

import "./Assignments.scss";

const Assignments = ({ assignments }) => {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const [subjectAssignments, setSubjectAssignments] = useState(assignments);
  const [subjectColors, setSubjectColors] = useState({});
  const [realSubjectAssignments, setRealSubjectAssignments] =
    useState(subjectAssignments);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setSubjectAssignments(assignments);

    setSubjectColors(
      assignments.reduce((curr, assignment) => {
        curr[assignment["subject_short_code"]] = assignment["color_code"];
        return curr;
      }, {})
    );
  }, [assignments]);

  useEffect(() => {
    if (query !== "") {
      const tempAssignments = assignments.filter((assignment) =>
        ["title", "subject_short_code"].some((key) =>
          assignment[key].toLowerCase().includes(query.toLowerCase())
        )
      );
      setSubjectAssignments((prev) => tempAssignments);
    } else setSubjectAssignments(assignments);
  }, [assignments, query]);

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
      <div className={`assignments__header ${theme}`}>
        <div className="header__left">
          <div className="subject_code__wrapper">
            {Object.entries(subjectColors)?.map(([subject, color]) => (
              <div
                key={subject}
                className="subject"
                style={{ color : `${theme === 'dark' ? 'white' : 'black'}` }}
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
      </div>

      <div className={`assignments__wrapper ${theme}`}>
        {subjectAssignments?.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
        {/* {!null && (
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
        )} */}
      </div>
    </>
  );
};

export default Assignments;

const AssignmentCard = ({ assignment }) => {
  const navigate = useNavigate();
  if (assignment.reviewed)
    return (
      <div
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
          <span>Marks : {assignment.marks}/10</span>
        </div>
      </div>
    );
  else if (assignment.submitted) {
    return (
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
          <span>Submitted on {getDate(assignment.submissionDate)}</span>
        </div>
      </div>
    );
  } else {
    return (
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
          <span>Due Date{getDate(assignment.due_date)}</span>
        </div>
      </div>
    );
  }
};

function getDate(dateS) {
  const date = new Date(dateS);
  const months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let d = `
  ${date.getFullYear()}/${
    months[date.getMonth()]
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()} ${
    date.getHours() >= 12 ? "pm" : "am"
  }
    `;
  return d;
}
