import React, { useState } from "react";
import { useDispatch } from "react-redux";

import useInput from "../../custom_hooks/useInput";
import { Input } from "../../components/UI/input/Input";

import { ReactComponent as Saly } from "../../assets/Saly-10.svg";
import { ReactComponent as ArrowRight } from "../../assets/ArrowRight.svg";

import "./LoginSignup.scss";
import { Col, Form, Row } from "react-bootstrap";
import Button from "../../components/UI/button/Button";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";

import {modalActions} from '../../redux/reducers/modalSlice'
import axios from "axios";

const ForgotPassword = () => {
    
    const {
        value: emailValue,
        isTouched: emailIsTouched,
        handleChange: emailHandleChange,
    } = useInput("", (email) => email.length >= 8);

    const dispatch = useDispatch();



    const [loading, setLoading] = useState(false);

    const [showOTPForm, setOTPForm] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (emailValue === "") {
            alert("Please enter the data properly");
            return;
        }

        const data = {
            email: emailValue,
        };
        
        await new Promise((r) => setTimeout(r, 2000));

        setLoading(false);

        try {
            const response = await axios.post(
                'http://localhost:8000/api/auth/reset-password',
                data,
            );
            dispatch(modalActions.showModal("OTP has sent to your pls check and change your password"));
            setOTPForm(true);
        }
        catch (err) {
            dispatch(modalActions.showModal(err.response.data.message));
        }

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

        {loading && <p>Loading</p>}  
        
        {!loading && <section className="right__section">
            <h1>Forgot Password</h1>

            <p>
                You can login here.{" "}
                <Link to="/login" className="link">
                    Sign up
                </Link>

                {
                    showOTPForm &&
                    <p>Your OTP expires in 10min.</p>
                }
            </p>
            
            {!showOTPForm && <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Input
                            value={emailValue}
                            onChange={emailHandleChange}
                            label="Email"
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email id."
                        />
                    </Col>
                </Row>
                <div className="d-flex justify-content-end">
                    <Button
                        position="no"
                        type="submit"
                        text="Send OTP"
                        rightIcon={<ArrowRight />}
                    />
                </div>
            </Form>}
            
            {showOTPForm &&
                <div>
                    <OTPForm user={emailValue} dispatch={dispatch} />
                </div>
            }
        </section>}
    </div>
  );
};


function OTPForm({user,dispatch}) {
    const [OTP, setOTP] = useState("");
    const navigator = useNavigate();
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

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (passwordHasError || cpasswordHasError || OTP.length < 6) {
        alert("Please fill out the details properly");
        return;
      }

      let data = {
        otp: OTP,
        password: passwordValue,
        email: user,
      };

      await new Promise((r) => setTimeout(r, 2000));
        
        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/change-password",
                data
            );
            dispatch(modalActions.showModal("Your password has been updated successfully"));
            navigator('/login');
        } catch (err) {
            dispatch(modalActions.showModal(err.response.data.message));
        }

    
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="py-3">
                <h1>Hello, {user}</h1>
            </Row>    
        <Row className="my-3">
          <Col>
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              required          
              //   secure
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
        <div className="d-flex justify-content-end">
          <Button
            position="no"
            type="submit"
            text="Change Password"
            rightIcon={<ArrowRight />}
          />
        </div>
      </Form>
    );
}


export default ForgotPassword;
