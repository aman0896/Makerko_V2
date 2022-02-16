import React, { useState } from "react";
import { useHistory } from "react-router";
import FormikComponent from "../Components/formik/FormikComponent";
import FormikController from "../Components/formik/FormikController";
import "./Login.css";
import { colors } from "../Values/colors";
import { SignupValidationSchema } from "./Form/ValidationSchema";
import { postData } from "../commonApi/CommonApi";
import { signup } from "../commonApi/Link";
import { Toast } from "../Components/ReactToastify";

const InitialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    password: "",
    confirm_password: "",
    termsCondition: false,
};

function Signup() {
    const history = useHistory();

    const handleSubmit = (values) => {
        console.log(values, "values");
        postData(
            signup,
            values,
            (onSuccess) => {
                if (onSuccess.data.emailExist === true) {
                    Toast("Email already exits", "error", 3000, colors.white);
                    return;
                }
                const { hash } = onSuccess.data;
                history.push({
                    state: {
                        message:
                            "Your request to join the platform has been submitted. Please check your inbox or spam folder in your email for the OTP.",
                    },
                    pathname: `/account/verify`,
                    search: `?email=${values.email}&hash=${hash}`,
                    //send data to verify page
                });
            },
            (onFail) => {}
        );
    };
    return (
        <div
            style={{
                height: window.innerHeight - 80,
            }}
        >
            <div className="row m-0 h-100">
                <div className="col-lg-7 m-0 p-0">
                    <img
                        src="/assests/Register.png"
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </div>
                <div className="col-lg-4 mx-5 section">
                    <div className="d-flex justify-content-center h-100 flex-column">
                        <img
                            src="/assests/Title.png"
                            style={{
                                width: 180,
                                // height: 19,
                            }}
                        />
                        <div className="sub-title">
                            Enter your details to get started
                        </div>
                        <div className="">
                            <FormikComponent
                                initialValues={InitialValues}
                                onSubmit={handleSubmit}
                                validationSchema={SignupValidationSchema}
                            >
                                <div className="row">
                                    <div className="col-lg">
                                        <FormikController
                                            name="firstName"
                                            control="input"
                                            placeholder="First Name"
                                            type="text"
                                        />
                                    </div>
                                    <div className="col-lg">
                                        <FormikController
                                            name="lastName"
                                            control="input"
                                            placeholder="Last Name"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg">
                                        <FormikController
                                            name="phoneNumber"
                                            control="input"
                                            placeholder="Phone Number"
                                            type="text"
                                        />
                                    </div>
                                    <div className="col-lg">
                                        <FormikController
                                            name="address"
                                            control="input"
                                            placeholder="Enter Address"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <FormikController
                                    name="email"
                                    control="input"
                                    placeholder="Email Address"
                                    type="email"
                                />

                                <FormikController
                                    name="password"
                                    control="input"
                                    placeholder="Password"
                                    isPassword
                                />
                                <FormikController
                                    name="confirm_password"
                                    control="input"
                                    placeholder="Confirm Password"
                                    isPassword
                                />

                                <FormikController
                                    label={
                                        <>
                                            I agree with the
                                            <a
                                                // to="/"
                                                className="ml-1"
                                                style={{
                                                    color: colors.primary,
                                                }}
                                            >
                                                Terms and Conditions
                                            </a>
                                        </>
                                    }
                                    name="termsCondition"
                                    control="checkbox"
                                />

                                <div className="d-flex justify-content-end mt-4">
                                    <FormikController
                                        title="Sign Up"
                                        type="submit"
                                        control="submit"
                                    />
                                </div>
                                <div className="d-flex justify-content-end mt-2">
                                    <div className="text-center small">
                                        Already have an account?
                                        <a
                                            href="/account/login"
                                            type="button"
                                            className="font-weight-bold ml-1"
                                            style={{ color: colors.primary }}
                                        >
                                            Sign in
                                        </a>
                                    </div>
                                </div>
                            </FormikComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
