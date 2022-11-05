import React, { useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";

import { ThemeContext } from "../contexts/ThemeContext";
import TeacherAssignments from "./assignments/TeacherAssignments";

import Button from "../components/UI/button/Button";
import { RadioInput, Select } from "../components/UI/input/Input";

import "../styles/Home.scss";

const DUMMY_ASSIGNMENTS = [
  {
    id: 6,
    title: "title1",
    assignment_link:
      "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
    datePosted: "2022-10-15T00:35:14Z",
    due_date: "2022-10-16T00:35:14Z",
    assignedBy: {
      teacherId: 1,
      teacherName: "teacher1",
    },
    marks: null,
    reviewed: false,
    submitted: false,
    answerlink: null,
    subject_full_code: "Subj1",
    subject_short_code: "S1",
    submission_date: null,
    color_code: "#FF7A00",
  },
  {
    id: 7,
    title: "title2",
    assignment_link:
      "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
    datePosted: "2022-10-15T00:35:14Z",
    due_date: "2022-10-14T00:35:14Z",
    assignedBy: {
      teacherId: 2,
      teacherName: "teacher2",
    },
    marks: null,
    reviewed: false,
    submitted: true,
    answerlink:
      "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
    subject_full_code: "Subj2",
    subject_short_code: "S2",
    submission_date: "2022-10-18T04:25:08Z",
    color_code: "#FF7A00",
  },
  {
    id: 1,
    title: "title",
    assignment_link:
      "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
    datePosted: "2022-10-15T00:35:14Z",
    due_date: "2022-10-14T00:35:14Z",
    assignedBy: {
      teacherId: 1,
      teacherName: "teacher1",
    },
    marks: 9,
    reviewed: true,
    submitted: true,
    answerlink:
      "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2FSubj14CSEC%2FCream%20and%20Green%20Creative%20Resume.pdf1666027691271191341?alt=media&token=f7a25d15-3701-4675-9c82-e811d41b39da",
    subject_full_code: "Subj3",
    subject_short_code: "S3",
    submission_date: "2022-10-18T04:25:08Z",
    color_code: "#FF7A00",
  },
];

const TeacherDashboard = () => {
  const { theme } = useContext(ThemeContext);

  const [assignments, setAssignments] = useState({
    success: "1",
    students_data: [
      {
        student_answer_link:
          "https://firebasestorage.googleapis.com/v0/b/clg-proj-5d15e.appspot.com/o/assignments%2FSubj14CSEC%2FAbhinai%27s%20Resume.pdf1667655089003580049?alt=media&token=a12360c3-e608-4f81-a37d-954b404e98f7",
        due_date: "2022-11-07T23:11:26Z",
        submission_date: "2022-11-06T00:31:28Z",
        marks: null,
        roll_no: "19bq1a05i7",
        subject: "Subj1",
        subject_code: "S1",
        subject_color: "#FF5733",
      },
      {
        student_answer_link: null,
        due_date: "2022-11-07T23:11:26Z",
        submission_date: null,
        marks: null,
        roll_no: "19bq1a05f1",
        subject: "Subj1",
        subject_code: "S1",
        subject_color: "#FF5733",
      },
      {
        student_answer_link: null,
        due_date: "2022-11-07T23:11:26Z",
        submission_date: null,
        marks: null,
        roll_no: "19bq1a05d2",
        subject: "Subj1",
        subject_code: "S1",
        subject_color: "#FF5733",
      },
      {
        student_answer_link: null,
        due_date: "2022-11-07T23:11:26Z",
        submission_date: null,
        marks: null,
        roll_no: "19bq1a05d6",
        subject: "Subj1",
        subject_code: "S1",
        subject_color: "#FF5733",
      },
      {
        student_answer_link: null,
        due_date: "2022-11-07T23:11:26Z",
        submission_date: null,
        marks: null,
        roll_no: "19bq1a05d9",
        subject: "Subj1",
        subject_code: "S1",
        subject_color: "#FF5733",
      },
    ],
  });

  const [formData, setFormData] = useState({
    branch: "",
    batch: "",
    subject: "",
    section: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDate = (date) => {
    if (date === null) return "NA";
    let due_date = new Date(date);

    let dateList = due_date.toString().split(" ");
    dateList = dateList.slice(0, 4);
    console.log(dateList);
    due_date = dateList.join(" ");
    return due_date;
    // setFormData((prev) => ({ ...prev, due_date }));
  };

  const handleMarks = () => {
    let marks = prompt("Assign marks");
    console.log(marks);
  };

  return (
    <>
      <div className={`teacher_filter__form ${theme}`}>
        <form style={{ width: "20rem !important" }}>
          <Row>
            <Col>
              <Select
                label="Batch"
                name="batch"
                value={formData?.batch}
                optionInitialValue=""
                options={["2019", "2020", "2021", "2022"]}
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
              <Select
                label="Branch"
                name="branch"
                value={formData?.branch}
                optionInitialValue=""
                options={["CSE", "IT", "ECE", "EEE", "CIVIL", "MECH"]}
                required
                onChange={handleChange}
                // disabled={}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Select
                label="Subject"
                name="subject"
                value={formData?.subject}
                optionInitialValue=""
                options={["ML", "UML", "IOT", "BDA", "CNS"]}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <RadioInput
                label="Section"
                name="section"
                required
                radioInputs={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "D", label: "D" },
                ]}
                handleChange={(val) =>
                  setFormData((prev) => ({ ...prev, section: val }))
                }
                checkedValue={formData?.section}
              />
            </Col>
          </Row>

          <Button text="Get Assignments" onClick={() => {}} />
        </form>
      </div>
      {assignments && (
        <section className={`dashboard ${theme}`}>
          <div className={`assignments__wrapper ${theme}`}>
            {assignments?.students_data?.map((assignment) => (
              <div
                key={assignment?.roll_no}
                className="assignment__wrapper"
                //   onClick={() => navigate(`assignment/${assignment.id}`)}
              >
                <div
                  className="assignment_subject_color_code"
                  style={{ background: assignment?.subject_color }}
                />
                <div className="assignment_subject" onClick={handleMarks}>
                  {assignment?.marks ? assignment.marks : "-"}/10
                </div>
                <div className="assignment_body">
                  {/* <span onClick={() => {}}>{assignment?.roll_no}</span> */}
                  <span>
                    <a
                      href={assignment?.student_answer_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {assignment?.roll_no?.toUpperCase()}
                    </a>
                  </span>
                  <span>
                    <b>Submission Date:</b>{" "}
                    {handleDate(assignment?.submission_date)} <b>Due Date:</b>{" "}
                    {handleDate(assignment?.due_date)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
    </>
  );
};

export default TeacherDashboard;
