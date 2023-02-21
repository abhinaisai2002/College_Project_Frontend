import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../redux/actions/loginAction";
import { ThemeContext } from "../../contexts/ThemeContext";

import { ReactComponent as SunIcon } from "../../assets/sun.svg";
import { ReactComponent as MoonIcon } from "../../assets/moon.svg";
import { ReactComponent as SearchIcon } from "../../assets/Search.svg";
import { ReactComponent as LogoutIcon } from "../../assets/Logout.svg";
import SettingIcon from "../../assets/setting-gif.gif";
import SettingDarkIcon from "../../assets/settings-dark.gif";

import LordIcon from "../../components/UI/lordIcons/LordIcon";

import "./Sidebar.scss";
import { useMyAssignmentsForTeacherQuery } from "../../redux/reducers/teacherSlice";
import { getDate } from "../assignments/teacher/TeacherFilterForm";
import ModalComponent from "../../components/UI/modal/ModalComponent";
import Button from "../../components/UI/button/Button";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const user_type = useSelector((state) => state.auth.user.user_type);
  const refresh = useSelector((state) => state.auth.refresh);

  const [showAssignments, setShowAssignments] = useState(false);
  
  const { data: assignmentsResponse } = useMyAssignmentsForTeacherQuery({
    
  }, {
    refetchOnMountOrArgChange:true
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
  return (
    
    <>
      <ModalComponent
        size="lg"
        title="Assignments"
        show={showAssignments}
        handleClose={() => setShowAssignments(false)}
        body={
          <>
          {assignmentsResponse && <div className={`assignments__wrapper`}>
              {Object.entries(assignmentsResponse?.data)?.map(([title,data]) => (
                <div
                  className="assignment__wrapper"
                  style={{ background: "#414653 " }}
                  onClick={() => {
                    setShowAssignments(false);
                    navigate(
                      `/teacher-assignments/${data?.year}/${data?.branch}/${data?.semester}/${data?.section}/${data?.subject}/${title}/${data?.id}`
                    )
                  }
                  }
                >
                  <div
                    className="assignment_subject_color_code"
                    style={{ background: data?.subject_color }}
                  />
                  <div className="assignment_subject">{data?.subject_code}</div>
                  <div className="assignment_body">
                    <span>{title}</span>
                    <span>{getDate(data?.creation_date)}</span>
                  </div>
                </div>
              ))}
            </div>}
          </>
        }
        footer={
          <>
            <div className="footer_left"></div>
            <Button text="Close" onClick={() => setShowAssignments(false)} />
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
        <div className={`search__wrapper ${theme === "dark" ? "dark" : "light"}`}>
          <SearchIcon className="search_icon" />
          <input className="search__inp" type="text" placeholder="Search" />
        </div>
        <aside>
          <div onClick={() => navigate("/profile")}>
            <LordIcon icon="profile" />
            Profile
          </div>
          <div>
            <img src={theme === "light" ? SettingDarkIcon : SettingIcon} alt="" />
            Settings
          </div>
          <div>
            <LordIcon icon="notification" />
            Notifications
          </div>
          {user_type === "teacher" && (
            <div onClick={() => navigate("/create-assignment")}>
              <LordIcon icon="file" />
              Create Assignment
            </div>
          )}
          {user_type === "teacher" && (
            <div onClick={ ()=>setShowAssignments(true) }>
              <LordIcon icon="assignment" />
              My Assignments
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
