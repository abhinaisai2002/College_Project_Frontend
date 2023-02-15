import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import pdf from "../../assets/resume.pdf";

import PdfViewerComponent from "../../components/PdfViewerComponent";

import Button from "../../components/UI/button/Button";
import LordIcon from "../../components/UI/lordIcons/LordIcon";
import ModalComponent from "../../components/UI/modal/ModalComponent";
import Upload from "../../components/Upload";
// import Spinner from "../../components/UI/spinners/Spinner";

import ".//Assignment.scss";

const DUMMY_ASSIGNMENTS = [
  {
    id: 1,
    title: "First Assignment",
    assignment_link:
      "https://firebasestorage.googleapis.com/v0/b/python-2c704.appspot.com/o/assignments%2Ftitle1665689041546555664?alt=media&token=970ffc3b-4ba4-4bcf-8444-5d9f328c345d",
    answer_link: "",
    datePosted: "",
    submissionDate: "26/06/2023",
    assigned_by: {},
    marks: "",
    reviewed: true,
    submitted: false,
    color_code: "#FF7A00",

    subject_short_code: "IOT",
    subject_full_code: "Internet Of Things",
  },
];


const useAssignment = (id) => {
  const [state, setState] = useState({
    assignment: null,
    isLoading: false,
    error: null,
  });

  const { assignment, isLoading, error } = state;

  useEffect(() => {
    const getAssignment = () => {
      setState((prev) => {
        return {
          ...prev,
          isLoading: true,
        };
      });

      // TODO: Call Backend API
      const filteredAssignment = DUMMY_ASSIGNMENTS.filter(
        (assignment) => assignment.id === parseInt(id)
      )[0];

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

  const [assignment] = useAssignment(id);

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
              <Button text="Close" />
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
      <section className="assignment__section">
        <Upload {...{ handleChange, fileTypes: ["PDF", "PPTX"] }} />
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
            //   leftIcon={<LordIcon icon="upload" />}
          />
          <Button
            text="Preview Assignment"
            onClick={() => setPreviewModalShow(true)}
          />
        </div>
      </section>
      <footer>
        <div className="footer_left"></div>
        <div className="footer_right">
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
