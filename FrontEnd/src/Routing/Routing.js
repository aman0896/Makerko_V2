import React from "react";
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

function Routing({ isAuth, currentUser, userType }) {
    // const auth = useSelector((state) => state.isAuth);
    console.log("Auth");
    // console.log(auth, "Auth");
    const auth=""
    return (
        <div>
            <Router>
                <div className="d-flex flex-column min-vh-100">
                    <div className="wrapper flex-grow-1">
                        <NavBar
                            // isAuth={auth.isAuth}
                            // currentUser={auth.currentUser}
                            // userType={auth.userType}
                        />
                        <Switch>
                            <Route exact path="/" component={Main} />
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
                            <ProtectedRoute
                                path="/profile/customer/edit"
                                exact
                                component={CustomerProfile}
                                isAuth={auth.isAuth}
                                redirectionPage="/"
                            />
                            <ProtectedRoute
                                path="/get-quote"
                                exact
                                component={GetAQuote}
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
                            {/* <ProtectedRoute
                                path="/makers/hub"
                                exact
                                component={MakersHub}
                                isAuth={auth.isAuth}
                                redirectionPage="/"
                            /> */}
                            <ProtectedRoute
                                path="/profile/makers/additionaldetails"
                                exact
                                component={AdditionalDetailsFillUp}
                                isAuth={auth.isAuth}
                                redirectionPage="/"
                            />
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
