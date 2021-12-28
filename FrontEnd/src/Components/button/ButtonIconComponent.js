import React from "react";

export default function ButtonIconComponent(props) {
    return (
        <span
            className="m-1"
            data-toggle={props.open}
            data-target={props.target}
            onClick={props.onPress}
        >
            {props.icon}
        </span>
    );
}
