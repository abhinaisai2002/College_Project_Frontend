import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import useInput from "../custom_hooks/useInput";

import { Form, Row, Col } from "react-bootstrap";
import Button from "../components/UI/button/Button";
import { Input,  } from "../components/UI/input/Input";

import { ReactComponent as Saly } from "../assets/Saly-10.svg";
import { ReactComponent as ArrowRight } from "../assets/ArrowRight.svg";
import { toast_properties } from "../Config";
import "../styles/LoginSignup.scss";

import { loginAction } from "../redux/actions/loginAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  if(isAuth){
    navigate('/');
  }
  const dispatch = useDispatch();

  const {
    value: emailValue,
    isTouched: emailIsTouched,
    handleChange: emailHandleChange,
  } = useInput("", (email) => email.length >= 8);

  const {
    value: passwordValue,
    isTouched: passwordIsTouched,
    handleChange: passwordHandleChange,
  } = useInput("", (password) => password.length >= 8);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(emailValue === '' || passwordValue ===''){
      alert("Please enter the data properly");
      return;
    }

    const data = {
      email: emailValue,
      password: passwordValue,
    }

    dispatch(loginAction(data));
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
          New to this website?{" "}
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </p>

        <Form onSubmit={handleSubmit}>
          <Input
            value={emailValue}
            onChange={emailHandleChange}
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
                label="Password"
                type="password"
                name="password"
                placeholder="Please enter your password"
                required
              />
            </Col>
          </Row>

          <Button
            type="submit"
            text="Login"
            rightIcon={<ArrowRight />}
            onClick={() => toast.success("Login succesfully")}
          />
        </Form>
      </section>
    </div>
  );
};

export default Login;
