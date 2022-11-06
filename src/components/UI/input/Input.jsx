import React, { useContext } from "react";
import { Form, Row, Col } from "react-bootstrap";

import { ThemeContext } from "../../../contexts/ThemeContext";

import "./Input.scss";

export const Input = ({
  label,
  required,
  error,
  success,
  errorCond,
  touched,
  ...other
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Form.Group className={`input__wrapper ${theme}`}>
      {label && (
        <Form.Label>
          {label}
          {required && <span className="asterisk">*</span>}
        </Form.Label>
      )}
      <Form.Control
        className={`${touched ? (errorCond ? "error" : "success") : ""}`}
        {...other}
        required
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
  const { theme } = useContext(ThemeContext);

  return (
    <Form.Group className={`input__wrapper ${theme}`}>
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
                  className={isChecked ? "radio_check_input " + theme : theme}
                >
                  <Form.Check.Input
                    type="radio"
                    name={name}
                    value={item.value}
                    onChange={(e) => handleChange(e.target.value)}
                    checked={isChecked}
                  />
                  <Form.Check.Label>{item.label}</Form.Check.Label>
                </Form.Check>
              </Col>
            );
          })}
      </Row>
      {error && <span className="error-message">{error}</span>}
    </Form.Group>
  );
};

export const Select = ({
  label,
  required,
  error,
  success,
  errorCond,
  touched,
  name,
  value,
  onChange,
  disabled,
  optionInitialValue,
  options,
  optionKey,
  optionValue,
  valueLength,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Form.Group className={`input__wrapper ${theme}`}>
      {label && (
        <Form.Label>
          {label}
          {required && <span className="asterisk">*</span>}
        </Form.Label>
      )}
      <Form.Select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {optionInitialValue === "" && (
          <option value={optionInitialValue}>Select</option>
        )}
        {options && Array.isArray(options) && (
          <>
            {options.map((item) => {
              const value = optionValue ? item[optionValue] : item;
              const key = optionKey ? item[optionKey] : item;
              const vl = valueLength ? valueLength : 40;

              return (
                <option key={value} value={value}>
                  {key.length > vl ? key.substring(0, vl) + "..." : key}
                </option>
              );
            })}
          </>
        )}
        {options && !Array.isArray(options) && (
          <>
            {Object.entries(options).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </>
        )}
      </Form.Select>
    </Form.Group>
  );
};
