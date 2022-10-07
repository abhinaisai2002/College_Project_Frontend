import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as SunIcon } from "../../assets/sun.svg";
import { ReactComponent as SearchIcon } from "../../assets/Search.svg";
import { ReactComponent as LogoutIcon } from "../../assets/Logout.svg";
import SettingIcon from "../../assets/setting-gif.gif";

import LordIcon from "../../components/UI/lordIcons/LordIcon";

import "../../styles/Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar__wrapper">
      <header>
        <div className="header__left">
          <h3>Assignments</h3>
        </div>
        <div className="header__right">
          <SunIcon />
        </div>
      </header>
      <div className="search__wrapper">
        <SearchIcon className="search_icon" />
        <input className="search__inp" type="text" placeholder="Search" />
      </div>
      <aside>
        <div>
          <LordIcon icon="profile" />
          Profile
        </div>
        <div>
          {/* <SettingIcon /> */}
          <img src={SettingIcon} alt="" />
          Settings
        </div>
        <div>
          <LordIcon icon="notification" />
          Notifications
        </div>
        <div>
          <Link to="/admin/upload" className="text-white">
            <LordIcon icon="upload" />
            Upload
          </Link>
        </div>
      </aside>

      <footer>
        <div className="logout__wrapper">
          <LogoutIcon />
          Logout
        </div>
      </footer>
    </div>
  );
};

export default Sidebar;
