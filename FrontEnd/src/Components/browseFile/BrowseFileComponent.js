import React, { useState } from "react";
import { useFormikContext, Field } from "formik";
import { Button } from "@material-ui/core";
import { colors } from "../../Values/colors";
import ErrorMessage from "../formik/ErrorMessage";

export default function BrowseFileComponent(props) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    console.log(file, "file");

    if (file) {
      props.setFieldValue(props.name, file);
      setFile(URL.createObjectURL(file));
      setFileName(file.name);
      if (props.handleChange) {
        props.handleChange(event);
      }
    } else {
      props.setFieldValue(props.name, file);
      setFile(null);
      setFileName(null);
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
        <label className="mb-3 font-weight-bold" style={{ fontSize: 14 }}>
          {props.label}
        </label>
      )}
      {props.placeholder && (
        <div
          className="mb-3 font-weight-bold"
          style={{ fontSize: 14, color: colors.placeholder }}
        >
          {props.placeholder}
        </div>
      )}
      {props.image && (
        <div
          style={{
            height: props.height ? props.height : 200,
            borderRadius: 5,
            backgroundColor: colors.gray,
            marginBottom: 20,
          }}
        >
          <img
            src={file}
            style={{
              height: props.height ? props.height : 200,
              width: "100%",
              borderRadius: 5,
            }}
          />
        </div>
      )}

      <div
        className="d-flex  align-items-center m-0 p-0 pl-3 pt-2"
        style={{
          border: `0.8px solid ${
            props.errors[props.name] && props.touched[props.name]
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
              (props.errors[props.name] && props.touched[props.name]
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
            onChange={(event) => {
              handleChange(event);
            }}
            onBlur={() => {
              if (props.handleBlur) {
                props.handleBlur(props.name);
              }
            }}
          />
        </div>
        <div className="ml-5"> {fileName ? fileName : "NO FILE CHOSEN"}</div>
      </div>

      <ErrorMessage
        error={props.errors[props.name]}
        visible={props.touched[props.name]}
      />
    </div>
  );
}
