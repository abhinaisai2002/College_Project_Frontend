import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Papa from "papaparse";

import Upload from "../../components/Upload";
import LordIcon from "../../components/UI/lordIcons/LordIcon";

import Button from "../../components/UI/button/Button";
import { RadioInput } from "../../components/UI/input/Input";
import ModalComponent from "../../components/UI/modal/ModalComponent";
import { Table } from "react-bootstrap";
import Spinner from "../../components/UI/spinners/Spinner";

import "../../styles/UploadPage.scss";

const useParseCSV = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   setError("");
  //   if (e.target.files.length) {
  //     const inputFile = e.target.files[0];
  //     const fileExtension = inputFile?.type.split("/")[1];
  //     if (!allowedExtensions.includes(fileExtension)) {
  //       setError("Please input a csv file");
  //       return;
  //     }
  //     setFile(inputFile);
  //   }
  // };

  const handleFileChange = (file) => setFile(file);

  const handleParse = () => {
    if (!file) return setError("Enter a valid file");
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      const columns = Object.keys(parsedData[0]);
      setData({ headers: columns, data: parsedData });
    };
    reader.readAsText(file);
  };

  console.log(file, data, error);

  return [file, data, error, handleFileChange, handleParse];
};

const PreviewCSVTable = ({ data }) => {
  return (
    <>
      {data && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {data?.headers?.map((header) => (
                <th key={header}>{header.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((row) => (
              <tr>
                {Object.entries(row).map(([key, value]) => (
                  <td>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!data && <Spinner />}
    </>
  );
};

const UploadPage = () => {
  const user = useSelector((state) => state.auth);
  const [filePurpose, setFilePurpose] = useState("");
  const [previewModalShow, setPreviewModalShow] = useState(false);

  const [file, data, error, handleChange, handleParse] = useParseCSV();

  const handleSubmitUpload = async () => {
    if (!file || !filePurpose) {
      alert("Please fill the options properly");
      return;
    }

    const uploadData = async (body) => {
      const response = await axios.post("ENDPOINT", body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.access}`,
        },
      });
      const { data } = response;
      return data;
    };

    try {
      const data = await uploadData({ file, filePurpose });
      toast.success("Uploaded succesfully");
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <>
      <ModalComponent
        show={previewModalShow}
        title="File Preview"
        handleClose={() => setPreviewModalShow(false)}
        body={<PreviewCSVTable data={data} />}
        footer={
          <>
            <div className="footer__left"></div>
            <div className="footer__right">
              <Button text="Close" onClick={() => setPreviewModalShow(false)} />
            </div>
          </>
        }
      />
      <header>
        <div className="header__left">
          <h1>
            Upload{" "}
            <span>for Branch/Students Data (only .csv file supported)</span>
          </h1>
        </div>
      </header>
      <section className="upload_page__wrapper">
        <Upload {...{ handleChange, fileTypes: ["CSV", "JPEG"] }} />
        <p className="file__name">
          {file ? `File name: ${file.name}` : "No Files Uploaded Yet"}
        </p>

        <RadioInput
          label=""
          name=""
          radioInputs={[
            { value: "students", label: "For Students" },
            { value: "subjects", label: "For Subjects" },
          ]}
          handleChange={(val) => setFilePurpose(val)}
          checkedValue={filePurpose}
        />
      </section>
      <footer>
        <div className="footer_left"></div>
        <div className="footer_right">
          <Button
            text="Preview"
            onClick={() => {
              setPreviewModalShow(true);
              handleParse();
            }}
            disabled={file === null}
          />

          <Button
            onClick={handleSubmitUpload}
            leftIcon={<LordIcon icon="upload" />}
            text="Upload"
            disabled={file === null}
          />
        </div>
      </footer>
    </>
  );
};

export default UploadPage;
