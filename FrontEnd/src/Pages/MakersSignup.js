import React, { useState } from "react";
import FormikComponent from "../Components/formik/FormikComponent";
import FormikController from "../Components/formik/FormikController";
import "./Login.css";
import * as Yup from "yup";
import { colors } from "../Values/colors";
import { MakersValidationSchema } from "./Form/ValidationSchema";
import { postData } from "../commonApi/CommonApi";
import { makerSignup } from "../commonApi/Link";
import { useHistory } from "react-router";
import { Toast } from "../Components/ReactToastify";

const InitialValues = {
    companyName: "",
    phoneNumber: "",
    address: "",
    contactPerson: "",
    email: "",
    password: "",
    confirm_password: "",
    termsCondition: false,
    companyStatus: "",
    delivery: "",
    website: "",
};

function MakersRegister() {
    const history = useHistory();

    const handleSubmit = (values) => {
        console.log(values, "values");
        postData(
            makerSignup,
            values,
            (onSuccess) => {
                if (onSuccess.data) {
                    if (onSuccess.data.emailExist === true) {
                        Toast(
                            "Email already exits",
                            "error",
                            3000,
                            colors.white
                        );
                        return;
                    }
                    const { hash } = onSuccess.data;
                    history.push({
                        pathname: `/account/verify`,
                        search: `?email=${values.email}&hash=${hash}`,
                        //send data to verify page
                    });
                }
            },
            (onFail) => {}
        );
    };

    const companyStatus = [
        {
            value: 1,
            type: "Registered Company",
        },
        {
            value: 2,
            type: "Individual/Hobbyist",
        },
    ];
    const deliveryOption = [
        {
            value: 1,
            type: "Within 20km^2",
        },
        {
            value: 2,
            type: "All Nepal",
        },
        {
            value: 3,
            type: "Pickup",
        },
    ];
    return (
        <div
            style={{
                height: window.innerHeight - 80,
            }}
        >
            <div className="row m-0 h-100">
                <div className="col-lg-5 m-0 p-0">
                    <img
                        src="/assests/Login.png"
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </div>
                <div className="col-lg-6 mx-5 section">
                    <div className="d-flex justify-content-center h-100 flex-column">
                        <img
                            src="/assests/Title.png"
                            style={{
                                width: 180,
                                // height: 19,
                            }}
                        />
                        <div className="details">
                            Enter your Company details to get started
                        </div>
                        <div className="">
                            <FormikComponent
                                initialValues={InitialValues}
                                onSubmit={handleSubmit}
                                validationSchema={MakersValidationSchema}
                            >
                                <div className="row">
                                    <div className="col-lg">
                                        <FormikController
                                            name="companyName"
                                            control="input"
                                            placeholder="Enter Company Name"
                                            label="Company Name"
                                        />
                                    </div>
                                    <div className="col-lg">
                                        <FormikController
                                            name="companyStatus"
                                            control="select"
                                            label="Company Status"
                                            options={companyStatus}
                                            getOptionLabel={(options) =>
                                                options.type
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg">
                                        <FormikController
                                            name="email"
                                            control="input"
                                            placeholder="Enter E-mail Address"
                                            type="email"
                                            label="E-mail Address"
                                        />
                                    </div>
                                    <div className="col-lg">
                                        <FormikController
                                            name="address"
                                            control="input"
                                            placeholder="Enter Address"
                                            label="Address"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg">
                                        <FormikController
                                            name="phoneNumber"
                                            control="input"
                                            placeholder="Enter Phone Number"
                                            label="Phone Number"
                                        />
                                    </div>
                                    <div className="col-lg">
                                        <FormikController
                                            name="contactPerson"
                                            control="input"
                                            placeholder="Enter Contact Person Name"
                                            label="Contact Person"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg">
                                        <FormikController
                                            name="password"
                                            control="input"
                                            placeholder="Password"
                                            isPassword
                                            label="Password"
                                        />
                                    </div>
                                    <div className="col-lg">
                                        <FormikController
                                            name="confirm_password"
                                            control="input"
                                            placeholder="Confirm Password"
                                            isPassword
                                            label="Confirm Password"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg">
                                        <FormikController
                                            name="website"
                                            control="input"
                                            placeholder="Enter website"
                                            label="Website"
                                        />
                                    </div>
                                    <div className="col-lg">
                                        <FormikController
                                            name="delivery"
                                            control="select"
                                            label="Delivery"
                                            options={deliveryOption}
                                            getOptionLabel={(options) =>
                                                options.type
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-lg-7 mt-4">
                                        <FormikController
                                            name="termsCondition"
                                            control="checkbox"
                                        />
                                    </div>
                                    <div className="col-lg">
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
                                                    href="/login"
                                                    type="button"
                                                    className="font-weight-bold ml-1"
                                                    style={{
                                                        color: colors.primary,
                                                    }}
                                                >
                                                    Sign in
                                                </a>
                                            </div>
                                        </div>
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

export default MakersRegister;
