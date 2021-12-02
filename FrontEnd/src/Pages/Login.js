import React, { useState } from "react";
import FormikComponent from "../Components/formik/FormikComponent";
import FormikController from "../Components/formik/FormikController";
import "./Login.css";
import { colors } from "../Values/colors";
import ModalChoice from "../Components/modal/ModalChoice";
import { LoginValidationSchema } from "./Form/ValidationSchema";
import { postData } from "../commonApi/CommonApi";
import { login } from "../commonApi/Link";
import { useHistory } from "react-router";
import ReactToastify from "../Components/ReactToastify";

const InitialValues = { email: "", password: "" };

function Login() {
    const history = useHistory();
    const [toast, setToast] = useState({
        message: "",
        textColor: "",
        closeTime: "",
        type: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [verifyHidden, setVerifyHidden] = useState(true);
    const [email, setEmail] = useState();

    const handleSubmit = (values) => {
        postData(
            login,
            values,
            (onSuccess) => {
                console.log(onSuccess, "success");
                if (onSuccess.data) {
                    const { userLoggedIn, userVerified, emailExist } =
                        onSuccess.data;
                    if (emailExist === false) {
                        setToast({
                            ...toast,
                            message: "User does not exist",
                            type: "error",
                            closeTime: 3000,
                            textColor: colors.white,
                        });
                    } else if (userLoggedIn && userVerified) {
                        console.log("login success");
                        setToast({
                            ...toast,
                            message: "Login Successful",
                            type: "success",
                            closeTime: 3000,
                            textColor: colors.white,
                        });
                        setTimeout(() => {
                            history.push({
                                pathname: "/",
                                data: {
                                    message: "Login Successful",
                                },
                            });
                            history.go();
                        }, 5000);
                    } else if (!userLoggedIn && userVerified == undefined) {
                        setToast({
                            ...toast,
                            message: "email or password do not match",
                            type: "error",
                            closeTime: 3000,
                            textColor: colors.white,
                        });
                    } else if (!userVerified && userLoggedIn == undefined) {
                        setToast({
                            ...toast,
                            message: "Email not verified",
                            type: "error",
                            closeTime: 3000,
                            textColor: colors.white,
                        });
                        setVerifyHidden(false);
                        setEmail(values.email);
                    }
                }
            },
            (onFail) => {}
        );
    };
    const showModalChoice = () => {
        setShowModal(true);
    };
    const handleClose = () => {
        setShowModal(false);
    };
    const onClickClient = () => {
        window.location.href = "/account/signup";
    };
    const onClickMaker = () => {
        window.location.href = "/account/makers-signup";
    };

    const onClickVerify = (event) => {
        event.preventDefault();
        postData();
        // axios
        //     .post(`${window.host}/verify-login`, {
        //         email: this.state.email,
        //     })
        //     .then((response) => {
        //         if (response.data) {
        //             const { hash, message } = response.data;
        //             toast(message);
        //             setTimeout(() => {
        //                 this.props.history.push({
        //                     pathname: `/verify`,
        //                     search: `?email=${this.state.email}&hash=${hash}`,
        //                 });
        //                 this.props.history.go(0);
        //             }, 2000);
        //         }
        //     });
    };

    return (
        <div
            style={{
                height: "80",
            }}
        >
            <div className="row m-0 h-100">
                <div className="col-lg-7 m-0 p-0">
                    <img
                        src="/assests/Login.png"
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
                        <div className="details">Enter your details</div>
                        <div className="width">
                            <FormikComponent
                                initialValues={InitialValues}
                                onSubmit={handleSubmit}
                                validationSchema={LoginValidationSchema}
                            >
                                <FormikController
                                    name="email"
                                    control="input"
                                    placeholder="Enter E-mail"
                                />

                                <FormikController
                                    name="password"
                                    control="input"
                                    placeholder="Enter Password"
                                    isPassword
                                />

                                <div className="small mb-2">
                                    Forget your password?
                                    <a
                                        className="font-weight-bold ml-1"
                                        href="#"
                                        style={{ color: colors.primary }}
                                    >
                                        Reset it Here
                                    </a>
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <FormikController
                                        title="Sign In"
                                        type="submit"
                                        control="submit"
                                    />
                                </div>
                                <div className="text-center">
                                    <a
                                        type="button"
                                        hidden={verifyHidden}
                                        onClick={onClickVerify}
                                        style={{
                                            color: colors.primary,
                                            textDecoration: "underline",
                                        }}
                                        className="mt-2"
                                    >
                                        Click here to verify
                                    </a>
                                </div>
                                <div className="d-flex justify-content-center mt-2">
                                    <div className="text-center small">
                                        Do not have an account?
                                        <a
                                            type="button"
                                            className="font-weight-bold ml-1"
                                            style={{ color: colors.primary }}
                                            onClick={showModalChoice}
                                        >
                                            Sign up
                                        </a>
                                    </div>
                                </div>
                            </FormikComponent>
                        </div>
                    </div>
                </div>
            </div>
            <ModalChoice
                show={showModal}
                handleClose={handleClose}
                onClickButton1={onClickClient}
                onClickButton2={onClickMaker}
                title="Sign Up as:"
                btnTitle1="Client"
                btnTitle2="Maker"
            />
            <ReactToastify
                message={toast.message}
                type={toast.type}
                closeTime={toast.closeTime}
                textColor={toast.textColor}
            />
        </div>
    );
}

export default Login;
