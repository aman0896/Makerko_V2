import React from "react";
import "./Input.css";

const Input = ({ className, style, type, id, name, maxLength, onChange }) => {
  let classNm = className ? className : "border m-2 border-secondary";
  let styles = style
    ? style
    : {
        width: "50px",
        height: "50px",
        fontSize: "18px",
        textAlign: "center",
        borderRadius: "5px",
      };
  let types = type ? type : "number";
  let max = maxLength ? maxLength : 1;
  // const keyPressedHandle = (e) => {
  //   console.log(e.target.value);
  //   if (e.target.value === 0) {
  //     return false;
  //   }
  // };
  return (
    <input
      className={classNm}
      style={styles}
      type={types}
      id={id}
      name={name}
      onChange={onChange}
      maxLength={1}
      autoFocus={id === "i1" ? true : false}
      pattern="[\d]"
      // onKeyPress={keyPressedHandle}
    />
  );
};

export default Input;
