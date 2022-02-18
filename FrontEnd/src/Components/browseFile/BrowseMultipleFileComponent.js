import React, { useEffect, useState } from "react";
import { useFormikContext, Field } from "formik";
import { Button } from "@material-ui/core";
import { colors } from "../../Values/colors";
import ErrorMessage from "../formik/ErrorMessage";

export default function BrowseFileComponent(props) {
    const [file, setFile] = useState(null);
    const [fileLength, setFileLength] = useState(null);

    // useEffect(() => {
    //   setFile(props.setInitial);
    //   props.setFieldValue(props.name, props.setInitial);
    // }, [props.setInitial]);

    const handleChange = (event) => {
        const files = event.target.files;

        if (files) {
            props.setFieldValue(props.name, files);

            let filePreview = [];

            for (let i = 0; i < files.length; i++) {
                filePreview.push(URL.createObjectURL(files[i]));
                //file.push(files[i]);
            }
            setFile(filePreview);
            setFileLength(files.length);
            if (props.handleChange) {
                props.handleChange(event);
            }
        } else {
            props.setFieldValue(props.name, file);
            setFile(null);
            setFileLength(null);
            if (props.handleChange) {
                props.handleChange(event);
            }
        }
    };

    const btnStyle = {
        backgroundColor: colors.primary,
        borderRadius: 5,
        fontSize: 15,
        color: colors.white,
    };

    return (
        <div className="mb-4">
            {props.label && (
                <label
                    className="mb-1 font-weight-bold"
                    style={{ fontSize: 14 }}
                >
                    {props.label}
                </label>
            )}

            <div
                className="d-flex  align-items-center m-0 p-0 pl-3 pt-2 w-25"
                style={{
                    border: `0.8px solid ${
                        props.errors &&
                        props.errors[props.name] &&
                        props.touched &&
                        props.touched[props.name]
                            ? colors.danger
                            : colors.gray
                    }`,
                    borderRadius: 5,
                    height: 50,
                }}
            >
                <div className=" d-flex align-items-center">
                    <label
                        className={
                            "btn" +
                            (props.errors &&
                            props.errors[props.name] &&
                            props.touched &&
                            props.touched[props.name]
                                ? " is-invalid"
                                : "")
                        }
                        style={btnStyle}
                        htmlFor={props.name}
                    >
                        {props.title}
                    </label>
                    <input
                        type="file"
                        name={props.name}
                        id={props.name}
                        accept={props.accept}
                        hidden
                        multiple
                        onBlur={() => {
                            if (props.handleBlur) {
                                props.handleBlur(props.name);
                            }
                        }}
                        onChange={(event) => {
                            props.onChange
                                ? props.onChange(event)
                                : handleChange(event);
                        }}
                    />
                </div>
                <div className="ml-5">
                    {props.fileLength
                        ? props.fileLength + "files"
                        : "NO FILE CHOSEN"}
                </div>
            </div>

            <ErrorMessage
                error={props.errors && props.errors[props.name]}
                visible={props.touched && props.touched[props.name]}
            />
        </div>
    );
}
