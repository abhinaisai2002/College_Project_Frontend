import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Input, RadioInput } from "../components/Input";
import Button from "../components/Button";
import { ReactComponent as Saly } from "../assets/Saly-10.svg";
import { ReactComponent as ArrowRight } from "../assets/ArrowRight.svg";

import "./Signup.scss";

const Signup = () => {
  const [accountType, setAccountType] = useState("");
  const [gender, setGender] = useState("");

  console.warn(accountType, gender);

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
          <a href="/" className="link">
            Sign in
          </a>
        </p>

        <Form>
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
          <Input label="Email" type="email" name="email" required />
          <Row>
            <Col>
              <Input
                label="Password"
                type="password"
                name="password"
                required
              />
            </Col>
            <Col>
              <Input
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
          <Button text="Create Account" rightIcon={<ArrowRight />} />
        </Form>
      </section>
    </div>
  );
};

export default Signup;
