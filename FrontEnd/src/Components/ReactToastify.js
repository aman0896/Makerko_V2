import React, { Fragment } from "react";
import { ToastContainer, Bounce, toast, Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { colors } from "../Values/colors";

function ReactToastify({ closeTime = 2000, textColor, message, type }) {
    switch (type) {
        case "error":
            toast.error(
                <div>
                    <i
                        style={{ fontSize: "1rem" }}
                        class="fas fa-exclamation-circle mr-2"
                    />
                    {message}
                </div>
            );
            break;
        case "info":
            toast.info(message);
            break;
        case "success":
            toast.success(
                <div>
                    <i
                        style={{ fontSize: "1rem" }}
                        class="fas fa-check-circle"
                    ></i>
                    {message}
                </div>
            );
            break;
        case "warning":
            toast.warning(message);
            break;
        case "dark":
            toast.dark(message);
            break;
        default:
            break;
    }

    return (
        <Fragment>
            <ToastContainer
                position="top-right"
                autoClose={closeTime}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnHover
                transition={Slide}
                toastStyle={{
                    color: textColor ? textColor : colors.primary,
                }}
            />
        </Fragment>
    );
}
export default ReactToastify;
