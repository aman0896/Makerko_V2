import React, { useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../Values/colors";
import "./NavBar.css";
import { FiUser } from "react-icons/fi";

function NavBar() {
    const [hambergerClicked, isHambergerClicked] = useState(false);

    const onhambergerClick = () => {
        isHambergerClicked(!hambergerClicked);
    };

    return (
        <nav className="NavbarItems">
            <div className="navbar-container">
                <Link className="navbar-logo">
                    <h2>Makerko</h2>
                </Link>

                <div className="menu-icon" onClick={onhambergerClick}>
                    <i
                        className={
                            hambergerClicked ? "fas fa-times" : "fas fa-bars"
                        }
                    ></i>
                </div>
                <ul
                    className={
                        hambergerClicked ? "navbar-menu active" : "navbar-menu"
                    }
                >
                    <li>
                        <Link className="navbar-links">Makers</Link>
                    </li>
                    <li>
                        <Link className="navbar-links">Project</Link>
                    </li>
                    <li>
                        <Link className="navbar-links">Blogs</Link>
                    </li>
                </ul>

                <div className="navbar-login">
                    <FiUser />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
