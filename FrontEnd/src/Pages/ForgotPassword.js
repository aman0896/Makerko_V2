import axios from "axios";
import React from "react";
import * as Yup from "yup";
import { postData } from "../commonApi/CommonApi";
import { forgetPassword } from "../commonApi/Link";
import FormikComponent from "../Components/formik/FormikComponent";
import FormikController from "../Components/formik/FormikController";
import { Toast } from "../Components/ReactToastify";
import { colors } from "../Values/colors";
//import './loginPage.css';
function ForgotPassword() {
    const initialValues = {
        email: "",
    };
    const validationSchema = Yup.object({
        email: Yup.string().required("Required").email("Must be a valid email"),
    });

    const onhandleSubmit = (values) => {
        postData(
            forgetPassword,
            values,
            (onSuccess) => {
                const { email, link } = onSuccess.data;
                if (email === false) {
                    Toast("Email not found", "error");
                } else {
                    window.location.href = link;
                }
            },
            (onFail) => {
                console.log(onFail, "onffail reset password");
            }
        );
    };

    const onCancel = () => {
        window.location.href = "/";
    };

    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "50vh" }}
            >
                <div
                    style={{
                        height: "auto",
                        minWidth: "25%",
                        border: `1px solid ${colors.gray}`,
                        borderRadius: "10px",
                        boxShadow: `1px 1px 3px ${colors.gray}`,
                    }}
                >
                    <h3 className="heading text-center pt-3">
                        Forget Password
                    </h3>
                    <hr />
                    <FormikComponent
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onhandleSubmit}
                    >
                        <div className=" align-items-center p-3">
                            <div className=" mb-3">
                                Please enter your email reset your password
                            </div>
                            <div>
                                <FormikController
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    control="input"
                                />
                                <div className="mt-3 d-flex justify-content-end">
                                    <FormikController
                                        title="Cancel"
                                        type="button"
                                        control="cancel"
                                        buttonStyle="button--danger--outline"
                                        style={{ margin: 2 }}
                                        onClick={onCancel}
                                    />
                                    <FormikController
                                        title="Reset"
                                        type="submit"
                                        control="submit"
                                        style={{ margin: 2 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </FormikComponent>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
