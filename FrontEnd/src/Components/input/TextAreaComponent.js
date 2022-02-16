import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { colors } from "../../Values/colors";
import ErrorMessage from "../formik/ErrorMessage";

export default function TeaxtAreaComponent(props) {
    const [data, setData] = useState();
    const { values } = useFormikContext();

    useEffect(() => {
        if (props.setInitial) {
            setData(props.setInitial);
            props.setFieldValue(props.name, props.setInitial);
        }
    }, []);

    const handleChange = (event) => {
        setData(event.target.value);
        props.setFieldValue(props.name, event.target.value);
    };

    return (
        <div className="mb-2">
            {props.label && (
                <label
                    className="mb-1 font-weight-bold"
                    style={{ fontSize: 14 }}
                >
                    {props.label}
                </label>
            )}
            <div>
                <textarea
                    className={
                        props.className ? props.className : "form-control"
                    }
                    placeholder={props.placeholder}
                    value={data}
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
                        height: 150,
                        borderRadius: 5,
                    }}
                />
            </div>
            <ErrorMessage
                error={props.errors[props.name]}
                visible={props.touched[props.name]}
            />
        </div>
    );
}
