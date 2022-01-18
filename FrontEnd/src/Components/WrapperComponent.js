import React from "react";
import { useSelector } from "react-redux";
import "./WrapperComponent.css";

function WrapperComponent({ children, style }) {
    const isSidebar = useSelector((state) => state.setSidebar.sidebar);
    console.log(isSidebar, "sidebarcheck");
    return (
        <div className="parent-container">
            <div
                className={
                    isSidebar && isSidebar === true
                        ? "children-container sidebar"
                        : "children-container"
                }
            >
                {children}
            </div>
        </div>
    );
}

export default WrapperComponent;
