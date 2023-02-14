import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import pdf from "../../assets/resume.pdf";

import PdfViewerComponent from "../../components/PdfViewerComponent";

import Button from "../../components/UI/button/Button";
import LordIcon from "../../components/UI/lordIcons/LordIcon";
import ModalComponent from "../../components/UI/modal/ModalComponent";
import Upload from "../../components/Upload";
import { submitAssigment } from "../../redux/actions/assignmentAction";
// import Spinner from "../../components/UI/spinners/Spinner";

import "../../styles/Assignment.scss";

// const DUMMY_ASSIGNMENTS = [
  
//   {
//     "id": 6,
//     "title": "title1",
//     "assignment_link": "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
//     "datePosted": "2022-10-15T00:35:14Z",
//     "due_date": "2022-10-16T00:35:14Z",
//     "assignedBy": {
//         "teacherId": 1,
//         "teacherName": "teacher1"
//     },
//     "marks": null,
//     "reviewed": false,
//     "submitted": false,
//     "answerlink": null,
//     "subject_full_code": "Subj1",
//     "subject_short_code": "S1",
//     "submission_date": null,
//     "color_code": "#FF7A00",
//   },
//   {
//     "id": 7,
//     "title": "title2",
//     "assignment_link": "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
//     "datePosted": "2022-10-15T00:35:14Z",
//     "due_date": "2022-10-14T00:35:14Z",
//     "assignedBy": {
//         "teacherId": 2,
//         "teacherName": "teacher2"
//     },
//     "marks": null,
//     "reviewed": false,
//     "submitted": true,
//     "answerlink":"https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
//     "subject_full_code": "Subj2",
//     "subject_short_code": "S2",
//     "submission_date": '2022-10-18T04:25:08Z',
//     "color_code": "#FF7A00",
//   },{
//     "id": 1,
//     "title": "title",
//     "assignment_link": "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
//     "datePosted": "2022-10-15T00:35:14Z",
//     "due_date": "2022-10-14T00:35:14Z",
//     "assignedBy": {
//         "teacherId": 1,
//         "teacherName": "teacher1"
//     },
//     "marks": 9,
//     "reviewed": true,
//     "submitted": true,
//     "answerlink": "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2FSubj14CSEC%2FCream%20and%20Green%20Creative%20Resume.pdf1666027691271191341?alt=media&token=f7a25d15-3701-4675-9c82-e811d41b39da",
//     "subject_full_code": "Subj3",
//     "subject_short_code": "S3",
//     "submission_date": "2022-10-18T04:25:08Z",
//     "color_code": "#FF7A00",
//   },
// ];


const useAssignment = (id) => {
  const [state, setState] = useState({
    assignment: null,
    isLoading: false,
    error: null,
  });

  const posts = useSelector(state => state.studentAssignments);

  const { assignment, isLoading, error } = state;

  useEffect(() => {
    const getAssignment = async () => {
      setState((prev) => {
        return {
          ...prev,
          isLoading: true,
        };
      });

      let DUMMY_ASSIGNMENTS = [...posts.pending,...posts.submitted,...posts.reviewed];
      console.log(DUMMY_ASSIGNMENTS);
      const filteredAssignment = DUMMY_ASSIGNMENTS.filter(
        (assignment) => assignment.id === parseInt(id)
      )[0];
      console.log(filteredAssignment);

      if (filteredAssignment) {
        setState((prev) => {
          return {
            ...prev,
            assignment: filteredAssignment,
            isLoading: false,
          };
        });
      } else {
        setState((prev) => {
          return {
            ...prev,
            assignment: null,
            error: "Something went wrong",
            isLoading: false,
          };
        });
      }
    };
    getAssignment();
  }, [id]);

  return [assignment, error, isLoading]; // [assignmentObject, error, isLoading]
};

const Assignment = () => {
  const { id } = useParams();

  const navigate = useNavigate()

  const [assignment] = useAssignment(id);

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth);

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [previewModalShow, setPreviewModalShow] = useState(false);

  useEffect(() => {
    console.log(file);
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const handleChange = (file) => setFile(file);

  const handleUpload = ()=>{

    if(!file)return alert("Please upload a file!!!");

    const formData = new FormData();

    let date = Date();
    let dateList = date.split(' ');
    dateList = dateList.slice(0,6);
    let date_submitted = dateList.join(' ');

    formData.append('file',file);
    formData.append('assignmentId',assignment.id);
    formData.append('date_submitted',date_submitted);
    console.log(user.access);
    dispatch(submitAssigment(formData, user.access)).then(() => navigate('/'))
    

  }

  return (
    <>
      <ModalComponent
        show={previewModalShow}
        title="Upload Assignment"
        handleClose={() => setPreviewModalShow(false)}
        body={
          <>{fileDataURL && <PdfViewerComponent document={fileDataURL} />}</>
        }
        footer={
          <>
            <div className="footer__left" />
            <div className="footer__right">
              <Button onClick={() => setPreviewModalShow(false)} text="Close" />
            </div>
          </>
        }
      />
      <header className="assignment__header">
        <div className="header__left">
          <h1>
            {assignment && assignment.title}
            <span
              style={{
                background: assignment ? assignment.color_code : "",
                color: "#fff",
              }}
            >
              {assignment &&
                assignment.subject_short_code +
                  " - " +
                  assignment.subject_full_code}
            </span>
          </h1>
        </div>
      </header>
      {assignment && !assignment.submitted && <section className="assignment__section">
        <Upload {...{ handleChange, fileTypes: ["PDF"] }} />
        <p
          className="file__name"
          style={{ margin: "1rem 0", textAlign: "center" }}
        >
          File name: <span>{file ? file.name : "No Files Uploaded Yet"}</span>
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            margin: "2rem 0",
          }}
        >
          <Button
            onClick={handleUpload}
            text="Upload Assignment"
            //   leftIcon={<LordIcon icon="upload" />}
          />
          <Button
            text="Preview Assignment"
            onClick={() => {
              if(!file)return alert("Please upload a file")
              setPreviewModalShow(true)}
            }
          />
        </div>
      </section>}
      {assignment && assignment.submitted &&  !assignment.reviewed && 
        <h1 style={{color:'white'}}>
          You already submmited this assignment,the marks are in pending.
        </h1> }
      {assignment && assignment.reviewed && 
      <h1 style={{color:'white'}}>
        You already submmited this assignment,you are awarded {assignment.marks}/10.
      </h1> }
      <footer>
        <div className="footer_left">

        </div>
        <div className="footer_right">
          {assignment?.answerlink && <a
            href={assignment?.answerlink}
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            Preview Submitted Assignment
          </a>}
          <a
            href={assignment?.assignment_link}
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            Preview Question Paper
          </a>
        </div>
      </footer>
    </>
  );
};

export default Assignment;
