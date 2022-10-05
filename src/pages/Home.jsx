import React, { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/reducers/authSlice";
import { getNewTokens } from "../redux/actions/loginAction";

import { Dropdown } from "react-bootstrap";

import { ReactComponent as SunIcon } from "../assets/sun.svg";
import { ReactComponent as MoonIcon } from "../assets/moon-icon.svg";
import LordIcon from "../components/UI/lordIcons/LordIcon";

import "../styles/Home.scss";

const Toogle = () => {
  const [toggleState, setToggleState] = useState(false);
  const ballRef = useRef();
  const toogleClickHandler = () => {
    ballRef.current.style.transition = "all .2s ease-in";
    if (!toggleState) ballRef.current.style.left = "45px";
    else ballRef.current.style.left = "5px";
    setToggleState((p) => !p);
  };
  return (
    <div id="toggle" onClick={toogleClickHandler}>
      <div id="ball" ref={ballRef} className=" ball">
        <SunIcon />
      </div>
    </div>
  );
};

const NavBar = () => {
  const dispatch = useDispatch();

  return (
    <nav>
      <div className="nav__left m-2">
        <h1>Assignments</h1>
      </div>
      <div className="nav__right">
        <Toogle />
        <div className="search__wrapper">
          <LordIcon icon="search" className="search_icon" />
          <input className="search__inp" type="text" placeholder="Search" />
        </div>
        <div className="notification__wrapper">
          <LordIcon icon="notification" />
        </div>

        <div className="profile__wrapper">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              user
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#/action-1" active>
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(authActions.logout());
                }}
              >
                Logout
              </Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <>
      <NavBar />
    </>
  );
};

export default Home;
