import React, { useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";

import { ThemeContext } from "../contexts/ThemeContext";
import TeacherAssignments from "./assignments/TeacherAssignments";

import Button from "../components/UI/button/Button";
import { RadioInput, Select } from "../components/UI/input/Input";

import "../styles/Home.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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

  const user = useSelector(state => state.auth);

  const [assignments, setAssignments] = useState([]);

  console.log(assignments)

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
    // console.log(dateList);
    due_date = dateList.join(" ");
    return due_date;
    // setFormData((prev) => ({ ...prev, due_date }));
  };

  const handleMarks = (id,sid) => {
    let marks = prompt("Assign marks for "+id+","+sid);
    axios.post(
      `http://localhost:8000/api/assign-marks`,
      {
        marks: marks,
        assignmentId: id,
        studentId:sid
      },
      {
        headers: {
          'Authorization': `Bearer ${user.access}`,
          'Content-Type':'application/json'
        }
      }
    ).then(res => {
    console.log(assignments)
      const tempAss = [...assignments];
      console.log(tempAss)
      let ind = tempAss.findIndex(ass => ass['student_id'] === sid);
      let assign = tempAss[ind];
      assign.marks = marks;
      console.log(assign)
      tempAss[ind] = assign;
      setAssignments(p => tempAss);
    
    }).catch(err => {
      toast.warn('Assign marks failed');
    })
  };

  const getAssignments = () => {
    axios.get(
      `http://localhost:8000/api/class-assignments?year=${formData.batch}&branch=${formData.branch}&section=${formData.section}&subject=${formData.subject}`
      ,
      {
        headers: {
          'Authorization' : `Bearer ${user.access}`
        }
      }
    ).then(res => {
      console.log(res.data);
      setAssignments(p => res.data['students_data'])
    }).catch(err => {
      
    })
    // console.log(formData);
  }

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
                options={["1", "2", "3", "4"]}
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
                options={["Subj1", "Subj2"]}
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

          <Button text="Get Assignments" onClick={getAssignments} />
        </form>
      </div>
      {!assignments && <h1 className="text-white">No assignments to show.</h1>}
      {/* {assignments && assignments === [] && <h1 className="text-white">No assignments to show.</h1>} */}
      {assignments.length>0 && (
        <section className={`dashboard ${theme}`}>
          <div className={`assignments__wrapper ${theme}`}>
            {assignments?.map((assignment) => (
              <div
                key={assignment?.roll_no}
                className="assignment__wrapper"
                //   onClick={() => navigate(`assignment/${assignment.id}`)}
              >
                <div
                  className="assignment_subject_color_code"
                  style={{ background: assignment?.subject_color }}
                />
                <div
                  className="assignment_subject"
                  onClick={() =>
                    handleMarks(assignment.id, assignment["student_id"])
                  }
                >
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
