import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
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
                    <h2>MAKERKO</h2>
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
                        <Link className="navbar-links">MAKERS</Link>
                    </li>
                    <li>
                        <Link className="navbar-links">PROJECT</Link>
                    </li>
                    <li>
                        <Link className="navbar-links">BLOGS</Link>
                    </li>
                </ul>

                <div>
                    <ProfileAvatarLogin />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

//If user is not Logged in
function ProfileAvatarLogin() {
    return (
        <>
            <div data-toggle="dropdown" className="dropdown navbar-login">
                <FiUser />
            </div>

            <div className="dropdown-menu dropdown-menu-lg-right dropdown-menu-style">
                <div>
                    <a
                        className="dropdown-item  dropdown-item-style"
                        href="/login"
                    >
                        Sign In
                    </a>
                </div>
                <div>
                    <a
                        className="dropdown-item dropdown-item-style"
                        href="/register"
                        type="button"
                        data-toggle="modal"
                        data-target="#signup"
                    >
                        {" "}
                        Sign Up
                    </a>
                </div>
            </div>
        </>
    );
}

//if user is alread logged in
function ProfileAvatarLogout() {
    const history = useHistory();
    // const onclickLogout = () => {
    //     axios.defaults.withCredentials = true;
    //     axios.post(`${window.host}/logout`).then((response) => {
    //         if (response.status === 202) {
    //             console.log(response, "logout");
    //             history.push({ pathname: "/" });
    //             history.go();
    //         }
    //     });
    // };

    const onClickEditCustomerProfile = () => {
        // history.push({ pathname: `/${userID}/customer-profile` });
    };

    const onClickEditProfileMaker = () => {
        // history.push({ pathname: `/${userID}/manufacturer-profile` });
    };
    return (
        <li className="dropdown nav-item">
            <a data-toggle="dropdown">
                <div className="icon-container">{"username.charAt(0)"}</div>
            </a>

            <ul className="dropdown-menu dropdown-menu-lg-right p-0">
                <li>
                    <a
                        className="dropdown-item p-2 pl-4"
                        // onClick={
                        //     userType === "customer"
                        //         ? onClickEditCustomerProfile
                        //         : onClickEditProfileMaker
                        // }
                    >
                        <FiUser size="22px" />{" "}
                        <span className="ml-1">My Profile</span>
                    </a>
                </li>

                <li>
                    <a
                        className="dropdown-item p-2 pl-4 "
                        // onClick={onclickLogout}
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                    </a>
                </li>
            </ul>
        </li>
    );
}

// [
//     { name: "Sign In", link: "/login" },
//     { name: "Sign Up", link: "/signup" },
// ]
