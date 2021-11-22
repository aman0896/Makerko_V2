import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Main from "../Pages/LandingPage/Main";

function Routing() {
    return (
        <div>
            <Router>
                <NavBar />
                <Main />
            </Router>
        </div>
    );
}

export default Routing;
