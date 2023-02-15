import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signUpAction } from "../../redux/actions/signUpAction";

import useInput from "../../custom_hooks/useInput";
import Button from "../../components/UI/button/Button";
import { Input, RadioInput, Select } from "../../components/UI/input/Input";

import { ReactComponent as Saly } from "../../assets/Saly-10.svg";
import { ReactComponent as ArrowRight } from "../../assets/ArrowRight.svg";

import "./LoginSignup.scss";

const Signup = () => {
  const dispatch = useDispatch();

  const [department, setDepartment] = useState("");
  const {
    value: emailValue,
    isTouched: emailIsTouched,
    handleChange: emailHandleChange,
    handleReset: emailHandleReset,
    hasError: emailHasError,
    handleBlur: emailHandleBlur,
  } = useInput("", validateEmail);

  const {
    value: nameValue,
    isTouched: nameIsTouched,
    handleChange: nameHandleChange,
    handleReset: nameHandleReset,
    hasError: nameHasError,
    handleBlur: nameHandleBlur,
  } = useInput("", (name) => name.length > 0);

  const {
    value: phoneValue,
    isTouched: phoneIsTouched,
    handleChange: phoneHandleChange,
    handleReset: phoneHandleReset,
    hasError: phoneHasError,
    handleBlur: phoneHandleBlur,
  } = useInput("", validatePhoneNumber);

  const {
    value: passwordValue,
    isTouched: passwordIsTouched,
    handleChange: passwordHandleChange,
    handleReset: passwordHandleReset,
    hasError: passwordHasError,
    handleBlur: passwordHandleBlur,
  } = useInput("", (password) => password.length >= 8);

  const {
    value: cpasswordValue,
    isTouched: cpasswordIsTouched,
    handleChange: cpasswordHandleChange,
    handleReset: cpasswordHandleReset,
    hasError: cpasswordHasError,
    handleBlur: cpasswordHandleBlur,
  } = useInput("", (password) => password.length >= 8);

  const [gender, setGender] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailHasError || passwordHasError || cpasswordHasError || !gender) {
      alert("Please fill out the details properly");
      return;
    }

    const data = {
      email: emailValue,
      password: passwordValue,
      accountType: "teacher",
      gender,
      phone: phoneValue,
      department,
      name: nameValue,
    };
    // console.log(data);
    dispatch(signUpAction(data));
  };

  return (
    <div className="container__wrap">
      <section className="left__section">
        <h1>Start your journey with us.</h1>
        <p>
          Discover the world’s best platform for students and teachers to review
          and submit assignments.
        </p>
        <div className="image_wrapper">
          <Saly className="image" />
        </div>
      </section>

      <section className="right__section">
        <h1>Signup</h1>
        <p>
          Have an account already?{" "}
          <Link to="/login" className="link">
            Sign in
          </Link>
        </p>

        <Form onSubmit={handleSubmit}>
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
                placeholder="Enter your email id."
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
                placeholder="Enter your name."
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
                placeholder="Enter your mobile number."
              />
            </Col>
            <Col>
              <Select
                name="branch"
                // value=""
                onChange={(e) => setDepartment(e.target.value)}
                label="Branch or Department"
                optionInitialValue=""
                required
                options={["CSE", "IT", "ECE", "EEE", "CIVIL", "MECH"]}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={passwordValue}
                onChange={passwordHandleChange}
                onBlur={passwordHandleBlur}
                error="Please enter a strong password."
                touched={passwordIsTouched}
                errorCond={passwordIsTouched && passwordHasError}
                label="Password"
                type="password"
                name="password"
                placeholder="Please enter a strong password"
                required
              />
            </Col>
            <Col>
              <Input
                value={cpasswordValue}
                onChange={cpasswordHandleChange}
                onBlur={cpasswordHandleBlur}
                error="Please enter the same password."
                touched={cpasswordIsTouched}
                errorCond={cpasswordIsTouched && cpasswordHasError}
                placeholder="Confirm password"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                required
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
          <Button
            type="submit"
            text="Create Account"
            rightIcon={<ArrowRight />}
          />
        </Form>
      </section>
    </div>
  );
};

const validateEmail = (email) => {
  let emailRe = new RegExp("[a-zA-Z0-9]+@[a-z]+.[a-z]+");
  return emailRe.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  let phoneRe = new RegExp("[1-9][0-9]{9}");
  return phoneRe.test(phoneNumber);
};

export default Signup;
