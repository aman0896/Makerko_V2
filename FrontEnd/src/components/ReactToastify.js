import React, { Fragment } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReactToastify({ closeTime = 2000, color }) {
    return (
        <Fragment>
            <ToastContainer
                position="top-right"
                autoClose={closeTime}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
                transition={Bounce}
                toastStyle={{
                    color: color ? color : "#5044fd",
                }}
            />
        </Fragment>
    );
}
export default ReactToastify;
