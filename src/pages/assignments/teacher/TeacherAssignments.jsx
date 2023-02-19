import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/UI/button/Button";
import { Input } from "../../../components/UI/input/Input";
import ModalComponent from "../../../components/UI/modal/ModalComponent";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useGetClassAssignmentsBasedOnTitleQuery } from "../../../redux/reducers/teacherSlice";

const DUMMY_ASSIGNMENTS = [
  {
    title: "title3",
    id: 1,
    student_roll_no: "19bq1a05i7",
    subject: "Subj1",
    student_name: "abhinai",
    due_date: "2022-11-07T23:11:26Z",
    creation_date: "2022-11-05T23:11:26Z",
    submission_date: "2022-11-06T14:46:55Z",
    submitted: true,
    marks: 9,
    feedback: null,
    answer_link:
      "https://firebasestorage.googleapis.com/v0/b/clg-proj-5d15e.appspot.com/o/assignments%2FSubj14CSEC%2FAbhinai%27s%20Resume.pdf1667706415842596796?alt=media&token=2f462244-fa4e-4149-b370-d5cd706d2669",
    assignment_link:
      "https://firebasestorage.googleapis.com/v0/b/clg-proj-5d15e.appspot.com/o/assignments%2Ftitle31667706274364792013?alt=media&token=2",
    assigned_by: "teacher1",
    color: "#36454F",
    gender: null,
  },
  {
    title: "title3",
    id: 2,
    student_roll_no: "19bq1a05f1",
    subject: "Subj1",
    student_name: "abhinai",
    due_date: "2022-11-07T23:11:26Z",
    creation_date: "2022-11-05T23:11:26Z",
    submission_date: "2022-11-06T14:46:55Z",
    submitted: true,
    marks: 9,
    feedback: null,
    answer_link:
      "https://firebasestorage.googleapis.com/v0/b/clg-proj-5d15e.appspot.com/o/assignments%2FSubj14CSEC%2FAbhinai%27s%20Resume.pdf1667706415842596796?alt=media&token=2f462244-fa4e-4149-b370-d5cd706d2669",
    assignment_link:
      "https://firebasestorage.googleapis.com/v0/b/clg-proj-5d15e.appspot.com/o/assignments%2Ftitle31667706274364792013?alt=media&token=2",
    assigned_by: "teacher1",
    color: "#36454F",
    gender: null,
  },
];

const assignmentsResponse = {data: DUMMY_ASSIGNMENTS}

const TeacherAssignments = () => {
  const { theme } = useContext(ThemeContext);

  const {
    year,
    branch,
    semester,
    section,
    subject,
    assignment_title,
    assignment_id,
  } = useParams();

  const [data, setData] = useState([]);

  const [showFeedbackModal, setShowFeedbackModal] = useState({
    show: false,
  });

  const {
    // data: assignmentsResponse,
    isLoading,
    error,
  } = useGetClassAssignmentsBasedOnTitleQuery({
    year,
    branch,
    semester,
    section,
    subject,
    assignment_title,
    assignment_id,
  });

  useEffect(() => {
    if (assignmentsResponse?.data)
      setData(
        assignmentsResponse?.data?.sort((item1, item2) =>
          item1?.student_roll_no.localeCompare(item2?.student_roll_no)
        )
      );
  }, [
    // assignmentsResponse
  ]);

  console.log(data)

  return (
    <>
      <ModalComponent
        size="md"
        show={showFeedbackModal?.show}
        handleClose={() => setShowFeedbackModal({ show: false })}
        title={showFeedbackModal?.student_roll_no}
        body={
          <>
            <Input name="marks" label="Marks" type="number" min={0} max={10} />
            <Input
              as="textarea"
              name="remarks"
              label="Remarks"
              placeholder="Enter your remarks here..."
            />
          </>
        }
        footer={
          <>
            <a
              href={showFeedbackModal?.assignment_link}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              Question Paper
            </a>
            <a
              href={showFeedbackModal?.answer_link}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              Answer
            </a>
            {/* <Button text="Question Paper" /> */}
            {/* <Button text="Answer" /> */}
            <Button text="Submit" />
            {/* <div className="footer_left"></div> */}
            {/* <div className="footer_right"> */}
            {/* </div> */}
          </>
        }
      />
      <header>
        <div className="header__left">
          <h1>Title</h1>
        </div>
      </header>
      <section className={`teacher-assignments ${theme}`}>
        <div className={`assignments__wrapper ${theme}`}>
          {data?.map((item) => (
            <div
              className="assignment__wrapper"
              onClick={() =>
                setShowFeedbackModal({
                  show: true,
                  ...item,
                })
              }
            >
              <div
                className="assignment_subject_color_code"
                style={{ background: item.subject_color }}
              />
              <div className="assignment_subject">{item?.subject}</div>
              <div className="assignment_body">
                <span>{item?.student_roll_no}</span>
                <span>
                  {item?.submission_date
                    ? getDate(item?.submission_date)
                    : "Not Submitted"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default TeacherAssignments;

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

  let new_date = ``;

  return d;
}
