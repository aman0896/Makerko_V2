import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import { FiUser } from "react-icons/fi";
import { getData, getDataWithNoParams } from "../commonApi/CommonApi";
import { logout } from "../commonApi/Link";
import ModalChoice from "./modal/ModalChoice";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUserdata } from "./Redux/Actions/CurrentUserdata";

function NavBar({ isAuth, currentUser, userType }) {
  const dispatch = useDispatch();
  const [hambergerClicked, isHambergerClicked] = useState(false);
  // const [currentUserData, setCurrentUserData] = useState();

  const onhambergerClick = () => {
    isHambergerClicked(!hambergerClicked);
  };

  const currentUserData = useSelector(
    (state) => state.currentUserdata.currentUserdata
  );

  useEffect(() => {
    if (isAuth) {
      CurrentUserdata(dispatch, currentUser);
    }
  }, []);

  return (
    <nav className="NavbarItems">
      <div className="navbar-container">
        {/* <Link className="navbar-logo" to={{ pathname: "/" }}>
                    <h2>Makerko</h2>
                </Link> */}

        <div className="menu-icon" onClick={onhambergerClick}>
          <i className={hambergerClicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={hambergerClicked ? "navbar-menu active" : "navbar-menu"}>
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
          {isAuth && currentUserData !== null ? (
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
            <ProfileAvatarLogin />
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

function ProfileAvatarLogin() {
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
      <div data-toggle="dropdown" className="dropdown navbar-login">
        <FiUser />
      </div>

      <div className="dropdown-menu dropdown-menu-lg-right dropdown-menu-style">
        <a className="dropdown-item  dropdown-item-style" href="/account/login">
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
