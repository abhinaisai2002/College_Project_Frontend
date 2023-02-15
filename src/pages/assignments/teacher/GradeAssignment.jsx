import React, { useContext } from "react";
import Button from "../../../components/UI/button/Button";
import { Input } from "../../../components/UI/input/Input";

import { ThemeContext } from "../../../contexts/ThemeContext";

import "./GradeAssignment.scss";

const GradeAssignment = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <header>
        <div className="header__left">
          <h1>Grade Assignment</h1>
        </div>
      </header>
      <section className={`grade-assignment-section ${theme}`}>
        <form>
          <div className="wrapper">
            <Input
              name="marks"
              type="number"
              label="Marks (x/10)"
              min={0}
              max={10}
            />
            <Input as="textarea" name="remarks" label="Remarks" />
          </div>
        </form>
      </section>

      <footer>
        <div className="footer__left"></div>
        <div className="footer__right">
          <Button text="Submit" />
        </div>
      </footer>
    </>
  );
};

export default GradeAssignment;
