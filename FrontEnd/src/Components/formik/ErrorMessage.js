import React from "react";
import { colors } from "../../Values/colors";

function ErrorMessage(props) {
  const errorStyle = {
    color: colors.danger,
    fontSize: 14,
  };

  if (!props.error || !props.visible) return null;
  return (
    <div style={errorStyle}>
      {console.log(props.error, "errorr")}
      {props.error}
    </div>
  );
}

export default ErrorMessage;
