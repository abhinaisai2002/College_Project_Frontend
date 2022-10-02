import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Input, RadioInput } from "../components/Input";
import Button from "../components/Button";
import { ReactComponent as Saly } from "../assets/Saly-10.svg";
import { ReactComponent as ArrowRight } from "../assets/ArrowRight.svg";
import useInput from '../custom_hooks/useInput';

import "./Signup.scss";
import { Link } from "react-router-dom";

const Login = ()=>{

    const {
        value:emailValue,
        isTouched:emailIsTouched,
        handleChange:emailHandleChange,
    } = useInput('',(email)=> email.length>=8);

    const {
        value:passwordValue,
        isTouched:passwordIsTouched,
        handleChange:passwordHandleChange,
    } = useInput('',(password)=> password.length>=8);


    const handleSubmit = (event)=>{
        event.preventDefault();
        const data = {
            email:emailValue,
            password:passwordValue
        }
        console.log(data);
    }
    

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
                placeholder="Enter your email id."/>
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
              
              <Button type="submit" text="Login" rightIcon={<ArrowRight />} />
            </Form>
          </section>
        </div>
      );
}

export default Login;
