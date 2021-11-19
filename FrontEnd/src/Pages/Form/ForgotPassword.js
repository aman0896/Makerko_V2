import axios from "axios";
import { Formik } from "formik";
import "../css/LoginPage.css";
import React, { useState } from "react";
import Button from "../../components/global/Button";
import FormTextBox from "../../components/global/TextBox";

export default function ForgotPassword(props) {
    const [error, setErrors] = useState();
    return (
        <React.Fragment>
            <div className="loginPage">
                <div>
                    <div className="card card-body" id="loginCard">
                        <h3
                            className="text-center"
                            style={{ color: "#5044fd" }}
                        >
                            Forget Password
                        </h3>
                        <hr />
                        {error && (
                            <div className="alert alert-warning" role="alert">
                                {error}
                            </div>
                        )}
                        <div>
                            <Formik
                                initialValues={{ email: "" }}
                                validate={(values) => {
                                    //this.setState({ email: values.email });
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = "Required email address";
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email
                                        )
                                    ) {
                                        errors.email = "Invalid email address";
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        axios
                                            .post(
                                                `${window.host}/reset-password`,
                                                {
                                                    email: values.email,
                                                    url: `${window.hostAddress}/reset-password/?email=${values.email}`,
                                                }
                                            )
                                            .then((response) => {
                                                if (response.data.message) {
                                                    setErrors(
                                                        response.data.message
                                                    );
                                                } else {
                                                    console.log("password");
                                                    setErrors(response.data);
                                                }
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
                                            <label className="font-weight-bold">
                                                Email:
                                            </label>
                                            <FormTextBox
                                                type="email"
                                                placeholder="Enter Email"
                                                name="email"
                                            />
                                        </div>

                                        <Button
                                            btnName="Reset Password Here"
                                            type="submit"
                                            disabled={isSubmitting}
                                            styleClass="btn mt-3 w-100"
                                        />
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
