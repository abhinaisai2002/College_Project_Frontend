import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { RadioInput } from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import Upload from "../../components/Upload";
import LordIcon from "../../components/UI/lordIcons/LordIcon";

import "../../styles/UploadPage.scss";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [filePurpose, setFilePurpose] = useState("");
  const user = useSelector((state) => state.auth);
  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

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

        <Button
          onClick={handleSubmitUpload}
          leftIcon={<LordIcon icon="upload" />}
          text="Upload"
        />
      </section>
    </>
  );
};

export default UploadPage;
