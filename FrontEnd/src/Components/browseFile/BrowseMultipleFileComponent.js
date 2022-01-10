import React, { useState } from "react";
import { useFormikContext, Field } from "formik";
import { Button } from "@material-ui/core";
import { colors } from "../../Values/colors";
import ErrorMessage from "../formik/ErrorMessage";

export default function BrowseFileComponent(props) {
  const [file, setFile] = useState(null);
  const [fileLength, setFileLength] = useState(null);

  const handleChange = (event) => {
    const files = event.target.files;

    if (files) {
      props.setFieldValue(props.name, files);
      //setFile(URL.createObjectURL(file));
      //   for (let i = 0; i < files.length; i++) {
      //     file.push(URL.createObjectURL(files[i]));
      //   }

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
        <label className="mb-1 font-weight-bold sub-heading" style={{ fontSize: 14 }}>
          {props.label}
        </label>
      )}
      {file && (
        <div className="row m-2">
          {file.map((src) => (
            <div className="col-sm m-2">
              <img
                style={{
                  height: 150,
                  width: 150,
                  border: "1px solid",
                  borderRadius: 5,
                  objectFit: "cover",
                }}
                src={src}
                alt="image"
              />
            </div>
          ))}
        </div>
      )}

      <div
        className="d-flex align-items-center m-0 p-0 justify-content-center"
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
        <div>
          {fileLength ? fileLength + "files" : "NO FILE CHOSEN"}
        </div>
      </div>
      <div className=" d-flex align-items-center justify-content-start mt-3">
        <label
          className={
            "btn w-50" +
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
          multiple
          // onBlur={() => {
          //   if (props.handleBlur) {
          //     props.handleBlur(props.name);
          //   }
          // }}
        />
      </div>

      <ErrorMessage
        error={props.errors[props.name]}
        visible={props.touched[props.name]}
      />
    </div>
  );
}
