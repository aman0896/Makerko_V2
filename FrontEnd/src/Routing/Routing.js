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
import MakersProfile from "../Pages/Profile/MakersProfile";
import MakerkoHubList from "../Pages/ListPage";
import BlogPage from "../Pages/BlogPage";

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
                    <Route exact path="/" component={Main} />
                    <Route exact path="/makerko-hub" component={MakerkoHubList} />
                    <Route exact path="/blog" component={BlogPage} />
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
                    <Route
                        exact
                        path="/new-project"
                        component={CreateFeatureProject}
                    />
                    <Route exact path="/file" component={FileUpload} />
                    <Route
                        exact
                        path="/profile/customer"
                        component={CustomerProfile}
                    />
                    <Route exact path="/get-quote" component={GetAQuote} />

                    <Route
                        exact
                        path="/profile/maker"
                        component={MakersProfile}
                    />
                </Switch>
            </Router>
            <ReactToastify />
        </div>
    );
}

export default Routing;
