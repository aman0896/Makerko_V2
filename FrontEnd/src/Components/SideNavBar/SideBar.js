import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./SideBar.css";
import { SideData } from "./SideData";

function SideBar() {
  return (
    <div className="Sidebar mt-4  " style={{ position: "absolute" }}>
      {SideData.map((val, key) => {
        return (
          <div>
            <NavLink
              activeClassName="abc"
              to={val.path}
              style={{ textDecoration: "none" }}
            >
              <div
                key={key}
                className="d-flex"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 60,
                }}
                // id={window.location.pathname === val.path ? "active" : ""}
                //
                // onClick={() => {
                //   window.location.pathname = val.path;
                // }}
                // to={{ pathname: val.path }}
              >
                <div className="icon">{val.Icon}</div>
                <div className="title">{val.title}</div>
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}

export default SideBar;
