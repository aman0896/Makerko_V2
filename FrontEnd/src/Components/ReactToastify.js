import React, { Fragment } from "react";
import { ToastContainer, Bounce, toast, Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { colors } from "../Values/colors";

function ReactToastify() {
    return (
        <Fragment>
            <ToastContainer
                position="top-right"
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnHover
                transition={Slide}
            />
        </Fragment>
    );
}
export default ReactToastify;

export const Toast = (message, type, closeTime, color) => {
    switch (type) {
        case "error":
            toast.error(
                <div>
                    <i
                        style={{ fontSize: "1rem" }}
                        className="fas fa-exclamation-circle mr-2"
                    />
                    {message}
                </div>,
                {
                    autoClose: closeTime,
                    toastStyle: {
                        color: color ? color : colors.primary,
                    },
                }
            );
            break;
        case "info":
            toast.info(
                <div>
                    <i
                        style={{ fontSize: "1rem" }}
                        className="fas fa-info-circle mr-2"
                    />
                    {message}
                </div>,
                {
                    autoClose: closeTime,
                    toastStyle: {
                        color: color ? color : colors.primary,
                    },
                }
            );
            break;
        case "success":
            toast.success(
                <div>
                    <i
                        style={{ fontSize: "1rem" }}
                        className="fas fa-check-circle mr-2"
                    ></i>
                    {message}
                </div>,
                {
                    autoClose: closeTime,
                    toastStyle: {
                        color: color ? color : colors.primary,
                    },
                }
            );
            break;
        case "warning":
            toast.warning(message, {
                autoClose: closeTime,
                toastStyle: {
                    color: color ? color : colors.primary,
                },
            });
            break;
        case "dark":
            toast.dark(message, {
                autoClose: closeTime,
                toastStyle: {
                    color: color ? color : colors.primary,
                },
            });
            break;
        default:
            toast(message);
            break;
    }
};
