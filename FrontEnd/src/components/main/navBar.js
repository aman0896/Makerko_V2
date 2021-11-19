import React, { Component, createRef } from 'react';
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Link, animateScroll as scroll } from 'react-scroll';
import axios from 'axios';
import './navbar.css';
import { FiUser } from 'react-icons/fi';

function LoginButton(props) {
    return (
        <li className="dropdown nav-item">
            <a data-toggle="dropdown">
                <div className="icon-container">
                    <FiUser />
                </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-lg-right">
                <li>
                    <a className="dropdown-item p-2 pl-5" href="/login">
                        Sign In
                    </a>
                </li>
                <li>
                    <a
                        className="dropdown-item p-2 pl-5"
                        href="/register"
                        type="button"
                        data-toggle="modal"
                        data-target="#signup"
                    >
                        {' '}
                        Sign Up
                    </a>
                </li>
            </ul>
        </li>
    );
}

function LogoutButton({ username, userID, userType }, props) {
    const history = useHistory();
    const onclickLogout = () => {
        axios.defaults.withCredentials = true;
        axios.post(`${window.host}/logout`).then((response) => {
            if (response.status === 202) {
                console.log(response, 'logout');
                history.push({ pathname: '/' });
                history.go();
            }
        });
    };

    const onClickEditCustomerProfile = () => {
        history.push({ pathname: `/${userID}/customer-profile` });
    };

    const onClickEditProfileMaker = () => {
        history.push({ pathname: `/${userID}/manufacturer-profile` });
    };
    return (
        <li className="dropdown nav-item">
            <a data-toggle="dropdown">
                <div className="icon-container">{username.charAt(0)}</div>
            </a>

            <ul className="dropdown-menu dropdown-menu-lg-right p-0">
                <li>
                    <a
                        className="dropdown-item p-2 pl-4"
                        onClick={
                            userType === 'customer'
                                ? onClickEditCustomerProfile
                                : onClickEditProfileMaker
                        }
                    >
                        <FiUser size="22px" />{' '}
                        <span className="ml-1">My Profile</span>
                    </a>
                </li>

                <li>
                    <a
                        className="dropdown-item p-2 pl-4 "
                        onClick={onclickLogout}
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                    </a>
                </li>
            </ul>
        </li>
    );
}

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageName: window.location.pathname,
            username: '',
            loggedIn: false,
            uid: '',
            manufacturerID: '',
            userType: '',
        };
    }
    onClickAboutUs = () => {
        console.log(this.props);
        this.props.history.push({ pathname: '/', data: 'aboutus' });
    };

    async componentDidMount() {
        var op = '===';
        var a = 'a';
        var b = 'b';
        const string = 'a' + op + 'b';
        console.log(eval(string), '......');
        const { currentUser, isAuth, userType } = this.props;
        this.setState({ userType: userType });
        var userInfo = undefined;
        if (currentUser && isAuth) {
            this.setState({ loggedIn: isAuth });
            if (currentUser) {
                await axios
                    .post(`${window.host}/get-user-info`, {
                        uid: currentUser,
                    })
                    .then((response) => {
                        if (response) {
                            userInfo = response.data;
                        }
                    });
            }
        }
        if (userInfo != undefined) {
            console.log(userInfo[0].Manufacturer_ID);
            if (userInfo[0].Manufacturer_ID) {
                const { Company_Name, Manufacturer_ID } = userInfo[0];
                this.setState({ username: Company_Name, uid: Manufacturer_ID });
            } else if (userInfo[0].Customer_ID) {
                const { First_Name, Customer_ID } = userInfo[0];
                this.setState({ username: First_Name, uid: Customer_ID });
            }
        }
    }

    onClickTitle = () => {
        this.props.history.push({ pathname: '/' });
        window.scrollTo({
            top: '-50',
            behavior: 'smooth',
        });
    };

    render() {
        const { color } = this.state;
        const isLoggedIn = this.state.loggedIn;
        let button;
        if (isLoggedIn) {
            button = (
                <LogoutButton
                    username={this.state.username}
                    userID={this.state.uid}
                    userType={this.state.userType}
                />
            );
        } else {
            button = <LoginButton onClick={this.props.onclick} />;
        }
        return (
            <nav className="navbar navbar-background p-0 fixed-top navbar-expand-xl navbar-button">
                <a className="navbar-brand" onClick={this.onClickTitle}>
                    <span
                        style={{
                            fontSize: '2rem',
                            marginLeft: '5rem',
                            cursor: 'pointer',
                            letterSpacing: '0.2px',
                        }}
                    >
                        MAKERKO
                    </span>
                </a>
                <button
                    type="button"
                    className="navbar-toggler navbar-toggler-right btn"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse justify-content-around align-items-center"
                    id="navbarSupportedContent"
                >
                    <div className="">
                        <ul className="navbar-nav" id="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    id="about"
                                    to="about-us"
                                    className="nav-link"
                                    spy={true}
                                    hashSpy={true}
                                    smooth={true}
                                    duration={500}
                                    offset={-50}
                                    activeClass={
                                        window.location.pathname == '/'
                                            ? 'active-link'
                                            : 'deactive-link'
                                    }
                                    style={{
                                        fontSize: '18px',
                                        letterSpacing: '0.2px',
                                    }}
                                    onClick={() => {
                                        this.onClickAboutUs();
                                    }}
                                >
                                    About
                                </Link>
                            </li>

                            <li className="nav-item">
                                <a
                                    id={
                                        window.location.pathname.includes(
                                            '/manufacturer-list'
                                        )
                                            ? 'active-link'
                                            : 'deactive-link'
                                    }
                                    className="nav-link"
                                    //activeStyle={{ color: 'black' }}
                                    style={{
                                        // color: 'white',
                                        fontSize: '18px',
                                        letterSpacing: '0.2px',
                                    }}
                                    href="/manufacturer-list"
                                >
                                    Manufacturing Hub
                                </a>
                            </li>

                            <li className="dropdown nav-item">
                                <a
                                    id={
                                        window.location.pathname ==
                                            '/feature-project' ||
                                        window.location.pathname.includes(
                                            '/feature'
                                        )
                                            ? 'active-link'
                                            : 'deactive-link'
                                    }
                                    className="nav-link  dropdown-toggle"
                                    href="/feature-project"
                                    data-toggle="dropdown"
                                    style={{
                                        // color: 'white',
                                        fontSize: '18px',
                                        letterSpacing: '0.2px',
                                    }}
                                >
                                    Feature Project
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a
                                            className="dropdown-item p-2 pl-4"
                                            href="/feature-project"
                                        >
                                            List of Projects
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item p-2 pl-4"
                                            href="/feature"
                                        >
                                            {' '}
                                            Add a project
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item mr-5">
                                <a
                                    id={
                                        window.location.pathname.includes(
                                            '/knowledgebank' || '/blog'
                                        ) ||
                                        window.location.pathname.includes(
                                            '/blog'
                                        )
                                            ? 'active-link'
                                            : 'deactive-link'
                                    }
                                    className="nav-link"
                                    style={{
                                        //  color: 'white',
                                        fontSize: '18px',
                                        letterSpacing: '0.2px',
                                    }}
                                    // activeStyle={{
                                    //     color: 'black',
                                    // }}
                                    href="/knowledgebank"
                                >
                                    Knowledge Bank
                                </a>
                            </li>
                            <li className="nav-item d-flex align-items-center quotebutton">
                                <button
                                    className="btn pt-2 pb-2 bg-white btn-nav"
                                    style={{
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        letterSpacing: '0.2px',
                                    }}
                                    data-toggle="modal"
                                    data-target="#placeOrderModal"
                                >
                                    Get A Quote
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <ul className="navbar-nav profile">
                            <li>{button}</li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
export default withRouter(NavBar);
