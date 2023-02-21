import React, { useState, useEffect, useContext } from "react";
import { Tab, Nav } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useGetStudentAssignmentsQuery } from "../../redux/reducers/studentSlice";
import Assignments from "../assignments/student/Assignments";

/*
const DUMMY_ASSIGNMENTS = [
  {
    id: 1,
    title: "Assignment 1 (Pending)",
    assignmentLink:
      "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
    datePosted: "2022-10-15T00:35:14Z",
    due_date: "2022-10-14T00:35:14Z",
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
    submissionDate: null,
    color_code: "#FF7A00",
  },
  {
    id: 2,
    title: "Assignment-2 (Submiited)",
    assignmentLink:
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
    submissionDate: "2022-10-18T04:25:08Z",
    color_code: "#FF7A00",
  },
  {
    id: 3,
    title: "Assignment-3 (Reviewed & Submitted)",
    assignmentLink:
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
    submissionDate: "2022-10-18T04:25:08Z",
    color_code: "#FF7A00",
    feedback: null,
  },
  {
    id: 4,
    title: "Assignment 4 (Pending)",
    assignmentLink:
      "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
    datePosted: "2022-10-15T00:35:14Z",
    due_date: "2022-10-14T00:35:14Z",
    assignedBy: {
      teacherId: 1,
      teacherName: "teacher1",
    },
    marks: null,
    reviewed: false,
    submitted: false,
    answerlink: null,
    subject_full_code: "Subj2",
    subject_short_code: "S2",
    submissionDate: null,
    color_code: "#FF7A99",
  },
];
*/

const TABS = [
  {
    eventKey: "pending",
    title: "Pending Assignments",
  },
  {
    eventKey: "submitted",
    title: "Submitted Assignments",
  },
  {
    eventKey: "reviewed",
    title: "Reviewed Assignments",
  },
];

// const studentAssignmentsResponse = { data: DUMMY_ASSIGNMENTS };

const StudentDashboard = () => {
  const { theme } = useContext(ThemeContext);

  const [assignments, setAssignments] = useState({
    pending: [],
    submitted: [],
    reviewed: [],
  });

  const { pending, submitted, reviewed } = assignments;

  const {
    data: studentAssignmentsResponse,
    isLoading,
    isError,
    error,
  } = useGetStudentAssignmentsQuery();

  useEffect(() => {
    if (studentAssignmentsResponse?.data) {
      const data = studentAssignmentsResponse?.data;

      let submitted = data?.filter(
        (assignment) => assignment?.submitted && !assignment?.reviewed
      );

      let reviewed = data?.filter(
        (assignment) => assignment?.reviewed && assignment?.submitted
      );

      let pending = data?.filter(
        (assignment) => !assignment?.submitted && !assignment?.reviewed
      );

      console.log({ submitted, pending, reviewed });

      setAssignments((prev) => ({ ...prev, submitted, reviewed, pending }));
    }
  }, [studentAssignmentsResponse]);

  return (
    <section className={`dashboard ${theme}`}>
      <Tab.Container id="tabs" defaultActiveKey="pending">
        <Nav variant="pills">
          {TABS?.map((tab) => (
            <Nav.Item>
              <Nav.Link eventKey={tab?.eventKey}>
                <div className={tab?.eventKey} />
                {tab?.title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="pending">
            <Assignments
              // subjectColors={SUBJECT_COLORS}
              isLoading={isLoading}
              assignments={pending}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="submitted">
            <Assignments
              // subjectColors={SUBJECT_COLORS}
              isLoading={isLoading}
              assignments={submitted}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="reviewed">
            <Assignments
              // subjectColors={SUBJECT_COLORS}
              isLoading={isLoading}
              assignments={reviewed}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </section>
  );
};

export default StudentDashboard;
