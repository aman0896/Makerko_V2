import axios from "axios";
import { Formik } from "formik";

import { useHistory, useLocation } from "react-router-dom";
import React from "react";
import Button from "../../components/global/Button";
import { PasswordField } from "../../components/global/TextBox";
import "../css/LoginPage.css";

export default function ResetPassword(props) {
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const email = query.get("email");

    return (
        <React.Fragment>
            <div className="loginPage">
                <div>
                    <div className="card card-body" id="loginCard">
                        <h3 className="text-center">Reset Password</h3>
                        <hr />
                        <div>
                            <Formik
                                initialValues={{
                                    password: "",
                                    confirm_password: "",
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.password) {
                                        errors.password = "Required";
                                    } else if (values.password.length < 6) {
                                        errors.password =
                                            "Password needs to be 6 characters or more";
                                    }
                                    if (!values.confirm_password) {
                                        errors.confirm_password = "Required";
                                    } else if (
                                        values.confirm_password !==
                                        values.password
                                    ) {
                                        errors.confirm_password =
                                            "Password do not match";
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        // console.log(values.email);
                                        axios
                                            .post(
                                                `${window.host}/new-password`,
                                                {
                                                    password: values.password,
                                                    confirm_password:
                                                        values.confirm_password,
                                                    email: email,
                                                }
                                            )
                                            .then((response) => {
                                                history.push({
                                                    pathname: "/login",
                                                });
                                                console.log(values.email);
                                            });
                                        setSubmitting(false);
                                    }, 100);
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                    /* and other goodies */
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row m-1 pb-1 d-flex align-items-center">
                                            <PasswordField
                                                type="password"
                                                placeholder="New password"
                                                name="password"
                                            />
                                        </div>
                                        <div className="row m-1 d-flex align-items-center">
                                            <PasswordField
                                                type="password"
                                                placeholder="Confirm Password"
                                                name="confirm_password"
                                            />
                                        </div>

                                        <Button
                                            btnName="Change Password"
                                            type="submit"
                                            disabled={isSubmitting}
                                            styleClass="btn  mt-3 w-100"
                                        />
                                    </form>
                                )}
                            </Formik>
                        </div>
                        <div className="row mt-3">
                            <a
                                className="col"
                                style={{ color: "#5044fd" }}
                                href="/login"
                            >
                                Back to Log In
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
