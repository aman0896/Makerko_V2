import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

export default function LoadingButtonComponent(props) {
  return (
    <>
      <LoadingButton
        variant={props.variant ? props.variant : "contained"}
        color={props.color ? props.color : "error"}
        startIcon={props.startIcon}
        className={props.className}
        onClick={props.onPress ? props.onPress : props.handleSubmit}
        style={props.style ? props.style : { backgroundColor: "#3f50b5" }}
        type={props.type ? props.type : "button"}
        loading={props.loading}
        loadingPosition={props.position ? props.position : "center"}
        color={props.color ? props.color : "primary"}
        data-toggle={props.toggle ? props.toggle : null}
      >
        {props.title}
      </LoadingButton>
    </>
  );
}
