import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FooterContainer from "../Components/Footer/FooterContainer";
import NavBar from "../Components/NavBar";
import ReactToastify from "../Components/ReactToastify";
import CreateFeatureProject from "../Pages/FeatureProject/CreateFeatureProject";
import GetAQuote from "../Pages/GetAQuote";
import Main from "../Pages/LandingPage/Main";
import Login from "../Pages/Login";
import MakersSignup from "../Pages/MakersSignup";
import OTPVerification from "../Pages/OTPVerification";
import CustomerProfile from "../Pages/Profile/CustomerProfile";
import Signup from "../Pages/Signup";
import VerificationSuccess from "../Pages/VerificationSuccess";
import MakersProfile from "../Pages/Profile/MakersProfile";
import { useSelector } from "react-redux";
import AdditionalDetailsFillUp from "../Pages/Maker/AdditionalDetailsFillUp";

import MakersDetailViewPage from "../Pages/Profile/MakersDetailViewPage";
import Map from "../Pages/Map/Map";
import Maker from "../Pages/Profile/Maker";
import MakersHub from "../Pages/Profile/MakersHub";
import Projects from "../Pages/FeatureProject/Projects";
import RequestDesign from "../Pages/RequestDesign";
import ProtectedRoute from "./PrivateRoute";
import CustomerOrderDetails from "../Pages/OrderDetails/CustomerOrderDetails";
import MakerOrderDetails from "../Pages/OrderDetails/MakerOrderDetails";
import DesignRequest from "../Pages/OrderDetails/DesignRequest";
import SideNavbar from "../Components/SideNavbar/SideNavbar";
import NoPageFoundErr from "../Pages/404ErrorPage";
import ProjectDetailViewPage from "../Pages/FeatureProject/ProjectDetailViewPage";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";
import MyProjects from "../Pages/Profile/MyProjects";
import MyBlogs from "../Pages/Profile/MyBlogs";
import ResetScrollPosition from "../Components/ResetScrollPosition";
import CreateProjectForm from "../Pages/FeatureProject/CreatureProjectForm";
import AboutUs from "../Pages/AboutUs";
import CustomerDetailViewPage from "../Pages/Profile/CustomerDetailViewPage";
import ImageCropperTest from "../Test/ImageCropper";
import ReactSelect from "../Test/ReactSelect";

