import React from "react";
import "./Section.css";

function Section({ children }) {
    return <div className="section-container">{children}</div>;
}

export default Section;
