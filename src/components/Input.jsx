import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./Input.scss";

export const Input = ({
  label,
  required,
  error,
  success,
  errorCond,
  ...other
}) => {
  return (
    <Form.Group className="input__wrapper">
      {label && (
        <Form.Label>
          {label}
          {required && <span className="asterisk">*</span>}
        </Form.Label>
      )}
      <Form.Control
        className={`${error !== "" && "error"} ${success && "success"}`}
        {...other}
      />
      {errorCond && <span className="error__message">{error}</span>}
    </Form.Group>
  );
};

export const RadioInput = ({
  label,
  value,
  name,
  required,
  radioInputs,
  handleChange,
  error,
  checkedValue,
}) => {
  return (
    <Form.Group className="input__wrapper">
      <Form.Label>
        {label}
        {required && <span className="asterisk">*</span>}
      </Form.Label>
      <Row>
        {radioInputs &&
          radioInputs.map((item) => {
            const isChecked = checkedValue === item.value;
            return (
              <Col
                key={item.value}
                onClick={() => {
                  handleChange(item.value);
                }}
              >
                <Form.Check
                  key={item.value}
                  onClick={() => {
                    handleChange(item.value);
                  }}
                  type="radio"
                  className={isChecked ? "radio_check_input" : null}
                  style={
                    isChecked
                      ? {
                          background: "#F4F7FF",
                        }
                      : {}
                  }
                >
                  <Form.Check.Input
                    type="radio"
                    name={name}
                    value={item.value}
                    onChange={(e) => handleChange(e.target.value)}
                    checked={isChecked}
                  />
                  <Form.Check.Label
                    style={
                      isChecked ? { color: "#413DF2", fontWeight: 600 } : {}
                    }
                  >
                    {item.label}
                  </Form.Check.Label>
                </Form.Check>
              </Col>
            );
          })}
      </Row>
      {error && <span className="error-message">{error}</span>}
    </Form.Group>
  );
};
