import React, { useRef } from "react";

import { Dropdown } from "react-bootstrap";

import { ReactComponent as SunIcon } from "../assets/sun.svg";
import { ReactComponent as MoonIcon } from "../assets/moon-icon.svg";
import LordIcon from "../components/UI/lordIcons/LordIcon";

import "../styles/Home.scss";

const Toogle = () => {
  const toogleRef = useRef();
  const ballRef = useRef();
  const toogleClickHandler = () => {
    console.log(ballRef.current.style.left);
    ballRef.style.left = "25px";
  };
  return (
    <div id="toggle" ref={toogleRef} onClick={toogleClickHandler}>
      <div id="ball" ref={ballRef} className=" ball">
        <SunIcon />
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <nav>
      <div className="nav__left"></div>
      <div className="nav__right">
        <Toogle />

        <div className="search__wrapper">
          <LordIcon icon="search" className="search_icon" />
          <input className="search__inp" type="text" placeholder="Search" />
        </div>
        <div className="notification__wrapper">
          <LordIcon icon="notification" />
        </div>

        {/* <div className="profile__wrapper">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#/action-1" active>
                Action
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
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
