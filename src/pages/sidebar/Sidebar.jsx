import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../redux/actions/loginAction";

import { ReactComponent as SunIcon } from "../../assets/sun.svg";
import { ReactComponent as MoonIcon } from "../../assets/moon.svg";
import { ReactComponent as SearchIcon } from "../../assets/Search.svg";
import { ReactComponent as LogoutIcon } from "../../assets/Logout.svg";
import SettingIcon from "../../assets/setting-gif.gif";
import SettingDarkIcon from "../../assets/settings-dark.gif";

import { Form, Modal } from "react-bootstrap";

import LordIcon from "../../components/UI/lordIcons/LordIcon";
import Button from "../../components/UI/button/Button";
import ModalComponent from "../../components/UI/modal/ModalComponent";
import { Input, RadioInput, Select } from "../../components/UI/input/Input";

import "../../styles/Sidebar.scss";
import { ThemeContext } from "../../contexts/ThemeContext";
import Upload from "../../components/Upload";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const user_type = useSelector((state) => state.auth.user.user_type);
  const refresh = useSelector((state) => state.auth.refresh);

  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState(false);

  const [showUploadAssignmentModal, setShowUploadAssignmentModal] =
    useState(false);

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    due_date: "",
    batch: "",
    branch: "",
    subject: "",
    section: "",
  });

  // useEffect(() => {
  //   document.addEventListener("keydown", detectKeyDown, true);
  // }, []);

  // const detectKeyDown = (e) => {
  //   console.log(e);
  // };

  const handleLogout = () => {
    dispatch(logOut(refresh));
  };

  const handleChange = (file) => setFile(file);

  console.log(formData);

  const handleDate = (e) => {
    let due_date = new Date(e.target.value);

    let dateList = due_date.toString().split(" ");
    dateList = dateList.slice(0, 6);
    due_date = dateList.join(" ");
    setFormData((prev) => ({ ...prev, due_date }));
  };

  const handleFormDataChange = (e) => {
    let { name, value } = e.target;

    switch (name) {
      case "due_date":
        let due_date = new Date(e.target.value);

        let dateList = due_date.toString().split(" ");
        dateList = dateList.slice(0, 6);
        value = dateList.join(" ");
        break;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <ModalComponent
        show={showUploadAssignmentModal}
        title="Upload Assignment"
        handleClose={() => setShowUploadAssignmentModal(false)}
        body={
          <>
            <Upload {...{ handleChange, fileTypes: ["PDF"] }} />
          </>
        }
        footer={
          <>
            <div className="footer__left"></div>
            <div className="footer__right">
              <Button
                text="Proceed"
                onClick={() => setShowUploadAssignmentModal(false)}
              />
            </div>
          </>
        }
      />

      <ModalComponent
        show={showNewAssignmentModal}
        title="Create New Assignment"
        handleClose={() => setShowNewAssignmentModal(false)}
        body={
          <>
            <div className={`teacher_filter__form ${theme}`}>
              <form style={{ width: "10rem !important" }}>
                {/* title due_date date file year branch section subject
                subject_code */}

                <Input
                  label="Title"
                  name="title"
                  value={formData?.title}
                  onChange={handleFormDataChange}
                  required
                />

                <Input
                  type="date"
                  label="Due Date"
                  name="due_date"
                  value={formData?.due_date}
                  onChange={handleFormDataChange}
                  required
                />

                <Select
                  label="Batch"
                  name="batch"
                  optionInitialValue=""
                  options={["2019", "2020", "2021", "2022"]}
                  value={formData?.batch}
                  onChange={handleFormDataChange}
                  required
                />

                <Select
                  label="Branch"
                  name="branch"
                  value={formData?.branch}
                  optionInitialValue=""
                  options={["CSE", "IT", "ECE", "EEE", "CIVIL", "MECH"]}
                  onChange={handleFormDataChange}
                  required
                />
                <Select
                  label="Subject"
                  name="subject"
                  value={formData?.subject}
                  optionInitialValue=""
                  options={["ML", "UML", "IOT", "BDA", "CNS"]}
                  onChange={handleFormDataChange}
                />

                <RadioInput
                  label="Section"
                  name="section"
                  required
                  radioInputs={[
                    { value: "A", label: "A" },
                    { value: "B", label: "B" },
                    { value: "C", label: "C" },
                    { value: "D", label: "D" },
                  ]}
                  handleChange={(val) =>
                    setFormData((prev) => ({ ...prev, section: val }))
                  }
                  checkedValue={formData?.section}
                />

                <Button
                  text="Upload Assignment File"
                  onClick={() => setShowUploadAssignmentModal(true)}
                />

                {file ? file.name : "No Files Uploaded Yet"}
              </form>
            </div>
          </>
        }
        footer={
          <>
            <div className="footer__left"></div>
            <div className="footer__right">
              <Button
                text="Close"
                onClick={() => setShowNewAssignmentModal(false)}
              />
              <Button
                text="Create Assignment"
                onClick={() => {
                  console.log(formData);
                }}
              />
            </div>
          </>
        }
      />

      <div
        className={`sidebar__wrapper ${
          theme === "dark" ? "sidebar__wrapper-dark" : "sidebar__wrapper-light"
        }`}
      >
        <header>
          <div className="header__left">
            <h3 onClick={() => navigate("/")}>Assignments</h3>
          </div>
          <div className="header__right">
            {theme === "light" ? (
              <MoonIcon onClick={toggleTheme} />
            ) : (
              <SunIcon onClick={toggleTheme} />
            )}
          </div>
        </header>
        <div
          className={`search__wrapper ${theme === "dark" ? "dark" : "light"}`}
        >
          <SearchIcon className="search_icon" />
          <input className="search__inp" type="text" placeholder="Search" />
        </div>
        <aside>
          <div onClick={() => navigate("/profile")}>
            <LordIcon icon="profile" />
            Profile
          </div>
          <div>
            <img
              src={theme === "light" ? SettingDarkIcon : SettingIcon}
              alt=""
            />
            Settings
          </div>
          <div>
            <LordIcon icon="notification" />
            Notifications
          </div>
          {user_type === "teacher" && (
            <div onClick={() => setShowNewAssignmentModal(true)}>
              <LordIcon icon="file" />
              New Assignment
            </div>
          )}
          {user_type === "admin" && (
            <div onClick={() => navigate("admin/upload")}>
              {/* <Link to="/admin/upload" className="text-white"> */}
              <LordIcon icon="upload" />
              Upload
              {/* </Link> */}
            </div>
          )}
        </aside>

        <footer>
          <div className="logout__wrapper" onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </div>
        </footer>
      </div>
    </>
  );
};

export default Sidebar;
