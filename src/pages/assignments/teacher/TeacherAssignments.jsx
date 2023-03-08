import axios from "axios";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/UI/button/Button";
import { Input } from "../../../components/UI/input/Input";
import ModalComponent from "../../../components/UI/modal/ModalComponent";
import { ThemeContext } from "../../../contexts/ThemeContext";
import {
  useAssignMarksMutation,
  useGetClassAssignmentsBasedOnTitleQuery,
} from "../../../redux/reducers/teacherSlice";
import { dates } from "./CreateAssignment";

/*
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
*/

// const assignmentsResponse = {data: DUMMY_ASSIGNMENTS}

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

  const [filter,setFilter] = useState('');

  const [showFeedbackModal, setShowFeedbackModal] = useState({
    show: false,
  });

    const [showExtendDataModal, setShowExtendModal] = useState({
      show: false,
    });
  
  const [extendDate,setExtendDate] = useState('');

  const {
    data: assignmentsResponse,
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

  const [assignMarks] = useAssignMarksMutation();

  /*
  ?
  .sort((item1, item2) =>
  item1
  ?.student_roll_no.localeCompare(item2?.student_roll_no)*/
  useEffect(() => {
    if (assignmentsResponse?.data) setData(assignmentsResponse?.data);
  }, [assignmentsResponse]);

  const submitButtonRef = useRef();
  const marksRef = useRef();
  const feedbackRef = useRef();

  const submitHandler = function (event) {
    event.preventDefault();

    assignMarks({
      marks: marksRef.current.value,
      feedback: feedbackRef.current.value,
      assignmentId: showFeedbackModal.id,
      studentId: showFeedbackModal["student_id"],
    }).then(res => {
      setShowFeedbackModal(false);
    }).catch(err => {
      
    })
  };

  const downloadReport = function () {
    axios.get("http://localhost:8000/api/get-class-assignments-title-report", {
      params: {
        year: 2019,
        edu_year:4,
        branch,
        semester,
        section,
        subject,
        assignment_title,
        assignment_id,
      },
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${localStorage.getItem('access')}`
      },
      responseType:'blob'
    }).then(response => {
      const href = URL.createObjectURL(response.data);
      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download",
        year+'-'+branch+'-'+section+'-'+subject+'-'+assignment_title +".xls"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    })
  }

  const handleExtendDueDate = async function (event) {
    event.preventDefault();

    let tdueDate = new Date(
      extendDate
    );
    let extDate = tdueDate.toString().split(" ").slice(0, 6).join(" ");
    axios
      .post(
        "http://localhost:8000/api/extend-due-date",
        {
          assignmentId: assignment_id,
          new_date: extDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  }
  console.log(data,filter);

  const handleFilter = (val) => {
    setFilter(val)
  }

  return (
    <>
      <ModalComponent
        size="md"
        show={showFeedbackModal?.show}
        handleClose={() => setShowFeedbackModal({ show: false })}
        title={showFeedbackModal?.student_roll_no}
        body={
          <form onSubmit={submitHandler}>
            <Input
              name="marks"
              label="Marks"
              type="number"
              min={0}
              max={10}
              required
              ref={marksRef}
            />
            <Input
              as="textarea"
              name="remarks"
              label="Remarks"
              placeholder="Enter your remarks here..."
              ref={feedbackRef}
              required
            />
            <button
              type="submit"
              style={{ display: "none" }}
              ref={submitButtonRef}
            ></button>
          </form>
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
            <Button
              text="Submit"
              onClick={() => {
                submitButtonRef.current.click();
              }}
            />
            {/* <div className="footer_left"></div> */}
            {/* <div className="footer_right"> */}
            {/* </div> */}
          </>
        }
      />
      <ModalComponent
        size="md"
        show={showExtendDataModal?.show}
        handleClose={() => setShowExtendModal({ show: false })}
        title={"Extend Due Date"}
        body={
          <form onSubmit={handleExtendDueDate}>
            <Input
              type="date"
              name="due_date"
              label="Extend Date"
              min={(() => {
                let d = new Date();
                let min_date =
                  d.getFullYear() +
                  "-" +
                  dates[d.getMonth()] +
                  "-" +
                  (d.getUTCDate() < 10 ? '0'+d.getUTCDate() : d.getUTCDate());
                // console.log(min_date);
                return min_date
              })()}
              value={extendDate}
              onChange={(event) => setExtendDate(event.target.value)}
              required
            />
            <button
              type="submit"
              style={{ display: "none" }}
              ref={submitButtonRef}
            ></button>
          </form>
        }
        footer={
          <>
            <Button
              text="Submit"
              onClick={() => {
                submitButtonRef.current.click();
              }}
            />
          </>
        }
      />
      <header>
        <div className="header__left">
          <h1>{assignment_title}</h1>
          <span style={{ color: `${theme === "dark" ? "white" : "black"}` }}>
            {subject}{" "}
          </span>
          <span style={{ color: `${theme === "dark" ? "white" : "black"}` }}>
            {data?.length > 0 && <>Due Date : {getDate(data[0]["due_date"])}</>}
          </span>
        </div>
        <div className="header__right">
          <Button
            style={{margin:'0px 10px'}}
            text="Extend DueDate"
            onClick={() => setShowExtendModal({ show: true })}
          />
          <Button text="Download Report" onClick={downloadReport} />
        </div>
      </header>
      <section className={`teacher-assignments ${theme}`}>
        <div className={`teacher-assignments__filters ${theme}`}>
          <button
            onClick={() => handleFilter("pending")}
            className={`${filter === "pending" ? "active" : ""}`}
          >
            Pending
          </button>
          <button
            onClick={() => handleFilter("submitted")}
            className={`${filter === "submitted" ? "active" : ""}`}
          >
            Submitted
          </button>
          <button
            onClick={() => handleFilter("reviewed")}
            className={`${filter === "reviewed" ? "active" : ""}`}
          >
            Reviewed
          </button>
          <button
            onClick={() => handleFilter("")}
            className={`${filter === "" ? "active" : ""}`}
          >
            All
          </button>
        </div>
        <div className={`assignments__wrapper ${theme}`}>
          {data
            ?.filter((item) => {
              if (filter === "") return true;
              else return item.status === filter;
            })
            .map((item) => (
              <div
                className="assignment__wrapper"
                onClick={() => {
                  // if (!item?.submitted) {
                  //   return;
                  // }

                  if (item?.marks) {
                    return alert("You already awarded this student");
                  }

                  setShowFeedbackModal({
                    show: true,
                    ...item,
                  });
                }}
              >
                <div
                  className="assignment_subject_color_code"
                  style={{ background: item.color }}
                />
                <div className="assignment_subject">
                  {" "}
                  {item?.marks ? item.marks : "-"} / 10
                </div>
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
  }/${date.getDate()} `;

  console.log(d);

  return d;
}