function Routing() {
    const auth = useSelector((state) => state.isAuth);
    const [pathname, setPathname] = useState(window.location.pathname);
    console.log(pathname, "routing pathname");
    const path = useSelector((state) => state.pathname.pathname);
    console.log(path, " pathname");
    useEffect(() => {
        if (path) console.log(path, " pathname");
    }, [path]);

    return (
        <div>
            <Router>
                <ResetScrollPosition />
                <div className="d-flex flex-column min-vh-100">
                    <div className="wrapper flex-grow-1">
                        <NavBar
                            isAuth={auth.isAuth}
                            currentUser={auth.currentUser}
                            userType={auth.userType}
                            setPathname={setPathname}
                        />
                        <Switch>
                            <Route exact path="/" component={Main} />

                            {/* Test Route*/}
                            <Route
                                exact
                                path="/test/creatable"
                                component={ReactSelect}
                            />
                            {/* Test Route*/}

                            {/* public routing */}
                            <Route
                                exact
                                path="/account/login"
                                component={Login}
                            />
                            <Route
                                exact
                                path="/account/signup"
                                component={Signup}
                            />
                            <Route
                                exact
                                path="/account/makers-signup"
                                component={MakersSignup}
                            />
                            <Route
                                exact
                                path="/account/verify"
                                component={OTPVerification}
                            />
                            <Route
                                exact
                                path="/verify-success"
                                component={VerificationSuccess}
                            />
                            <Route
                                exact
                                path="/account/forgotpassword"
                                component={ForgotPassword}
                            />
                            <Route
                                exact
                                path="/account/resetpassword"
                                component={ResetPassword}
                            />
                            <Route
                                exact
                                path="/makers/hub"
                                component={MakersHub}
                            />
                            <Route exact path="/makers" component={Maker} />
                            <Route exact path="/makers/map" component={Map} />
                            <Route exact path="/blogs" component={AboutUs} />
                            <Route
                                exact
                                path="/makers/:id/:name"
                                component={MakersDetailViewPage}
                            />
                            <Route
                                exact
                                path="/customer/:id/:name"
                                component={CustomerDetailViewPage}
                            />
                            <Route
                                exact
                                path="/projects/:id/:name"
                                component={ProjectDetailViewPage}
                            />
                            <Route
                                exact
                                path="/projects"
                                component={Projects}
                            />
                            <Route
                                exact
                                path="/imageCropper"
                                component={ImageCropperTest}
                            />
                            <Route
                                exact
                                path="/create-project"
                                component={CreateProjectForm}
                            />
                            {/* public routing */}

                            <ProtectedRoute
                                path="/CreateFeatureProject"
                                exact
                                component={CreateFeatureProject}
                                isAuth={auth.isAuth}
                                redirectionPage="/account/login"
                            />
                            <ProtectedRoute
                                path="/get-quote"
                                exact
                                component={GetAQuote}
                                isAuth={auth.isAuth}
                                redirectionPage="/account/login"
                            />
                            <ProtectedRoute
                                exact
                                path="/request-design"
                                component={RequestDesign}
                                isAuth={auth.isAuth}
                                redirectionPage="/account/login"
                            />
                            {/* ProtectedRoute with sidebar */}
                            {pathname !== null &&
                                pathname.includes("/profile") && (
                                    <div className="profile_view">
                                        <div className="sidebar_section">
                                            <SideNavbar
                                                usertype={auth.userType}
                                                setPathname={setPathname}
                                            />
                                        </div>
                                        <div className="profile_section">
                                            <Switch>
                                                <ProtectedRoute
                                                    path="/profile/myprojects"
                                                    exact
                                                    component={MyProjects}
                                                    isAuth={auth.isAuth}
                                                    redirectionPage="/account/login"
                                                />
                                                <ProtectedRoute
                                                    exact
                                                    path="/profile/request_design"
                                                    component={DesignRequest}
                                                    isAuth={auth.isAuth}
                                                    redirectionPage="/account/login"
                                                />
                                                {auth.userType &&
                                                    auth.userType ===
                                                        "customer" && (
                                                        <Fragment>
                                                            <Switch>
                                                                <ProtectedRoute
                                                                    path="/profile/customer/edit"
                                                                    exact
                                                                    component={
                                                                        CustomerProfile
                                                                    }
                                                                    isAuth={
                                                                        auth.isAuth
                                                                    }
                                                                    redirectionPage="/account/login"
                                                                />
                                                                <ProtectedRoute
                                                                    exact
                                                                    path="/profile/order"
                                                                    component={
                                                                        CustomerOrderDetails
                                                                    }
                                                                    isAuth={
                                                                        auth.isAuth
                                                                    }
                                                                    redirectionPage="/account/login"
                                                                />
                                                                <Route
                                                                    component={
                                                                        NoPageFoundErr
                                                                    }
                                                                />
                                                            </Switch>
                                                        </Fragment>
                                                    )}
                                                {auth.userType &&
                                                    auth.userType ===
                                                        "maker" && (
                                                        <Fragment>
                                                            <Switch>
                                                                <ProtectedRoute
                                                                    path="/profile/makers/additionaldetails"
                                                                    exact
                                                                    component={
                                                                        AdditionalDetailsFillUp
                                                                    }
                                                                    isAuth={
                                                                        auth.isAuth
                                                                    }
                                                                    redirectionPage="/account/login"
                                                                />
                                                                <ProtectedRoute
                                                                    path="/profile/makers/edit"
                                                                    exact
                                                                    component={
                                                                        MakersProfile
                                                                    }
                                                                    isAuth={
                                                                        auth.isAuth
                                                                    }
                                                                    redirectionPage="/account/login"
                                                                />
                                                                <ProtectedRoute
                                                                    exact
                                                                    path="/profile/makers/order"
                                                                    component={
                                                                        MakerOrderDetails
                                                                    }
                                                                    isAuth={
                                                                        auth.isAuth
                                                                    }
                                                                    redirectionPage="/account/login"
                                                                />
                                                                <ProtectedRoute
                                                                    path="/profile/makers/myblogs"
                                                                    exact
                                                                    component={
                                                                        MyBlogs
                                                                    }
                                                                    isAuth={
                                                                        auth.isAuth
                                                                    }
                                                                    redirectionPage="/account/login"
                                                                />
                                                                <Route
                                                                    component={
                                                                        NoPageFoundErr
                                                                    }
                                                                />
                                                            </Switch>
                                                        </Fragment>
                                                    )}
                                            </Switch>
                                        </div>
                                    </div>
                                )}

                            {/* ProtectedRoute with sidebar */}
                            <Route component={NoPageFoundErr} />
                        </Switch>
                    </div>
                    <FooterContainer />
                </div>
            </Router>
            <ReactToastify />
        </div>
    );
}

export default Routing;
