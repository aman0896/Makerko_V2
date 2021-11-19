import { Formik } from "formik";
import React, { Component } from "react";
import axios from "axios";
import FormTextBox, { PasswordField } from "../../components/global/TextBox";
import { toast } from "react-toastify";

import "../css/RegistrationPage.css";
import { withRouter } from "react-router-dom";
import ReactToastify from "../../components/ReactToastify";

class Login extends Component {
    state = {
        email: "",
        password: "",
        error: null,
        users: null,
        hidden: true,
        flag: "",
        loggedInStatus: "",
    };

    onClickVerify = (event) => {
        event.preventDefault();
        axios
            .post(`${window.host}/verify-login`, {
                email: this.state.email,
            })
            .then((response) => {
                if (response.data) {
                    const { hash, message } = response.data;
                    toast(message);
                    setTimeout(() => {
                        this.props.history.push({
                            pathname: `/verify`,
                            search: `?email=${this.state.email}&hash=${hash}`,
                        });
                        this.props.history.go(0);
                    }, 2000);
                }
            });
    };

    // async componentDidMount() {
    //     const data = await GetCookiesInfo().then((response) => {
    //         console.log('line39', response);
    //         if (response.data) {
    //             return response.data;
    //         }
    //     });
    //     console.log('login', data);
    //     if (data) {
    //         this.props.history.push({ pathname: '/' });
    //     }
    // }

    render() {
        const { error, hidden, props } = this.state;
        const { match } = this.props;
        const url = match.path;
        return (
            <div style={{ height: window.innerHeight - 48 }}>
                <div className="row m-auto d-flex justify-content-center h-100">
                    <div className="col-lg-7 p-0 m-0">
                        <img
                            src="assests/Client Login.jpg"
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </div>
                    <div className="col-lg d-flex justify-content-center mb-4">
                        <div>
                            <div
                                className="titleRegister m-2 mt-5"
                                style={{ paddingBottom: "50px" }}
                            >
                                MAKERKO
                            </div>
                            {error && (
                                <div
                                    className="alert alert-warning m-2"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}

                            <Formik
                                initialValues={{
                                    email: "",
                                    password: "",
                                }}
                                validate={(values) => {
                                    this.setState({
                                        email: values.email,
                                    });
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
                                    if (!values.password) {
                                        errors.password = "Required";
                                    } else if (values.password.length < 6) {
                                        errors.password =
                                            "Password must contain atleast 6 letters";
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        axios
                                            .post(`${window.host}/login`, {
                                                email: values.email,
                                                password: values.password,
                                            })
                                            .then((response) => {
                                                if (response.data) {
                                                    const {
                                                        userLoggedIn,
                                                        userVerified,
                                                    } = response.data;
                                                    if (
                                                        userLoggedIn &&
                                                        userVerified
                                                    ) {
                                                        toast(
                                                            "Login Successful"
                                                        );
                                                        setTimeout(() => {
                                                            this.props.history.push(
                                                                {
                                                                    pathname:
                                                                        "/",
                                                                    data: {
                                                                        message:
                                                                            "Login Successful",
                                                                    },
                                                                }
                                                            );
                                                            this.props.history.go();
                                                        }, 1000);
                                                    } else if (
                                                        !userLoggedIn &&
                                                        userVerified ==
                                                            undefined
                                                    ) {
                                                        this.setState({
                                                            error: "email or password do not match",
                                                        });
                                                    } else if (
                                                        !userVerified &&
                                                        userLoggedIn ==
                                                            undefined
                                                    ) {
                                                        this.setState({
                                                            error: "Email not verified",
                                                            hidden: false,
                                                            email: values.email,
                                                        });
                                                    }
                                                }
                                            });
                                        setSubmitting(false);
                                    }, 0);
                                }}
                            >
                                {({
                                    handleSubmit,
                                    isSubmitting,
                                    /* and other goodies */
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row login">
                                            <div className="col-md  m-2">
                                                <div>
                                                    <FormTextBox
                                                        type="email"
                                                        placeholder="Enter Email"
                                                        name="email"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row login">
                                            <div className="col-md  m-2">
                                                <div>
                                                    <PasswordField
                                                        type="password"
                                                        placeholder="Enter Password"
                                                        name="password"
                                                        style={{
                                                            paddingRight:
                                                                "50px",
                                                            height: "50px",
                                                        }}
                                                    />
                                                </div>
                                            </div>{" "}
                                        </div>
                                        <div className="m-1 small justify-content-start">
                                            Forget your password?{" "}
                                            <a
                                                className="font-weight-bold"
                                                href={`${url}/identity`}
                                                style={{ color: "#5044fd" }}
                                            >
                                                {" "}
                                                Reset it Here
                                            </a>
                                        </div>
                                        <div className="d-flex justify-content-center m-3">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="btn mt-4"
                                                style={{
                                                    color: "white",
                                                    backgroundColor: "#5044FD",
                                                }}
                                            >
                                                Sign In
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                            <span
                                className="text-center  d-flex justify-content-center"
                                style={{ color: "#5044fd" }}
                            >
                                <p
                                    type="button"
                                    hidden={hidden}
                                    onClick={this.onClickVerify}
                                >
                                    Click here to verify
                                </p>
                            </span>

                            <div className="d-flex justify-content-center mt-3">
                                <div className="text-center small">
                                    Do not have an account?{" "}
                                    <a
                                        type="button"
                                        className="font-weight-bold"
                                        data-toggle="modal"
                                        data-target="#signup"
                                        style={{ color: "#5044fd" }}
                                    >
                                        Sign up
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactToastify closeTime={1000} />
            </div>
        );
    }
}

export default withRouter(Login);
