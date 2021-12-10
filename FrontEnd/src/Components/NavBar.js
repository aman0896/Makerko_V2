import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import { FiUser } from "react-icons/fi";
import { getData, getDataWithNoParams } from "../commonApi/CommonApi";
import { currentUserLink, logout } from "../commonApi/Link";
import ModalChoice from "./modal/ModalChoice";
import { colors } from "../Values/colors";

function NavBar({ isAuth, currentUser, userType }) {
    console.log(typeof window.location.pathname, "Navbar path");
    console.log(isAuth, currentUser, userType, "data");
    const [hambergerClicked, isHambergerClicked] = useState(false);
    const [currentUserData, setCurrentUserData] = useState();
    const [path, setPath] = useState(window.location.pathname);

    const onhambergerClick = () => {
        isHambergerClicked(!hambergerClicked);
    };

    useEffect(() => {
        function GetCurrentUserData() {
            getData(
                currentUserLink,
                { uid: currentUser },
                (onSuccess) => {
                    setCurrentUserData(onSuccess.data.currentUserData[0]);
                },
                (onFail) => {}
            );
        }

        if (isAuth) {
            GetCurrentUserData();
        }
    }, []);

    const handleChangePath = (event) => {
        setPath(event.target.dataset.name);
    };

    return (
        <nav className={path === "/" ? "NavbarItems" : "PrimaryNavbarItems"}>
            <div className="navbar-container">
                <Link
                    className="navbar-logo"
                    onClick={handleChangePath}
                    to={{ pathname: "/" }}
                >
                    <h2
                        data-name="/"
                        className={path !== "/" ? "text-white" : ""}
                    >
                        Makerko
                    </h2>
                </Link>

                <div className="menu-icon" onClick={onhambergerClick}>
                    <i
                        className={
                            hambergerClicked ? "fas fa-times" : "fas fa-bars"
                        }
                        style={{
                            color: path === "/" ? colors.primary : colors.white,
                        }}
                    ></i>
                </div>
                <ul
                    className={
                        hambergerClicked ? "navbar-menu active" : "navbar-menu"
                    }
                >
                    <li>
                        <Link
                            // style={{
                            //     color:
                            //         path === "/"
                            //             ? colors.primary
                            //             : colors.white,
                            // }}
                            className={
                                path === "/"
                                    ? "navbar-links"
                                    : "whiteNavbar-links"
                            }
                            onClick={handleChangePath}
                            to={{ pathname: "/maker" }}
                        >
                            <label data-name="/maker">MAKERS</label>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={
                                path === "/"
                                    ? "navbar-links"
                                    : "whiteNavbar-links"
                            }
                            onClick={handleChangePath}
                        >
                            <label data-name="/project">PROJECT</label>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={
                                path === "/"
                                    ? "navbar-links"
                                    : "whiteNavbar-links"
                            }
                            onClick={handleChangePath}
                        >
                            <label data-name="/blogs">BLOGS</label>
                        </Link>
                    </li>
                </ul>

                <div>
                    {isAuth && currentUserData ? (
                        <ProfileAvatarLogout
                            userName={
                                userType === "maker"
                                    ? currentUserData.Company_Name
                                    : currentUserData.First_Name
                            }
                            userId={currentUser}
                            userType={userType}
                        />
                    ) : (
                        <ProfileAvatarLogin path={path} />
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

function ProfileAvatarLogin({ path }) {
    const [showModal, setShowModal] = useState(false);

    const showModalChoice = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const onClickClient = () => {
        window.location.href = "/account/signup";
    };

    const onClickMaker = () => {
        window.location.href = "/account/makers-signup";
    };
    return (
        <>
            <div
                data-toggle="dropdown"
                className="dropdown navbar-login"
                style={{
                    backgroundColor:
                        path === "/" ? colors.primary : colors.white,
                    color: path === "/" ? colors.white : colors.primary,
                }}
            >
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
                    onClick={showModalChoice}
                    type="button"
                >
                    Sign Up
                </a>
            </div>
            <ModalChoice
                show={showModal}
                handleClose={handleClose}
                onClickButton1={onClickClient}
                onClickButton2={onClickMaker}
                title="Sign Up as:"
                btnTitle1="Client"
                btnTitle2="Maker"
            />
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
