import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Input, RadioInput } from "../components/UI/input/Input";
import Button from "../components/UI/button/Button";
import { ReactComponent as Saly } from "../assets/Saly-10.svg";
import { ReactComponent as ArrowRight } from "../assets/ArrowRight.svg";
import useInput from "../custom_hooks/useInput";

import "./Signup.scss";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    value: emailValue,
    isTouched: emailIsTouched,
    handleChange: emailHandleChange,
    handleReset: emailHandleReset,
    hasError: emailHasError,
    handleBlur: emailHandleBlur,
  } = useInput("", validateStudentEmail);

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

  const [accountType, setAccountType] = useState("");
  const [gender, setGender] = useState("");

  console.warn(accountType, gender);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (accountType === "") {
      alert("Please select type of the account");
      return;
    }
    if (accountType === "") {
      alert("Please select your gender");
      return;
    }
    console.log(emailHasError)
    if (emailHasError || passwordHasError || cpasswordHasError) {
      alert("Please fill out th details properly");
      return;
    }

    const data = {
      email: emailValue,
      password: passwordValue,
      accountType,
      gender,
    };

    console.log(data);
  };

  return (
    <div className="container__wrap">
      <section className="left__section">
        <h1>Start your journey with us.</h1>
        <p>
          Discover the world’s best community of freelancers and business
          owners.
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
          <RadioInput
            label="Account Type"
            name="accountType"
            required
            radioInputs={[
              { value: "student", label: "Student" },
              { value: "employee", label: "Employee" },
            ]}
            handleChange={(val) => setAccountType(val)}
            checkedValue={accountType}
          />
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

const validateStudentEmail = (email) => {
  let emailRe = new RegExp(
    "[0-9][0-9][bB][qQ]1[aA][0-1][0-5][0-9A-Za-z][0-9]@vvit.net"
  );

  return emailRe.test(email);
};

export default Signup;
