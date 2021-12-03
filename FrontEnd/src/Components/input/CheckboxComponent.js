// import { ErrorMessage } from 'formik';
import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../../Values/colors";
import ErrorMessage from "../formik/ErrorMessage";

function CheckboxComponent(props) {
  const handleChange = (event) => {
    props.setFieldValue(props.name, event.target.checked);
  };
  return (
    <div className="form-group form-check custom-checkbox">
      <input
        type="checkbox"
        name={props.name}
        className={
          "form-check-input " +
          (props.errors[props.name] && props.touched[props.name]
            ? " is-invalid"
            : "")
        }
        onChange={(event) => {
          handleChange(event);
        }}
        style={{ height: 15, width: 15 }}
        onBlur={() => {
          if (props.handleBlur) {
            props.handleBlur(props.name);
          }
        }}
      />
      <label htmlFor={props.name} className="form-check-label">
        {console.log("label", props.label)}
        <span
          style={{
            fontSize: "15px",
            color: colors.black,
          }}
        >
          I agree with the
          <a
            // to="/"
            className="ml-1"
            style={{
              color: colors.primary,
            }}
          >
            Terms and Conditions
          </a>
          {props.label && props.label}
        </span>
      </label>
      {/* <ErrorMessage
                name={props.name}
                component='div'
                className='invalid-feedback'
            /> */}
      <ErrorMessage
        error={props.errors[props.name]}
        visible={props.touched[props.name]}
      />
    </div>
  );
}

export default CheckboxComponent;
