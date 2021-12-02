import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../Values/colors";
import "./NavBar.css";
import { FiUser } from "react-icons/fi";
import { getData } from "../commonApi/CommonApi";
import { currentUserLink } from "../commonApi/Link";
import ModalChoice from "./modal/ModalChoice";

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
          console.log(onSuccess.data.customerData[0], "currentUserDAta");
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
        <Link className="navbar-logo" to={{ pathname: "/" }}>
          <h2>Makerko</h2>
        </Link>

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
          {isAuth ? (
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
  return (
    <>
      <div data-toggle="dropdown" className="dropdown navbar-login">
        {userName.charAt(0)}
      </div>

      <div className="dropdown-menu dropdown-menu-lg-right dropdown-menu-style">
        <a
          className="dropdown-item  dropdown-item-style"
          // onClick={
          // userType === "customer"
          //     ? onClickEditCustomerProfile
          //     : onClickEditProfileMaker
          // }
        >
          <FiUser size="22px" />
          <span className="ml-1">My Profile</span>
        </a>
        <a
          className="dropdown-item dropdown-item-style"
          // onClick={onclickLogout}
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
