import React from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import FormikComponent from "../Components/formik/FormikComponent";
import FormikController from "../Components/formik/FormikController";
import { colors } from "../Values/colors";
import { changePasswordvalidationSchema } from "./Form/ValidationSchema";
function ResetPassword() {
    const param = new URLSearchParams(useLocation().search);
    console.log(param.get("email"), "param");
    const initialValues = {
        password: "",
        confirmpassword: "",
    };

    const onhandleSubmit = (values) => {
        console.log("Form Data", values);
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
                    <h3 className="heading text-center p-3">Change Password</h3>
                    <hr />
                    <FormikComponent
                        initialValues={initialValues}
                        validationSchema={changePasswordvalidationSchema}
                        onSubmit={onhandleSubmit}
                    >
                        <div className=" align-items-center p-3">
                            <FormikController
                                type="password"
                                placeholder="New Password"
                                name="password"
                                control="input"
                                isPassword
                            />
                            <FormikController
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmpassword"
                                control="input"
                                isPassword
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
                    </FormikComponent>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
