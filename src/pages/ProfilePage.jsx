import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signUpAction } from "../redux/actions/signUpAction";

import useInput from "../custom_hooks/useInput";

import { Form, Row, Col } from "react-bootstrap";
import { Input, RadioInput, Select } from "../components/UI/input/Input";
import Button from "../components/UI/button/Button";

import { ReactComponent as Saly } from "../assets/Saly-10.svg";
import { ReactComponent as ArrowRight } from "../assets/ArrowRight.svg";

import "../styles/LoginSignup.scss";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const {
    email:initialEmail,
    department:initialDepartment,
    phone:initialPhone,
    name:initialName,
    gender:initialGender,
  } = useSelector((state) => state.auth.user);

  const [department, setDepartment] = useState(initialDepartment);
  const {
    value: emailValue,
    isTouched: emailIsTouched,
    handleChange: emailHandleChange,
    handleReset: emailHandleReset,
    hasError: emailHasError,
    handleBlur: emailHandleBlur,
  } = useInput(initialEmail, validateEmail);

  const {
    value: nameValue,
    isTouched: nameIsTouched,
    handleChange: nameHandleChange,
    handleReset: nameHandleReset,
    hasError: nameHasError,
    handleBlur: nameHandleBlur,
  } = useInput(initialName, (name) => name.length > 0);

  const {
    value: phoneValue,
    isTouched: phoneIsTouched,
    handleChange: phoneHandleChange,
    handleReset: phoneHandleReset,
    hasError: phoneHasError,
    handleBlur: phoneHandleBlur,
  } = useInput(initialPhone, validatePhoneNumber);

  const [gender, setGender] = useState(initialGender);

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (emailHasError || passwordHasError || cpasswordHasError) {
    //   alert("Please fill out th details properly");
    //   return;
    // }
    // const data = {
    //   email: emailValue,
    //   password: passwordValue,
    //   accountType: "teacher",
    //   gender,
    //   phone: phoneValue,
    //   department,
    //   name: nameValue,
    // };
    // console.log(data);
    //   dispatch(signUpAction(data));
  };

  return (
    <>
      <header>
        <div className="header__left">
          <h1>Profile</h1>
        </div>
      </header>
      <section>
        <Form >
          <Row>
            <Col>
              <Input
                value={emailValue}
                onChange={emailHandleChange}
                onBlur={emailHandleBlur}
                error="Please enter your college email id."
                touched={emailIsTouched}
                errorCond={emailIsTouched && emailHasError}
                label="Email"
                type="email"
                name="email"
                required
              />
            </Col>
            <Col>
              <Input
                value={nameValue}
                onChange={nameHandleChange}
                onBlur={nameHandleBlur}
                error="Name cant be empty."
                touched={nameIsTouched}
                errorCond={nameIsTouched && nameHasError}
                label="Name"
                type="text"
                name="name"
                required
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={phoneValue}
                onChange={phoneHandleChange}
                onBlur={phoneHandleBlur}
                error="Please enter your mobile number properly."
                touched={phoneIsTouched}
                errorCond={phoneIsTouched && phoneHasError}
                label="Phone"
                type="phone"
                name="phone"
                required
              />
            </Col>
            <Col>
              <Select
                name="branch"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                label="Branch or Department"
                optionInitialValue=""
                required
                options={["CSE", "IT", "ECE", "EEE", "CIVIL", "MECH"]}
              />
            </Col>
          </Row>

          <RadioInput
            label="Gender"
            name="gender"
            required
            radioInputs={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "others", label: "Others" },
            ]}
            handleChange={(val) => setGender(val)}
            checkedValue={gender}
          />
          {/* <Button
            type="submit"
            text="Update Account"
            rightIcon={<ArrowRight />}
          /> */}
        </Form>
      </section>
    </>
  );
};

export default ProfilePage;

const validateEmail = (email) => {
  let emailRe = new RegExp("[a-zA-Z0-9]+@[a-z]+.[a-z]+");
  return emailRe.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  let phoneRe = new RegExp("[1-9][0-9]{9}");
  return phoneRe.test(phoneNumber);
};
