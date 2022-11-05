import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../assets/Search.svg";
import { ThemeContext } from "../../contexts/ThemeContext";

import "../../styles/Assignments.scss";
import "../../styles/TeacherAssignments.scss";

const TeacherAssignments = ({
  subjectColors,
  assignments,
  isHeaderRequired,
}) => {
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
      {isHeaderRequired && (
        <div className={`assignments__header ${theme}`}>
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
        </div>
      )}

      <div className={`assignments__wrapper ${theme}`}>
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
      </div>
    </>
  );
};

export default TeacherAssignments;
