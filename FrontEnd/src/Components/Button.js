import React from "react";
import "./Button.css";

const STYLES = [
  "button--primary--solid",
  "button--success--solid",
  "button--warning--solid",
  "button--danger--solid",
  "button--white--solid",
  "button--white--outline",
  "button--primary--outline",
  "button--success--outline",
  "button--warning--outline",
  "button--danger--outline",
  "button--dark--outline",
];

const SIZES = [
  "button--small",
  "button--medium",
  "button--large",
  "button--large--50",
  "button--large--100",
  "button--large--nomargin",
];

function Button({ children, type, buttonStyle, buttonSize, onClick, style }) {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`button ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type ? type : "button"}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;

const button2Sizes = ["button2--medium", "button2--large"];

export function Button2({ children, type, buttonSize, onClick }) {
  const checkButtonSize = button2Sizes.includes(buttonSize)
    ? buttonSize
    : button2Sizes[0];

  if (checkButtonSize === "button2--medium") {
    var button2Container = "button2-container--medium";
    var button2SubContainer = "button2-sub-container--medium";
  } else {
    button2Container = "button2-container--large";
    button2SubContainer = "button2-sub-container--large";
  }

  return (
    <div>
      <div className={button2Container}>
        <div className={button2SubContainer}>
          <button
            className={`button2 ${checkButtonSize}`}
            type={type}
            onClick={onClick}
          >
            {children}
          </button>
        </div>
      </div>
    </div>
  );
}
