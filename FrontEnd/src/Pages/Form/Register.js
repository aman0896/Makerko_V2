import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { Formik } from "formik";
import FormTextBox, { PasswordField } from "../../components/global/TextBox";
import TermsAndPolicy from "../../components/Terms&Policy";
import "../css/RegistrationPage.css";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirm_password: "",
            error: "",
            isChecked: false,
            checkboxError: false,
        };
        this.handleChecked = this.handleChecked.bind(this);
    }
    handleChecked() {
        this.setState({
            isChecked: !this.state.isChecked,
            checkboxError: false,
        });
    }

    render() {
        const { email, password, error, isChecked, checkboxError } = this.state;

        return (
            <div className="row m-auto d-flex justify-content-center">
                <div className="col-lg-7 p-0 m-0">
                    <img
                        src="/assests/Client Signup.jpg"
                        style={{
                            width: "100%",
                            height: "115vh",
                            opacity: "1",
                        }}
                    />
                </div>
                <div
                    className="col-lg justify-content-center mb-4"
                    style={{ paddingRight: "90px", paddingLeft: "90px" }}
                >
                    <div>
                        <div className="row">
                            <div className="col-md p-0 m-1">
                                <div className="titleRegister">MAKERKO</div>
                                <div className="details mb-5">
                                    Enter your Details to get started
                                </div>
                                {error && (
                                    <div
                                        className="alert alert-warning alert-dismissible fade show"
                                        role="alert"
                                    >
                                        {error}
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="alert"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">
                                                &times;
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                firstName: "",
                                lastName: "",
                                phoneNumber: "",
                                confirm_password: "",
                                address: "",
                                isChecked: false,
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = "Required";
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                        values.email
                                    )
                                ) {
                                    errors.email = "Invalid email address";
                                }
                                if (!values.firstName) {
                                    errors.firstName = "Required";
                                }
                                if (!values.lastName) {
                                    errors.lastName = "Required";
                                }
                                if (!values.address) {
                                    errors.address = "Required";
                                }
                                if (!values.phoneNumber) {
                                    errors.phoneNumber = "Required";
                                }
                                if (values.password.length < 6) {
                                    errors.password =
                                        "Password must contain atleast 6 letters";
                                } else if (
                                    values.password !== values.confirm_password
                                ) {
                                    errors.confirm_password =
                                        "Password did not match";
                                } else if (!isChecked) {
                                    errors.isChecked =
                                        "Please accept the terms and conditions to continue.";
                                    this.setState({ checkboxError: true });
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    Axios.post(`${window.host}/register`, {
                                        firstName: values.firstName,
                                        lastName: values.lastName,
                                        password: values.password,
                                        email: values.email,
                                        phoneNumber: values.phoneNumber,
                                        address: values.address,
                                    }).then((response) => {
                                        if (response.data.message) {
                                            this.setState({
                                                error: response.data.message,
                                            });
                                        } else {
                                            const { hash } = response.data;
                                            this.props.history.push({
                                                pathname: `/verify`,
                                                search: `?email=${values.email}&hash=${hash}`,
                                                //send data to verify page
                                            });
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
                                handleSubmit,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md p-0 m-2">
                                            <div>
                                                <FormTextBox
                                                    placeholder="First name"
                                                    name="firstName"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md p-0 m-2">
                                            <div>
                                                <FormTextBox
                                                    placeholder="Last name"
                                                    name="lastName"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md p-0 m-2">
                                            <div>
                                                <FormTextBox
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    name="phoneNumber"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md p-0 m-2">
                                            <div>
                                                <div>
                                                    <FormTextBox
                                                        placeholder="Address"
                                                        name="address"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md p-0 m-2">
                                            <div>
                                                <FormTextBox
                                                    placeholder="Email Address"
                                                    name="email"
                                                    type="email"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md p-0 m-2">
                                            <PasswordField
                                                placeholder="Password"
                                                name="password"
                                                type="password"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md p-0 m-2">
                                            <PasswordField
                                                placeholder="Confirm Password"
                                                name="confirm_password"
                                                type="password"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md p-0 m-1 mt-3">
                                            <input
                                                type="checkbox"
                                                name="checkbox"
                                                className="ml-1 mr-1"
                                                style={{
                                                    width: "16px",
                                                    height: "16px",
                                                }}
                                                onChange={this.handleChecked}
                                            />
                                            <span
                                                style={{
                                                    fontSize: "15px",
                                                }}
                                            >
                                                I agree with
                                                <TermsAndPolicy
                                                    subject="Terms and Conditions"
                                                    file="/terms&policy/T&C.pdf"
                                                    type="pdf"
                                                    style={{
                                                        color: "#5044fd",
                                                        textDecoration:
                                                            "underline",
                                                    }}
                                                />
                                            </span>
                                            <div>
                                                <span className="text-danger  text-center">
                                                    {checkboxError &&
                                                        errors.isChecked &&
                                                        touched.isChecked &&
                                                        errors.isChecked}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md p-0 m-1">
                                            <div className="text-center">
                                                <button
                                                    disabled={isSubmitting}
                                                    className="signup btn float-right"
                                                    type="submit"
                                                    style={{
                                                        color: "white",
                                                    }}
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                        <div
                            className="row mt-1"
                            style={{
                                fontSize: "12px",
                                fontFamily: "Mulish",
                                lineHeight: "32px",
                                letterSpacing: "0.2px",
                            }}
                        >
                            <div className="col-md p-0 m-1 d-flex justify-content-end">
                                <span className="text-center">
                                    Already have an account ?
                                    <a
                                        href="Login"
                                        style={{
                                            color: "#5044fd",
                                        }}
                                    >
                                        <span>Sign In</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Register);
