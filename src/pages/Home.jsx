import React from "react";
import { Tab, Nav } from "react-bootstrap";
import Assignments from "./assignments/Assignments";
import "../styles/Home.scss";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useSelector } from "react-redux";
import TeacherAssignments from "./assignments/TeacherAssignments";
import { useReducer } from "react";

const SUBJECT_COLORS = {
  ML: "#FF7A00",
  UML: "#00B607",
  IOT: "#0085FF",
};

const DUMMY_ASSIGNMENTS = [
  {
    id: 1,
    title: "ML Assignment - 1",
    subject_short_code: "ML",
    subject_full_code: "Machine Learning",
    due_date: "08/08/2022",
    color_code: "#FF7A00",
  },
  {
    id: 2,
    title: "UML Assignment Mid - 1",
    subject_short_code: "UML",
    subject_full_code: "Unified Modelling Language",
    due_date: "09/01/2022",
    color_code: "#00B607",
  },
  {
    id: 3,
    title: "IOT Assignment - 1",
    subject_short_code: "IOT",
    subject_full_code: "Internet Of Things",
    due_date: "26/06/2023",
    color_code: "#0085FF",
  },
  {
    id: 4,
    title: "IOT Assignment - 2",
    subject_short_code: "IOT",
    subject_full_code: "Internet Of Things",
    due_date: "26/06/2023",
    color_code: "#0085FF",
  },
];

const Home = () => {
  const user_type = useSelector((state) => state.auth.user.user_type);

  return (
    <>
      {user_type === "student" && <StudentDashboard />}
      {user_type === "teacher" && <TeacherDashboard />}
    </>
  );
};

const teacherReducer = (state, action) => {
  
}

const TeacherDashboard = () => {
  const { theme } = useContext(ThemeContext);
  // TODO: Here we have to write Reducer
  const [state, dispatch] = useReducer(teacherReducer, {

  });


  return (
    <section className={`dashboard ${theme}`}>
      <Tab.Container id="tabs" defaultActiveKey="first">
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link eventKey="first">
              <div className="pending" />
              Pending Assignments
            </Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link eventKey="second">
              <div className="submitted" />
              Submitted Assignments
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third">
              <div className="reviewed" />
              Reviewed Assignments
            </Nav.Link>
          </Nav.Item> */}
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <TeacherAssignments
              subjectColors={SUBJECT_COLORS}
              assignments={DUMMY_ASSIGNMENTS}
            />
          </Tab.Pane>
          {/* <Tab.Pane eventKey="second">tab 2</Tab.Pane> */}
          {/* <Tab.Pane eventKey="third">tab 3</Tab.Pane> */}
        </Tab.Content>
      </Tab.Container>
    </section>
  );
};

const StudentDashboard = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`dashboard ${theme}`}>
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
          <Nav.Item>
            <Nav.Link eventKey="third">
              <div className="reviewed" />
              Reviewed Assignments
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <Assignments
              subjectColors={SUBJECT_COLORS}
              assignments={DUMMY_ASSIGNMENTS}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="second">tab 2</Tab.Pane>
          <Tab.Pane eventKey="third">tab 3</Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </section>
  );
};

export default Home;
