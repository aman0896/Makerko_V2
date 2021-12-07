import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Profile from "../Pages/Hubs/Profile";
import Main from "../Pages/LandingPage/Main";
import Map from "../Pages/Map/Map";

function Routing() {
    return (
        <div>
            <Router>
                <NavBar />
                {/* <Main /> */}
                <Route path="/home" component={Main} />
                <Route path="/" component={Map} />
                {/* <Route path="/" component={Profile} /> */}
            </Router>
        </div>
    );
}

export default Routing;
