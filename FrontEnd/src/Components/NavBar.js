import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import { FiUser } from "react-icons/fi";
import { getDataWithNoParams } from "../commonApi/CommonApi";
import { logout, webDomain } from "../commonApi/Link";
import ModalChoice from "./modal/ModalChoice";
import { colors } from "../Values/colors";

import { useDispatch, useSelector } from "react-redux";
import { useWindowDimensions } from "../functions/Functions";
import { SET_LOCATION_PATHNAME } from "./Redux/Actions/Types";

function NavBar({ isAuth, currentUser, userType, setPathname }) {
    const { width, height } = useWindowDimensions();
    const [hambergerClicked, isHambergerClicked] = useState(false);
    const [path, setPath] = useState(window.location.pathname);
    // const [currentUserData, setCurrentUserData] = useState();

    useEffect(() => {
        setPath(window.location.pathname);
        setPathname(window.location.pathname);
    }, [window.location.pathname]);

    const onhambergerClick = () => {
        isHambergerClicked(!hambergerClicked);
    };

    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );

    const handleChangePath = (event) => {
        setPath(event.target.dataset.name);
    };

    useEffect(() => {
        console.log(path, "path");
    }, [path]);

    return (
        <nav
            className={
                path === undefined || path === "/"
                    ? "NavbarItems"
                    : "PrimaryNavbarItems"
            }
        >
            <div className="navbar-container">
                <Link
                    className="navbar-logo"
                    onClick={handleChangePath}
                    to={{ pathname: "/" }}
                >
                    <div
                        data-name="/"
                        className={path !== "/" ? "text-white" : ""}
                    >
                        <img
                            src={`${webDomain}/assests/logo-05@2x.png`}
                            style={{ width: 200 }}
                            alt=""
                        />
                    </div>
                </Link>

                <div className="menu-icon" onClick={onhambergerClick}>
                    <i
                        className={
                            hambergerClicked ? "fas fa-times" : "fas fa-bars"
                        }
                        style={{
                            color:
                                path === undefined || path === "/"
                                    ? colors.primary
                                    : colors.white,
                        }}
                    ></i>
                </div>
                <ul
                    className={
                        hambergerClicked ? "navbar-menu active" : "navbar-menu"
                    }
                    style={{
                        backgroundColor:
                            path === undefined || path === "/"
                                ? colors.white
                                : colors.primary,
                    }}
                    onClick={onhambergerClick}
                >
                    <li>
                        <Link
                            style={{
                                backgroundColor:
                                    path && path.startsWith("/makers")
                                        ? colors.white
                                        : "",
                                color:
                                    path && path.startsWith("/makers")
                                        ? colors.primary
                                        : "",
                                borderRadius: 5,
                            }}
                            className={
                                path === undefined || path === "/"
                                    ? "navbar-links"
                                    : "whiteNavbar-links"
                            }
                            onClick={handleChangePath}
                            to={{ pathname: "/makers" }}
                        >
                            <label data-name="/makers">MAKERS</label>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{
                                backgroundColor:
                                    path && path.startsWith("/projects")
                                        ? colors.white
                                        : "",
                                color:
                                    path && path.startsWith("/projects")
                                        ? colors.primary
                                        : "",
                                borderRadius: 5,
                            }}
                            className={
                                path === undefined || path === "/"
                                    ? "navbar-links"
                                    : "whiteNavbar-links"
                            }
                            onClick={handleChangePath}
                            to={{ pathname: "/projects" }}
                        >
                            <label data-name="/projects">PROJECT</label>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{
                                backgroundColor:
                                    path && path.startsWith("/blogs")
                                        ? colors.white
                                        : "",
                                color:
                                    path && path.startsWith("/blogs")
                                        ? colors.primary
                                        : "",
                                borderRadius: 5,
                            }}
                            className={
                                path === undefined || path === "/"
                                    ? "navbar-links"
                                    : "whiteNavbar-links"
                            }
                            onClick={handleChangePath}
                            to={{ pathname: "/blogs" }}
                        >
                            <label data-name="/blogs">BLOGS</label>
                        </Link>
                    </li>
                </ul>

                <div>
                    {isAuth && currentUserData !== null ? (
                        <ProfileAvatarLogout
                            userName={
                                userType === "maker"
                                    ? currentUserData.Company_Name
                                    : `${currentUserData.First_Name}.${currentUserData.Last_Name}`
                            }
                            userId={currentUser}
                            userType={userType}
                            path={path}
                            handleChangePath={handleChangePath}
                        />
                    ) : (
                        <ProfileAvatarLogin
                            path={path}
                            handleChangePath={handleChangePath}
                        />
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

function ProfileAvatarLogin({ path, handleChangePath = { handleChangePath } }) {
    const [showModal, setShowModal] = useState(false);

    const showModalChoice = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const onClickClient = (event) => {
        handleChangePath(event);
        window.location.href = "/account/signup";
    };

    const onClickMaker = (event) => {
        handleChangePath(event);
        window.location.href = "/account/makers-signup";
    };
    return (
        <>
            <div
                data-toggle="dropdown"
                className="dropdown navbar-login"
                style={{
                    backgroundColor:
                        path === undefined || path === "/"
                            ? colors.primary
                            : colors.white,
                    color:
                        path === undefined || path === "/"
                            ? colors.white
                            : colors.primary,
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

function ProfileAvatarLogout({
    userName,
    userId,
    userType,
    path,
    handleChangePath,
}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const onClickEdit_CustomerProfile = (event) => {
        handleChangePath(event);
        // history.push({ pathname: "/profile/customer/edit" });
        window.open(`/customer/${userId}/${userName}`, "_blank");
    };

    const onClickEdit_MakerProfile = (event) => {
        handleChangePath(event);
        // history.push({ pathname: "/profile/makers/edit" });
        // dispatch({
        //     type: SET_LOCATION_PATHNAME,
        //     pathname: "/profile/customer/edit",
        // });

        window.open(`/makers/${userId}/${userName}`, "_blank");
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
            <div
                data-toggle="dropdown"
                className="dropdown navbar-login text-uppercase"
                style={{
                    backgroundColor:
                        path === undefined || path === "/"
                            ? colors.primary
                            : colors.white,
                    color:
                        path === undefined || path === "/"
                            ? colors.white
                            : colors.primary,
                }}
            >
                {userName.charAt(0)}
            </div>

            <div
                className="dropdown-menu dropdown-menu-lg-right dropdown-menu-style"
                // style={{
                //     backgroundColor:
                //         path === "/" ? colors.primary : colors.white,
                //     color: path === "/" ? colors.white : colors.primary,
                // }}
            >
                <a
                    href
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
                    href
                    className="dropdown-item dropdown-item-style"
                    onClick={onclickLogout}
                >
                    <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                </a>
            </div>
        </>
    );
}
