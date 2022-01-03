import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";
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
import FileUpload from "../Test/FileUpload";
import MultipleFileUpload from "../Test/MUltipleFileUpload";
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

function Routing({ isAuth, currentUser, userType }) {
    const auth = useSelector((state) => state.isAuth);
    // const pathname = useSelector((state) => state.pathname);
    const [pathname, setPathname] = useState(window.location.pathname);
    console.log(pathname, "routing pathname");
    return (
        <div>
            <Router>
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
                                            <ProtectedRoute
                                                path="/profile/customer/edit"
                                                exact
                                                component={CustomerProfile}
                                                isAuth={auth.isAuth}
                                            />
                                            <ProtectedRoute
                                                path="/profile/makers/additionaldetails"
                                                exact
                                                component={
                                                    AdditionalDetailsFillUp
                                                }
                                                isAuth={auth.isAuth}
                                                redirectionPage="/"
                                            />
                                            <ProtectedRoute
                                                path="/profile/makers/edit"
                                                exact
                                                component={MakersProfile}
                                                isAuth={auth.isAuth}
                                                redirectionPage="/"
                                            />
                                            <Route
                                                exact
                                                path="/profile/order"
                                                component={CustomerOrderDetails}
                                            />
                                            <Route
                                                exact
                                                path="/profile/request_design"
                                                component={DesignRequest}
                                            />
                                            <Route
                                                exact
                                                path="/profile/maker/:id/order"
                                                component={MakerOrderDetails}
                                            />
                                        </div>
                                    </div>
                                )}

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

                            <ProtectedRoute
                                path="/CreateFeatureProject"
                                exact
                                component={CreateFeatureProject}
                                isAuth={auth.isAuth}
                                redirectionPage="/"
                            />
                            {/* <Route
                                exact
                                path="/new-project"
                                component={CreateFeatureProject}
                            /> */}
                            {/* <Route exact path="/file" component={FileUpload} /> */}
                            {/* <ProtectedRoute
                                path="/profile/customer/edit"
                                exact
                                component={CustomerProfile}
                                isAuth={auth.isAuth}
                                redirectionPage="/"
                            /> */}
                            <ProtectedRoute
                                path="/get-quote"
                                exact
                                component={GetAQuote}
                                isAuth={auth.isAuth}
                                redirectionPage="/"
                            />
                            {/* <ProtectedRoute
                                path="/profile/makers/edit"
                                exact
                                component={MakersProfile}
                                isAuth={auth.isAuth}
                                redirectionPage="/"
                            /> */}
                            {/* <ProtectedRoute
                                path="/makers/hub"
                                exact
                                component={MakersHub}
                                isAuth={auth.isAuth}
                                redirectionPage="/"
                            /> */}
                            {/* <ProtectedRoute
                                path="/profile/makers/additionaldetails"
                                exact
                                component={AdditionalDetailsFillUp}
                                isAuth={auth.isAuth}
                                redirectionPage="/"
                            /> */}
                            <Route
                                exact
                                path="/request-design"
                                component={RequestDesign}
                            />

                            {/* <Route
                                exact
                                path="/profile/customer/edit"
                                component={CustomerProfile}
                            /> */}

                            {/* <Route
                                exact
                                path="/get-quote"
                                component={GetAQuote}
                            /> */}

                            {/* <Route
                                exact
                                path="/profile/makers/edit"
                                component={MakersProfile}
                            /> */}
                            <Route
                                exact
                                path="/makers/hub"
                                component={MakersHub}
                            />
                            <Route exact path="/makers" component={Maker} />
                            <Route path="/makers/map" component={Map} />

                            <Route
                                path="/makers/:id/:name"
                                component={MakersDetailViewPage}
                            />
                            {/* <Route
                                exact
                                path="/account/makers-additionaldetails"
                                component={AdditionalDetailsFillUp}
                            /> */}
                            <Route
                                exact
                                path="/projects"
                                component={Projects}
                            />
                            {/* <Route
                                exact
                                path="profile/:id/order"
                                component={CustomerOrderDetails}
                            />
                            <Route
                                exact
                                path="profile/:id/request_design"
                                component={DesignRequest}
                            />
                            <Route
                                exact
                                path="/profile/maker/:id/order"
                                component={MakerOrderDetails}
                            /> */}
                            {/* <Route path="/sidebar" component={SideNavbar} /> */}
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
