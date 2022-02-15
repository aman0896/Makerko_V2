// import { ErrorMessage } from 'formik';
import { useFormikContext } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../../Values/colors";
import ErrorMessage from "../formik/ErrorMessage";

function CheckboxComponent(props) {
    const { values } = useFormikContext();
    const handleChange = (event) => {
        if (event.target.checked === false) {
            props.handleBlur(props.name);
        }
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
                checked={values[props.name]}
                onChange={(event) => {
                    handleChange(event);
                }}
                style={{ height: 15, width: 15 }}

                // onBlur={() => {
                //     if (props.handleBlur) {
                //         props.handleBlur(props.name);
                //     }
                // }}
            />
            <label htmlFor={props.name} className="form-check-label">
                <span
                    style={{
                        fontSize: "15px",
                        color: colors.black,
                    }}
                >
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
