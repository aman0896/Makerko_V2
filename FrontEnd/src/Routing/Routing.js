import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FooterContainer from "../Components/Footer/FooterContainer";
import NavBar from "../Components/NavBar";
import Main from "../Pages/LandingPage/Main";
import Login from "../Pages/Login";
import MakersSignup from "../Pages/MakersSignup";
import OTPVerification from "../Pages/OTPVerification";
import Signup from "../Pages/Signup";
import VerificationSuccess from "../Pages/VerificationSuccess";

function Routing({ isAuth, currentUser, userType }) {
    return (
        <div>
            <Router>
                <NavBar
                    isAuth={isAuth}
                    currentUser={currentUser}
                    userType={userType}
                />
                <Switch>
                    {/* <Main /> */}
                    <Route exact path="/" component={Main} exact />
                    <Route exact path="/account/login" component={Login} />
                    <Route exact path="/account/signup" component={Signup} />
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
                </Switch>
                <FooterContainer />
            </Router>
        </div>
    );
}

export default Routing;
