import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Main from "../Pages/LandingPage/Main";
import FooterContainer from "../Components/Footer/Footer";

function Routing() {
    return (
        <div>
            <Router>
                <NavBar />
                <Main />
                <FooterContainer />
            </Router>
        </div>
    );
}

export default Routing;
