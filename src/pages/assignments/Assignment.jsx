import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import pdf from "../../assets/resume.pdf";

import PdfViewerComponent from "../../components/PdfViewerComponent";

import Button from "../../components/UI/button/Button";
import LordIcon from "../../components/UI/lordIcons/LordIcon";
import ModalComponent from "../../components/UI/modal/ModalComponent";
import Upload from "../../components/Upload";
import Spinner from "../../components/UI/spinners/Spinner";

import "../../styles/Assignment.scss";

const DUMMY_ASSIGNMENTS = [
  {
    id: 1,
    title: "Assignment - 1",
    subject_short_code: "ML",
    subject_full_code: "Machine Learning",
    due_date: "08/08/2022",
    color_code: "#FF7A00",
  },
  {
    id: 2,
    title: "Assignment - 1",
    subject_short_code: "UML",
    subject_full_code: "Unified Modelling Language",
    due_date: "09/01/2022",
    color_code: "#00B607",
  },
  {
    id: 3,
    title: "Assignment - 1",
    subject_short_code: "IOT",
    subject_full_code: "Internet Of Things",
    due_date: "26/06/2023",
    color_code: "#0085FF",
  },
  {
    id: 4,
    title: "IOT Assignment - 1",
    subject_short_code: "IOT",
    subject_full_code: "Internet Of Things",
    due_date: "26/06/2023",
    color_code: "#0085FF",
  },
  {
    id: 5,
    title: "WIFI Assignment - 1",
    subject_short_code: "IOT",
    subject_full_code: "Internet Of Things",
    due_date: "26/06/2023",
    color_code: "#0085FF",
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

  const [assignment, error, isLoading] = useAssignment(id);

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [uploadModalShow, setUploadModalShow] = useState(false);

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
        show={uploadModalShow}
        title="Upload Assignment"
        handleClose={() => setUploadModalShow(false)}
        body={
          <>
            {!fileDataURL && (
              <Upload {...{ handleChange, fileTypes: ["PDF"] }} />
            )}
            {fileDataURL && <PdfViewerComponent document={fileDataURL} />}
          </>
        }
        footer={
          <>
            <div className="footer__left">
              <p className="file__name">
                File name:{" "}
                <span>{file ? file.name : "No Files Uploaded Yet"}</span>
              </p>
            </div>
            <div className="footer__right">
              <Button leftIcon={<LordIcon icon="upload" />} text="Upload" />
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
            <div className="PDF-viewer">
              <PdfViewerComponent document={pdf} />
            </div>
          </section>
          <footer>
            <div className="footer_left">{/* <Button text="Upload" /> */}</div>
            <div className="footer_right">
              <Button
                text="Upload"
                leftIcon={<LordIcon icon="upload" />}
                onClick={() => setUploadModalShow(true)}
              />
            </div>
          </footer>
        </>
  );
};

export default Assignment;
