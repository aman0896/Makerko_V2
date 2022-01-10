import React, { useState } from "react";
import { colors } from "../../Values/colors";

const BrowseFileComponentNew = (props) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const btnStyle = {
    backgroundColor: colors.primary,
    borderRadius: 5,
    fontSize: 15,
    color: colors.white,
  };
  const handleChange = (event) => {
    const file = event.target.files[0];
    console.log("Event after handle change", event);
    if (file) {
      setFile(URL.createObjectURL(file));
      setFileName(file.name);
      if (props.handleChange) {
        props.handleChange(event);
      }
    } else {
      setFile(null);
      setFileName(file.name);
    }
  };
  return (
    <div>
      {props.label && (
        <label className="mb-3 font-weight-bold" style={{ fontSize: 14 }}>
          {props.label}
        </label>
      )}
      {props.image && (
        <div
          style={{
            height: props.height ? props.height : 300,
            borderRadius: 5,
            backgroundColor: colors.gray,
            marginBottom: 20,
            position: "relative",
          }}
        >
          <img
            src={file}
            style={{
              height: props.height ? props.height : 300,
              width: "100%",
              borderRadius: 5,
            }}
            alt=""
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          >
            <label
              className="btn"
              style={btnStyle}
              htmlFor={props.name}
            >
              {fileName ? fileName : props.title}
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
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseFileComponentNew;
