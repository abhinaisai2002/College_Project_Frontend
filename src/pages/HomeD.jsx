import React from "react";
import { Tab, Nav } from "react-bootstrap";
import "../styles/HomeD.scss";

const SUBJECT_COLORS = {
  ML: "#FF7A00",
  UML: "#00B607",
  IOT: "#0085FF",
};

// const SUBJECT_COLORS = [
//   { ML: "#FF7A00" },
//   {
//     UML: "#00B607",
//   },
//   {
//     IOT: "#0085FF",
//   },
// ];

const DUMMY_ASSIGNMENTS = [
  {
    title: "Assignment - 1",
    subject: "ML",
    due_date: "08/08/2022",
    color_code: "#FF7A00",
  },
  {
    title: "Assignment - 1",
    subject: "UML",
    due_date: "09/01/2022",
    color_code: "#00B607",
  },
  {
    title: "Assignment - 1",
    subject: "IOT",
    due_date: "26/06/2023",
    color_code: "#0085FF",
  },
];

const HomeD = () => {
  return (
    <>
      <section className="dashboard">
        <Tab.Container id="tabs" defaultActiveKey="first">
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="first">
                <div className="pending" />
                Pending Assignments
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">
                <div className="submitted" />
                Submitted Assignments
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className="subject_code__wrapper">
                {Object.entries(SUBJECT_COLORS)?.map(([subject, color]) => (
                  <div className="subject" style={{ color }}>
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
              <div className="assignments__wrapper">
                {DUMMY_ASSIGNMENTS.map((assignment) => (
                  <div className="assignment__wrapper">
                    <div
                      className="assignment_subject_color_code"
                      style={{ background: assignment.color_code }}
                    />
                    <div className="assignment_subject">
                      {assignment.subject}
                    </div>
                    <div className="assignment_body">
                      <span>{assignment.title}</span>
                      <span>{assignment.due_date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">tab 2</Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </section>
    </>
  );
};

export default HomeD;
