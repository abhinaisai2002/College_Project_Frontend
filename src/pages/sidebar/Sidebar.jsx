import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../redux/actions/loginAction";

import { ReactComponent as SunIcon } from "../../assets/sun.svg";
import { ReactComponent as MoonIcon } from "../../assets/moon.svg";
import { ReactComponent as SearchIcon } from "../../assets/Search.svg";
import { ReactComponent as LogoutIcon } from "../../assets/Logout.svg";
import SettingIcon from "../../assets/setting-gif.gif";
import SettingDarkIcon from "../../assets/settings-dark.gif";

import LordIcon from "../../components/UI/lordIcons/LordIcon";

import "../../styles/Sidebar.scss";
import { ThemeContext } from "../../contexts/ThemeContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const user_type = useSelector((state) => state.auth.user.user_type);
  const refresh = useSelector((state) => state.auth.refresh);

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
  );
};

export default Sidebar;
