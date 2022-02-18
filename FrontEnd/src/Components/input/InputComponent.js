import React, { useEffect, useState } from "react";
import { colors } from "../../Values/colors";
import ErrorMessage from "../formik/ErrorMessage";
import eye from "./eye.svg";
import eyeoff from "./eyeoff.svg";

export default function InputComponent(props) {
    const [data, setData] = useState();
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleShowPassword = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    useEffect(() => {
        if (props.setInitial) {
            setData(props.setInitial);
            props.setFieldValue(props.name, props.setInitial);
        }
    }, [props.setInitial]);

    const handleChange = (event) => {
        setData(event.target.value);
        props.setFieldValue(props.name, event.target.value);
        let data = {
            name: props.name,
            value: event.target.value,
        };
        if (props.handleChange) props.handleChange(data);
    };

    return (
        <div className="mb-2" style={props.inputContainerStyle}>
            {props.label && (
                <label
                    className="mb-1 font-weight-bold"
                    style={{ fontSize: 14 }}
                >
                    {props.label}
                </label>
            )}
            <div style={{ position: "relative" }}>
                <input
                    ref={props.anchorRef}
                    id={props.id}
                    type={
                        props.isPassword
                            ? secureTextEntry
                                ? "password"
                                : "text"
                            : props.type
                    }
                    // aria-controls={props.open ? "composition-menu" : undefined}
                    // aria-expanded={props.open ? "true" : undefined}
                    // aria-haspopup="true"
                    className={
                        props.className ? props.className : "form-control"
                    }
                    placeholder={props.placeholder}
                    value={props.value ? props.value : data}
                    onChange={(event) => {
                        props.setFieldValue
                            ? handleChange(event)
                            : props.onChangeText(event);
                    }}
                    onBlur={() => {
                        if (props.handleBlur) {
                            props.handleBlur(props.name);
                        }
                    }}
                    style={{
                        borderColor:
                            props.errors[props.name] &&
                            props.touched[props.name]
                                ? colors.danger
                                : colors.gray,
                        height: props.height ? props.height : 50,
                        borderRadius: 5,
                    }}
                    readOnly={props.readOnly}
                />
                {props.isPassword && (
                    <img
                        onClick={handleShowPassword}
                        src={secureTextEntry ? eye : eyeoff}
                        alt="icon"
                        style={{
                            position: "absolute",
                            top: "35%",
                            right: "5%",
                        }}
                    />
                )}
                {props.isUnit && (
                    <span
                        style={{
                            position: "absolute",
                            top: "30%",
                            right: "5%",
                        }}
                    >
                        {props.unit}
                    </span>
                )}
            </div>
            <ErrorMessage
                error={props.errors && props.errors[props.name]}
                visible={props.touched && props.touched[props.name]}
            />
        </div>
    );
}
