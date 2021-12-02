import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Main from "../Pages/LandingPage/Main";
import Login from "../Pages/Login";
import MakersRegister from "../Pages/MakersRegister";
import Register from "../Pages/Register";
// import FooterContainer from "../Components/Footer/Footer";
import FeatureProjectAdd from "../Pages/FeatureProject/FeatureProjectAdd";

function Routing() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          {/* <Main /> */}
          <Route path="/" component={Main} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/makers-register" component={MakersRegister} />
          <Route path="/project-add" component={FeatureProjectAdd} />
        </Switch>
        {/* <Main /> */}
      </Router>
    </div>
  );
}

export default Routing;
