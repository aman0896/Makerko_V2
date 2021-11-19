import React from "react";
import PropTypes from "prop-types";

export default function FileButton({ title, id, FileName, name, onChange }) {
  return (
    <div
      className="row  mt-4 ml-1"
      style={{
        width: "100%",
        borderRadius: "5px",
        border: "1px solid #C4C4C4",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="col-lg-5 m-0 pr-0 mt-2">
        <input
          type="file"
          id={id}
          className="form-control mt-3 mb-5"
          style={{
            height: "45px",
            textAlign: "center",
          }}
          placeholder=""
          name={name}
          onChange={onChange}
          accept=".jpeg, .png, .jpg"
          hidden
        />
        <label htmlFor={id} id="file-lable">
          {title}
        </label>
      </div>
      <div
        className="col-xl pt-0  d-flex align-items-center"
        style={{
          color: "gray",
        }}
      >
        {FileName ? FileName : "NO FILE CHOSEN"}
      </div>
    </div>
  );
}
