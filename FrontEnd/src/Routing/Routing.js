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

function Routing({ isAuth, currentUser, userType }) {
  const auth = useSelector((state) => state.isAuth);
  return (
    <div>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <div className="wrapper flex-grow-1">
            <NavBar
              isAuth={auth.isAuth}
              currentUser={auth.currentUser}
              userType={auth.userType}
            />
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/account/login" component={Login} />
              <Route exact path="/account/signup" component={Signup} />
              <Route
                exact
                path="/account/makers-signup"
                component={MakersSignup}
              />
              <Route exact path="/account/verify" component={OTPVerification} />
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
                path="/profile/customer/edit"
                component={CustomerProfile}
              />
              <Route exact path="/get-quote" component={GetAQuote} />

              <Route
                exact
                path="/profile/maker/edit"
                component={MakersProfile}
              />
              <Route exact path="/maker" component={Maker} />
              <Route path="/profile/map" component={Map} />

              <Route
                path="/makersDetailView"
                component={MakersDetailViewPage}
              />
              <Route
                exact
                path="/account/makers-additionaldetails"
                component={AdditionalDetailsFillUp}
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
