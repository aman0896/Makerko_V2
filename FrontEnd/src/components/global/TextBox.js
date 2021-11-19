import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import "./TextBox.css";
import eye from "./eye.svg";
import eyeoff from "./eyeoff.svg";

const FormTextBox = ({ type, placeholder, name, style, value }) => {
    const { errors, touched, handleChange } = useFormikContext();
    return (
        <>
            <input
                type={type}
                id={name}
                style={style}
                className="form-control"
                placeholder={placeholder}
                name={name}
                onChange={handleChange(name)}
                value={value}
            />
            <div
                className="text-danger"
                style={{
                    fontSize: "10pt",
                }}
            >
                {errors[name] && touched[name] && errors[name]}
            </div>
        </>
    );
};

FormTextBox.prototype = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
};

FormTextBox.defaultProps = {
    type: "text",
    style: { borderRadius: "5px", height: "50px" },
};

export default FormTextBox;

export const TextBox = ({
    type,
    placeholder,
    name,
    style,
    error,
    onChange,
    label,
    value,
    defaultValue,
    readOnly,
}) => {
    return (
        <>
            {label ? (
                <div className="row">
                    <span className="font-weight-bold mb-2">{label}</span>

                    <input
                        type={type}
                        style={style}
                        className="form-control"
                        placeholder={placeholder}
                        name={name}
                        onChange={onChange}
                        value={value}
                        defaultValue={defaultValue}
                        readOnly={readOnly}
                    />
                    <div
                        className="text-danger"
                        style={{
                            fontSize: "10pt",
                        }}
                    >
                        {error}
                    </div>
                </div>
            ) : (
                <>
                    <input
                        type={type}
                        style={style}
                        className="form-control"
                        placeholder={placeholder}
                        name={name}
                        onChange={onChange}
                        value={value}
                        readOnly={readOnly}
                    />
                    <div
                        className="text-danger"
                        style={{
                            fontSize: "10pt",
                        }}
                    >
                        {error}
                    </div>
                </>
            )}
        </>
    );
};
TextBox.prototype = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
};

TextBox.defaultProps = {
    type: "text",
    style: { borderRadius: "5px", height: "50px" },
};

export const PasswordField = ({ type, placeholder, name, style, value }) => {
    const { errors, touched, handleChange } = useFormikContext();
    const [types, setTypes] = useState(type);

    const handleClick = () => setTypes(types ? false : true);

    return (
        <div style={{ flex: 1 }}>
            <div id="passwordbox">
                <input
                    type={types ? "password" : "text"}
                    id={name}
                    style={{ paddingRight: "50px", height: "50px" }}
                    className="form-control"
                    placeholder={placeholder}
                    name={name}
                    onChange={handleChange(name)}
                    value={value}
                />

                <img
                    id="icon"
                    onClick={handleClick}
                    src={types ? eye : eyeoff}
                    alt="icon"
                />
            </div>

            <div
                className="text-danger"
                style={{
                    fontSize: "10pt",
                }}
            >
                {errors[name] && touched[name] && errors[name]}
            </div>
        </div>
    );
};

PasswordField.prototype = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
};

PasswordField.defaultProps = {
    type: "text",
    style: { borderRadius: "5px" },
};
