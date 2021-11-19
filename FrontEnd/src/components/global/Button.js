import React from "react";
import PropTypes from "prop-types";

export default function Button({
    btnName,
    styleClass,
    visibility,
    toggle,
    target,
    onClick,
    link,
    type,
    disabled,
    style,
}) {
    return (
        <a href={link}>
            <button
                className={styleClass}
                style={
                    style
                        ? style
                        : {
                              fontSize: "16px",
                              backgroundColor: "#5044FD",
                              borderRadius: "5px",
                              color: "white",
                              display: "flex",
                              justifyContent: "center",
                          }
                }
                data-toggle={toggle}
                data-target={target}
                hidden={visibility}
                onClick={onClick}
                type={type}
                disabled={disabled}
            >
                {btnName}
            </button>
        </a>
    );
}
Button.propTypes = {
    styleClass: PropTypes.string,
    btnName: PropTypes.string.isRequired,
    visibility: PropTypes.bool,
    toggle: PropTypes.string,
    target: PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    styleClass: "",
};
