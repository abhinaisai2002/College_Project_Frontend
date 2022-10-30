import React from "react";
import { Tab, Nav } from "react-bootstrap";
import Assignments from "./assignments/Assignments";
import "../styles/Home.scss";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import TeacherAssignments from "./assignments/TeacherAssignments";
import { useReducer } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { assignmentActions } from "../redux/reducers/assignmentSlice";

const DUMMY_ASSIGNMENTS = [
  
  {
    "id": 6,
    "title": "title1",
    "assignment_link": "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
    "datePosted": "2022-10-15T00:35:14Z",
    "due_date": "2022-10-16T00:35:14Z",
    "assignedBy": {
        "teacherId": 1,
        "teacherName": "teacher1"
    },
    "marks": null,
    "reviewed": false,
    "submitted": false,
    "answerlink": null,
    "subject_full_code": "Subj1",
    "subject_short_code": "S1",
    "submission_date": null,
    "color_code": "#FF7A00",
  },
  {
    "id": 7,
    "title": "title2",
    "assignment_link": "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
    "datePosted": "2022-10-15T00:35:14Z",
    "due_date": "2022-10-14T00:35:14Z",
    "assignedBy": {
        "teacherId": 2,
        "teacherName": "teacher2"
    },
    "marks": null,
    "reviewed": false,
    "submitted": true,
    "answerlink":"https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
    "subject_full_code": "Subj2",
    "subject_short_code": "S2",
    "submission_date": '2022-10-18T04:25:08Z',
    "color_code": "#FF7A00",
  },{
    "id": 1,
    "title": "title",
    "assignment_link": "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
    "datePosted": "2022-10-15T00:35:14Z",
    "due_date": "2022-10-14T00:35:14Z",
    "assignedBy": {
        "teacherId": 1,
        "teacherName": "teacher1"
    },
    "marks": 9,
    "reviewed": true,
    "submitted": true,
    "answerlink": "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2FSubj14CSEC%2FCream%20and%20Green%20Creative%20Resume.pdf1666027691271191341?alt=media&token=f7a25d15-3701-4675-9c82-e811d41b39da",
    "subject_full_code": "Subj3",
    "subject_short_code": "S3",
    "submission_date": "2022-10-18T04:25:08Z",
    "color_code": "#FF7A00",
  },
];


const SUBJECT_COLORS = 
  DUMMY_ASSIGNMENTS.
  reduce( (curr,assignment)=>{
    curr[assignment['subject_short_code']] = assignment['color_code']
    return curr
  } , {} )

const Home = () => {
  const user_type = useSelector((state) => state.auth.user.user_type);
  console.log("HOME");
  if(user_type === 'admin'){
    return <Navigate to='/admin'/>
  }

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

const getSubjectColors = (assignments)=>{
  return assignments.
  reduce( (curr,assignment)=>{
    curr[assignment['subject_short_code']] = assignment['color_code']
    return curr
  } , {} )
}

const StudentDashboard = () => {
  const { theme } = useContext(ThemeContext);

  const assignments = useSelector(state => state.studentAssignments);

  const dispatch = useDispatch();
  useEffect( ()=>{
    // api call for all assignments and put them in the redux
    dispatch(assignmentActions.loadAllAssignments({
      'assignments':DUMMY_ASSIGNMENTS
    }));
  },[])

  if(!assignments)
    return <h1>Loading</h1>;

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
              subjectColors={getSubjectColors(assignments.pending)}
              assignments={assignments.pending}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <Assignments
                subjectColors={getSubjectColors(assignments.submitted)}
                assignments={assignments.submitted}
              />
          </Tab.Pane>
          <Tab.Pane eventKey="third">
            <Assignments
                subjectColors={getSubjectColors(assignments.reviewed)}
                assignments={assignments.reviewed}
              />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </section>
  );
};

export default Home;
