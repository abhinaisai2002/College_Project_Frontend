import React from "react";
import Teachers from "./admin/Teachers";

import { ReactComponent as SunIcon } from "../assets/sun.svg";
import { ReactComponent as SearchIcon } from "../assets/Search.svg";
import { ReactComponent as ProfileIcon } from "../assets/Profile.svg";
import { ReactComponent as SettingIcon } from "../assets/Setting.svg";
import { ReactComponent as LogoutIcon } from "../assets/Logout.svg";
import LordIcon from "../components/UI/lordIcons/LordIcon";
import "../styles/Admin.scss";

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
          <ProfileIcon />
          Profile
        </div>
        <div>
          <SettingIcon />
          Settings
        </div>
      </aside>

      <footer>
        <div>
          <LogoutIcon />
          Logout
        </div>
      </footer>
    </div>
  );
};

const Admin = () => {
  return (
    <div className="admin_app">
      <Sidebar />
      <Teachers />
    </div>
  );
};

export default Admin;
