import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Main from "../Pages/LandingPage/Main";
import Login from "../Pages/Login";
import MakersRegister from "../Pages/MakersRegister";
import Register from "../Pages/Register";

function Routing() {
    return (
        <div>
            <Router>
                <NavBar />
                <Main />
                <Switch>
                    {/* <Main /> */}
                    <Route path="/" component={Main} exact />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/makers-register" component={MakersRegister} />
                </Switch>
            </Router>
        </div>
    );
}

export default Routing;
