import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import { FiUser } from "react-icons/fi";
import { getData, getDataWithNoParams } from "../commonApi/CommonApi";
import { currentUserLink, logout } from "../commonApi/Link";

function NavBar({ isAuth, currentUser, userType }) {
    const [hambergerClicked, isHambergerClicked] = useState(false);
    const [currentUserData, setCurrentUserData] = useState();

    const onhambergerClick = () => {
        isHambergerClicked(!hambergerClicked);
    };

    useEffect(() => {
        function GetCurrentUserData() {
            getData(
                currentUserLink,
                { uid: currentUser },
                (onSuccess) => {
                    console.log(
                        onSuccess.data.customerData[0],
                        "currentUserDAta"
                    );
                    setCurrentUserData(onSuccess.data.customerData[0]);
                },
                (onFail) => {}
            );
        }

        if (isAuth) {
            GetCurrentUserData();
        }
    }, []);

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
                    {isAuth && currentUserData ? (
                        <ProfileAvatarLogout
                            userName={currentUserData.First_Name}
                            userId={currentUser}
                            userType={userType}
                        />
                    ) : (
                        <ProfileAvatarLogin />
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

function ProfileAvatarLogin() {
    return (
        <>
            <div data-toggle="dropdown" className="dropdown navbar-login">
                <FiUser />
            </div>

            <div className="dropdown-menu dropdown-menu-lg-right dropdown-menu-style">
                <a
                    className="dropdown-item  dropdown-item-style"
                    href="/account/login"
                >
                    Sign In
                </a>
                <a
                    className="dropdown-item dropdown-item-style"
                    href="/account/signup"
                    type="button"
                    data-toggle="modal"
                    data-target="#signup"
                >
                    {" "}
                    Sign Up
                </a>
            </div>
        </>
    );
}

function ProfileAvatarLogout({ userName, userId, userType }) {
    const history = useHistory();

    const onClickEdit_CustomerProfile = () => {
        history.push({ pathname: `/customer-profile/${userId}` });
    };

    const onClickEdit_MakerProfile = () => {
        history.push({ pathname: `/maker-profile/${userId}` });
    };

    const onclickLogout = () => {
        getDataWithNoParams(
            logout,
            (onSuccess) => {
                console.log(onSuccess, "logout");
                if (onSuccess.status === 202) {
                    history.push({ pathname: "/" });
                    history.go();
                }
            },
            (onFail) => {}
        );
    };

    return (
        <>
            <div data-toggle="dropdown" className="dropdown navbar-login">
                {userName.charAt(0)}
            </div>

            <div className="dropdown-menu dropdown-menu-lg-right dropdown-menu-style">
                <a
                    className="dropdown-item  dropdown-item-style"
                    onClick={
                        userType === "customer"
                            ? onClickEdit_CustomerProfile
                            : onClickEdit_MakerProfile
                    }
                >
                    <FiUser size="22px" />
                    <span className="ml-1">My Profile</span>
                </a>
                <a
                    className="dropdown-item dropdown-item-style"
                    onClick={onclickLogout}
                >
                    <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                </a>
            </div>
        </>
    );
}

// [
//     { name: "Sign In", link: "/login" },
//     { name: "Sign Up", link: "/signup" },
// ]
{
    /* <li className="dropdown nav-item">
    <a data-toggle="dropdown">
        <div className="icon-container">{username.charAt(0)}</div>
    </a>

    <ul className="dropdown-menu dropdown-menu-lg-right p-0">
        <li>
            <a
                className="dropdown-item p-2 pl-4"
                onClick={
                    userType === "customer"
                        ? onClickEditCustomerProfile
                        : onClickEditProfileMaker
                }
            >
                <FiUser size="22px" /> <span className="ml-1">My Profile</span>
            </a>
        </li>

        <li>
            <a className="dropdown-item p-2 pl-4 " onClick={onclickLogout}>
                <i className="fas fa-sign-out-alt mr-2"></i> Log Out
            </a>
        </li>
    </ul>
</li>; */
}
