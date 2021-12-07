import React from "react";
import "./WrapperComponent.css";

function WrapperComponent({ children }) {
    return (
        <div className="parent-container">
            <div className="children-container">{children}</div>
        </div>
    );
}

export default WrapperComponent;
