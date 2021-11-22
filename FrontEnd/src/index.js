import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// if (process.env.NODE_ENV === "production") {
//     console.log = function () {};
// }

ReactDOM.render(
    <div>
        <App />
    </div>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
