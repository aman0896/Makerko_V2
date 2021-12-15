import React, { useEffect, useState } from "react";
import FormikComponent from "../Components/formik/FormikComponent";
import FormikController from "../Components/formik/FormikController";
import "./Login.css";
import { colors } from "../Values/colors";
import ModalChoice from "../Components/modal/ModalChoice";
import { LoginValidationSchema } from "./Form/ValidationSchema";
import { postData } from "../commonApi/CommonApi";
import { login, sendOTP } from "../commonApi/Link";
import { useHistory } from "react-router";
import { Toast } from "../Components/ReactToastify";
import { useWindowDimensions } from "../Functions";

const InitialValues = { email: "", password: "" };

function Login() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [verifyHidden, setVerifyHidden] = useState(true);
  const [email, setEmail] = useState();

  const { width, height } = useWindowDimensions();

  const handleSubmit = (values) => {
    postData(
      login,
      values,
      (onSuccess) => {
        console.log(onSuccess, "success");
        if (onSuccess.data) {
          const { userLoggedIn, userVerified, emailExist } = onSuccess.data;
          console.log(onSuccess.data, "data");
          if (emailExist === false) {
            Toast("User does not exist", "error", 3000, colors.white);
            return;
          } else if (userLoggedIn && userVerified) {
            Toast("Login Successful", "success", 3000, colors.white);
            setTimeout(() => {
              history.push({
                pathname: "/",
                data: {
                  message: "Login Successful",
                },
              });
              history.go();
            }, 3000);
            return;
          } else if (!userLoggedIn && userVerified == undefined) {
            Toast(
              "email or password do not match",
              "error",
              3000,
              colors.white
            );
            return;
          } else if (!userVerified && userLoggedIn == undefined) {
            Toast("Account not verified", "error", 3000, colors.white);

            setVerifyHidden(false);
            setEmail(values.email);
            return;
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
    postData(
      sendOTP,
      { email: email },
      (onSuccess) => {
        const { hash, message } = onSuccess.data;
        Toast(message, "info", 2000);
        setTimeout(() => {
          history.push({
            pathname: `/account/verify`,
            search: `?email=${email}&hash=${hash}`,
          });
          history.go(0);
        }, 2000);
      },
      (onFail) => {}
    );
  };

  return (
    <div
      style={{
        height: height - 80,
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
            <div className="sub-title">Enter your details</div>
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
                  type="email"
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
                    Click here to verify your account
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
    </div>
  );
}

export default Login;
