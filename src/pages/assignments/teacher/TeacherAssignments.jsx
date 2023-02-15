import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/UI/button/Button";

import { RadioInput, Select } from "../../../components/UI/input/Input";
import { ThemeContext } from "../../../contexts/ThemeContext";

import "../Assignments.scss";
import "./TeacherAssignments.scss";

const TeacherAssignments = ({ subjectColors, assignments }) => {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const [subjectAssignments, setSubjectAssignments] = useState(assignments);
  const [realSubjectAssignments, setRealSubjectAssignments] =
    useState(subjectAssignments);
  const [query, setQuery] = useState("");

  const [teacherFormData, setTeacherFormData] = useState({
    year: "",
    branch: "",
    section: "",
    subject: "",
  });

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

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "year":
        value === "" &&
          setTeacherFormData((prev) => ({
            ...prev,
            branch: "",
            section: "",
            subject: "",
          }));
        break;
      case "branch":
        setTeacherFormData((prev) => ({
          ...prev,
          branch: value,
          section: "",
          subject: "",
        }));

        break;
      default:
        break;
    }

    setTeacherFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(teacherFormData);

  return (
    <>
      <section className={`dashboard ${theme}`}>
        <div className={`teacher_filter__form ${theme}`}>
          <form style={{ maxWidth: "20rem !important" }}>
            <div className="wrapper">
              <Select
                label="Batch"
                name="year"
                value={teacherFormData?.year}
                onChange={onHandleChange}
                optionInitialValue=""
                options={["2019", "2020", "2021", "2022"]}
                required
              />
              {teacherFormData?.year !== "" && (
                <Select
                  label="Branch"
                  name="branch"
                  value={teacherFormData?.branch}
                  onChange={onHandleChange}
                  optionInitialValue=""
                  options={["CSE", "IT", "ECE", "EEE", "CIVIL", "MECH"]}
                  required
                />
              )}

              {teacherFormData?.branch !== "" && (
                <>
                  <Select
                    label="Subject"
                    name="subject"
                    value={teacherFormData?.subject}
                    onChange={onHandleChange}
                    optionInitialValue=""
                    options={["ML", "UML", "IOT", "BDA", "CNS"]}
                  />
                  <RadioInput
                    label="Gender"
                    name="gender"
                    required
                    radioInputs={[
                      { value: "A", label: "A" },
                      { value: "B", label: "B" },
                      { value: "C", label: "C" },
                      { value: "D", label: "D" },
                    ]}
                    handleChange={(val) =>
                      setTeacherFormData((prev) => ({ ...prev, section: val }))
                    }
                    checkedValue={teacherFormData?.section}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </section>
      <footer>
        <div className="footer__left"></div>
        <div className="footer__right">
          <Button text="Get Assignments" />
        </div>
      </footer>
    </>
  );
};

export default TeacherAssignments;

{
  /* <div className={`assignments__wrapper ${theme}`}>
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
</div> */
}
