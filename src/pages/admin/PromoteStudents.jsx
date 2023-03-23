import React, { useRef, useState } from 'react'
import { Form, Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Input, Select } from '../../components/UI/input/Input';
import { ReactComponent as ArrowRight } from "../../assets/ArrowRight.svg";
import Button from '../../components/UI/button/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../redux/reducers/modalSlice';
import ModalComponent from '../../components/UI/modal/ModalComponent';

export default function PromoteStudents() {

    const [year, setYear] = useState("");
    const [eduYear, setEduYear] = useState("");

    const submitButtonRef = useRef();

    const [showModal, setShowModal] = useState({
        show: false,
        message:''
    })


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('hi')
        try {
            
            const response = await axios.post(
                "http://localhost:8000/api/promote_students_by_year_confirm",
                {
                    year: year,
                    edu_year:eduYear
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer ${localStorage.getItem('access')}`
                    }
                }
            );
            setShowModal({ show: true, message: response?.data?.message });
        }
        catch (err) {
            console.log(err);
        }
        
    }

    const promoteStudents = async () => {
        if (!year || !eduYear) return;
        try {
          const response = await axios.post(
            "http://localhost:8000/api/promote_students_by_year",
            {
              year: year,
              edu_year: eduYear,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );
          setShowModal({ show: true, message: response?.data?.message });
        } catch (err) {
          console.log(err);
        }
    }

  return (
    <div>
      <ModalComponent
        size="md"
        show={showModal.show}
        handleClose={() => setShowModal({ show: false })}
        title={"Confirm Promote"}
        body={
            <div>
                {showModal.show && showModal.message}
            </div>
        }
        footer={
          <>
            <Button
              text="Submit"
              onClick={promoteStudents}  
            />
          </>
        }
      />
      <header>
        <div className="header__left">
          <h1>Admin</h1>
        </div>
        <div className="header__right">
          <Button
            text="Promote"
            onClick={() => submitButtonRef.current.click()}
          />
        </div>
      </header>
      <section>
        <div>
          <h1 className="text-white">Promote Students by Year.</h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Select
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                label="Year Joined"
                optionInitialValue=""
                required
                options={(() => {
                  let d = new Date();
                  let currentYear = d.getFullYear();
                  let years = [];
                  for (let i = 2019; i <= currentYear; i++) {
                    years.push(i);
                  }
                  return years;
                })()}
              />
            </Col>
            <Col>
              <Select
                name="year"
                value={eduYear}
                onChange={(e) => setEduYear(e.target.value)}
                label="Current Education Year"
                optionInitialValue=""
                required
                options={["1", "2", "3", "4"]}
              />
            </Col>
          </Row>
          <button ref={submitButtonRef} style={{ display: "none" }}></button>
        </Form>
      </section>
    </div>
  );
}
