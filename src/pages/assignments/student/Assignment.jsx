import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import pdf from "../../../assets/resume.pdf";

import PdfViewerComponent from "../../../components/PdfViewerComponent";

import Button from "../../../components/UI/button/Button";
import LordIcon from "../../../components/UI/lordIcons/LordIcon";
import ModalComponent from "../../../components/UI/modal/ModalComponent";
import Upload from "../../../components/Upload";
import {
  useGetStudentAssignmentQuery,
  useUploadAssignmentMutation,
} from "../../../redux/reducers/studentSlice";

import "./Assignment.scss";

// const DUMMY_ASSIGNMENTS = [
//   {
//     id: 1,
//     title: "Assignment 1 (Pending)",
//     assignmentLink:
//       "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
//     datePosted: "2022-10-15T00:35:14Z",
//     due_date: "2022-10-14T00:35:14Z",
//     assignedBy: {
//       teacherId: 1,
//       teacherName: "teacher1",
//     },
//     marks: null,
//     reviewed: false,
//     submitted: false,
//     answerlink: null,
//     subject_full_code: "Subj1",
//     subject_short_code: "S1",
//     submissionDate: null,
//     color_code: "#FF7A00",
//   },
//   {
//     id: 2,
//     title: "Assignment-2 (Submitted)",
//     assignmentLink:
//       "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
//     datePosted: "2022-10-15T00:35:14Z",
//     due_date: "2022-10-14T00:35:14Z",
//     assignedBy: {
//       teacherId: 2,
//       teacherName: "teacher2",
//     },
//     marks: null,
//     reviewed: false,
//     submitted: true,
//     answerlink:
//       "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
//     subject_full_code: "Subj2",
//     subject_short_code: "S2",
//     submissionDate: "2022-10-18T04:25:08Z",
//     color_code: "#FF7A00",
//   },
//   {
//     id: 3,
//     title: "Assignment-3 (Reviewed & Submitted)",
//     assignmentLink:
//       "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1666024104928602307?alt=media&token=788986f0-df3e-440e-8712-03867a8c9ac1",
//     datePosted: "2022-10-15T00:35:14Z",
//     due_date: "2022-10-14T00:35:14Z",
//     assignedBy: {
//       teacherId: 1,
//       teacherName: "teacher1",
//     },
//     marks: 9,
//     reviewed: true,
//     submitted: true,
//     answerlink:
//       "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2FSubj14CSEC%2FCream%20and%20Green%20Creative%20Resume.pdf1666027691271191341?alt=media&token=f7a25d15-3701-4675-9c82-e811d41b39da",
//     subject_full_code: "Subj3",
//     subject_short_code: "S3",
//     submissionDate: "2022-10-18T04:25:08Z",
//     color_code: "#FF7A00",
//     feedback: null,
//   },
// ];

const Assignment = () => {
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [previewModalShow, setPreviewModalShow] = useState(false);

  // const assignmentResponse = {
  //   data: DUMMY_ASSIGNMENTS?.filter((item) => item?.id === parseInt(id))[0],
  // };

  const {
    data: assignmentResponse,
    isLoading,
    isError,
    error,
  } = useGetStudentAssignmentQuery(id, { refetchOnMountOrArgChange: true });

  const [uploadAssignment, { isLoading: isAssignmentUploading }] =
    useUploadAssignmentMutation();

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

  const onUploadAssignment = () => {
    const fd = new FormData();

    let date = Date();
    date = date.split(" ").slice(0, 6).join(" ");

    fd.append("file", file);
    fd.append("assignmentId", parseInt(id));
    fd.append("date_submitted", date);

    uploadAssignment(fd).then(res => {

    })
  };

  console.log(assignmentResponse?.data);

  return (
    <>
      {/* Preview Offline Uploaded Assignment */}
      <ModalComponent
        show={previewModalShow}
        title="Preview Assignment"
        handleClose={() => setPreviewModalShow(false)}
        body={
          <>{fileDataURL && <PdfViewerComponent document={fileDataURL} />}</>
        }
        footer={
          <>
            <div className="footer__left" />
            <div className="footer__right">
              <Button text="Close" onClick={() => setPreviewModalShow(false)} />
            </div>
          </>
        }
      />

      <header className="assignment__header">
        <div className="header__left">
          <h1>
            {assignmentResponse?.data && assignmentResponse?.data?.title}
            <span
              style={{
                background: assignmentResponse?.data
                  ? assignmentResponse?.data?.color_code
                  : "",
                color: "#fff",
              }}
            >
              {assignmentResponse?.data &&
                assignmentResponse?.data?.subject_short_code +
                  " - " +
                  assignmentResponse?.data?.subject_full_code}
            </span>
          </h1>
        </div>
      </header>

      <section className="assignment__section">
        {!assignmentResponse?.data?.submitted &&
          !assignmentResponse?.data?.reviewed && (
            <PendingAssignment
              {...{
                handleChange,
                file,
                onUploadAssignment,
                setPreviewModalShow,
              }}
            />
          )}
        {assignmentResponse?.data?.submitted &&
          !assignmentResponse?.data?.reviewed && <SubmittedAssignment />}

        {assignmentResponse?.data?.submitted &&
          assignmentResponse?.data?.reviewed && (
            <ReviewedAssignment
              marks={assignmentResponse?.data?.marks}
              feedback={assignmentResponse?.data?.feedback}
            />
          )}
      </section>
      <footer>
        <div className="footer_left"></div>
        <div className="footer_right">
          <a
            href={assignmentResponse?.data?.assignment_link}
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            Preview Question Paper
          </a>
          {assignmentResponse?.data?.submitted && (
            <a
              href={assignmentResponse?.data?.answerlink}
              className="btn"
              rel="noreferrer"
              target="_blank"
            >
              Preview Assignment
            </a>
          )}
        </div>
      </footer>
    </>
  );
};

export default Assignment;

const PendingAssignment = ({
  handleChange,
  file,
  onUploadAssignment,
  setPreviewModalShow,
}) => {
  return (
    <>
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
          text="Upload Assignment"
          disabled={!file}
          onClick={onUploadAssignment}

          //   leftIcon={<LordIcon icon="upload" />}
        />
        <Button
          text="Preview Assignment"
          onClick={() => setPreviewModalShow(true)}
          disabled={!file}
        />
      </div>
    </>
  );
};

const SubmittedAssignment = () => {
  return (
    <h1 className="text-white text-center m-5">
      You have submitted the assignment and will receive the update as soon as
      the teacher reviews your assignment
    </h1>
  );
};

const ReviewedAssignment = ({ marks, feedback }) => {

  return (
    <div className="text-white text-center">
      <h1>Congratulations</h1>
      <h4 className="m-2">You have scored {marks}/10</h4>

      {feedback ? (
        <p>{feedback}</p>
      ) : (
        <p>Your teacher haven't posted any feedback for you</p>
      )}
    </div>
  );
};
