import React from "react";
import { colors } from "../Values/colors";

function VerificationSuccess() {
    return (
        <div className="container d-flex justify-content-center mt-5">
            <div
                style={{ width: "50%", textAlign: "center" }}
                className="jumbotron"
            >
                <div style={{ color: colors.success, fontSize: "1.2rem" }}>
                    <i class="fas fa-check-circle mr-3"></i>
                    <span>Your account has been verified successfully</span>
                </div>

                <div className="mt-3">
                    <a href="/account/login">Procceed to Login</a>
                </div>
            </div>
        </div>
    );
}

export default VerificationSuccess;
