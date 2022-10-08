import React from "react";

import { FileUploader } from "react-drag-drop-files";

import "./Upload.scss";

const Upload = ({ handleChange, fileTypes }) => {
  return (
    <>
      <div className="file_upload__wrapper">
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
