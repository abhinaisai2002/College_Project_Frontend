import React, { useContext, useState } from "react";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { ThemeContext } from "../../../contexts/ThemeContext";

import {ReactComponent as ArrowRight} from "../../../assets/ArrowRight.svg";
// import Button from '';

import "./Test.scss";
import { useGetSemDetailsForStudentQuery } from "../../../redux/reducers/teacherSlice";

const DUMMY_DATA = [
  {
    year: "2019",
    edu_year: "3",
    branch: "CSE",
    section: "C",
    semester: "1",
    sem: "2019-3-CSE-C-1",
  },
  {
    year: "2019",
    edu_year: "4",
    branch: "CSE",
    section: "C",
    semester: "1",
    sem: "2019-4-CSE-C-1",
  },
  {
    year: "2019",
    edu_year: "4",
    branch: "CSE",
    section: "C",
    semester: "2",
    sem: "2019-4-CSE-C-2",
  },
];




const Test = ({data,rollNo}) => {

  const { theme } = useContext(ThemeContext);
  const [semDetails, setSemDetails] = useState({});
  const [skip, setSkip] = useState(true);
  const { data:semResponse, isLoading, error } = useGetSemDetailsForStudentQuery(semDetails, {
    skip,
  });

  const handleSemClick = (item) => {
    console.log(item);
    setSkip(false);
    setSemDetails({ ...item, roll_no: rollNo });
  }
  return (
    <div className={`consolidation_container_wrapper ${theme}`}>
      <header>
        <div className="header__left">
          <h1>Consolidation</h1>
        </div>
      </header>
      <section>
        <Card>
          <Card.Header>
            <Nav variant="pills">
              {data?.map((item) => (
                <Nav.Item key={item?.sem} onClick={ () => handleSemClick(item)}>
                  <Nav.Link className="text-white" href={"#" + item?.sem} >
                    {item?.sem}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Card.Header>
          {semResponse && <Card.Body>
            <div className={`table-wrapper ${theme}`}>
              <Row className="table-header">
                <Col>Subject</Col>
                <Col>Marks</Col>
              </Row>
              {semResponse?.data &&  Object.entries(semResponse.data)?.map(([subject, assignments]) => (
                <TableRow {...{ subject, marks: 0, assignments, level: 1 }} />
              ))}
              <Row className="table-footer">
                <Col>Total</Col>
                <Col>20</Col>
              </Row>
            </div>
          </Card.Body>}
        </Card>
      </section>
    </div>
  );
};


const TableRow = ({ subject, marks, assignments, level }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="table-body">
      <Row className={`level-${level}`}>
        <Col>
          {subject}{" "}
          {level === 1 && (
            <>{
              JSON.stringify(assignments)!=='{}' &&
              <>
                {!show && (
                  <ArrowRight
                    className="arrow-right"
                    onClick={() => setShow(true)}
                  />
                )}
                {show && (
                  <ArrowRight
                    className="arrow-down"
                    onClick={() => setShow(false)}
                  />
                )}
              </>
              }</>
          )}
        </Col>
        <Col>{marks || '-'}</Col>
      </Row>
      {show &&
        assignments &&
        Object.entries(assignments)?.map(([subject, marks]) => (
          <TableRow {...{ subject, marks, level: level + 1 }} />
        ))}
    </div>
  );
};

export default Test;
