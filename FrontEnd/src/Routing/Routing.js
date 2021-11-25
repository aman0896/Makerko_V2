import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "../Components/NavBar";
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
            </Router>
        </div>
    );
}

export default Routing;
