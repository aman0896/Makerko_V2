import Input from "../Components/Input";
import React, { useState } from "react";
import Button from "../Components/Button";
import { useWindowDimensions } from "../functions/Functions";

import { useHistory, useLocation } from "react-router-dom";
import { postData } from "../commonApi/CommonApi";
import { otpVerification } from "../commonApi/Link";

const OTPVerify = () => {
  const { height } = useWindowDimensions();
  const location = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(location.search);

  const email = query.get("email");
  const hash = query.get("hash");

  const [params, setParams] = useState({
    inputOTP: "",
    email: email,
    hash: hash,
  });

  const inputChangeHandler = (event) => {
    setParams({
      ...params,
      inputOTP: params.inputOTP + event.target.value,
    });
    
    // document.querySelectorAll("input").forEach((input) => {
    //   input.oninput = function () {
    //     let { nextElementSibling } = this;
    //     while (nextElementSibling && nextElementSibling.tagName !== "INPUT") {
    //       nextElementSibling = nextElementSibling.nextElementSibling;
    //     }
    //     if (nextElementSibling) {
    //       nextElementSibling.focus();
    //     }
    //   };
    // });
  };
  console.log(params.inputOTP, "OTP");
  const onVerifyBtnClick = (event) => {
    event.preventDefault();
    postData(
      otpVerification,
      params,
      (onSuccess) => {
        console.log(onSuccess);
        if (onSuccess.data.isVerified === true) {
          history.push({ pathname: "/verify-success" });
        }
      },
      (onFail) => {}
    );
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: height / 2 }}
    >
      <span className="heading m-4" style={{ fontSize: "24px" }}>
        Enter OTP sent to your mail
      </span>
      <span
        className="heading m-3"
        style={{ fontSize: "13px", fontWeight: "lighter" }}
      >
        Check your mail for the OTP
      </span>
      <form className="d-flex flex-column align-items-center">
        <div className="m-2">
          <Input id="i1" name="first" onChange={inputChangeHandler} />
          <Input id="i2" name="second" onChange={inputChangeHandler} />
          <Input id="i3" name="third" onChange={inputChangeHandler} />
          <Input id="i4" name="forth" onChange={inputChangeHandler} />
          <Input id="i5" name="fifth" onChange={inputChangeHandler} />
          <Input id="i6" name="sixth" onChange={inputChangeHandler} />
        </div>
        <Button
          type="submit"
          buttonStyle="button--primary--solid"
          buttonSize="button--small"
          onClick={onVerifyBtnClick}
        >
          Verify OTP
        </Button>
      </form>
      <span style={{ fontSize: "14px", color: " #A0A0A0" }}>
        Didn’t receive OTP
      </span>
      <span>
        <a href="#" className="font-weight-bold">
          Resend OTP
        </a>
      </span>
    </div>
  );
};

export default OTPVerify;
