import React, { useContext } from "react";

import { FileUploader } from "react-drag-drop-files";
import { ThemeContext } from "../contexts/ThemeContext";

import "./Upload.scss";

const Upload = ({ handleChange, fileTypes }) => {

  const {theme} = useContext(ThemeContext)

  return (
    <>
      <div className={`file_upload__wrapper ${theme}`}>
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
      {/* <p className="file__name">
        {file ? `File name: ${file.name}` : "No Files Uploaded Yet"}
      </p> */}
    </>
  );
};

export default Upload;
