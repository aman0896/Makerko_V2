import React from "react";
import "./Input.css";

const Input = ({ id, name, onChange, value, onKeyUp }) => {
    return (
        <input
            className="otpInput form-control"
            type="text"
            id={id}
            name={name}
            onChange={onChange}
            maxLength="1"
            value={value}
            onKeyUp={onKeyUp}
        />
    );
};

export default Input;
