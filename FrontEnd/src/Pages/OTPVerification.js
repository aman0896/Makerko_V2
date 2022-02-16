import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import { Toast } from "../Components/ReactToastify";
import { useHistory, useLocation } from "react-router-dom";
import { postData } from "../commonApi/CommonApi";
import { otpVerification } from "../commonApi/Link";
import Input from "../Components/input/optInput/OTPInput";
import { colors } from "../Values/colors";
import { sendOTP } from "../commonApi/Link";

function OTPVerification() {
    const location = useLocation();
    const history = useHistory();
    const query = new URLSearchParams(location.search);
    const [counter, setCounter] = useState(0);
    const [resendDisable, setResendDisable] = useState(false);

    const { state } = location;
    console.log(state, "state");

    const email = query.get("email");
    const hash = query.get("hash");

    const [otp, setOtp] = useState({
        pin1: "",
        pin2: "",
        pin3: "",
        pin4: "",
        pin5: "",
        pin6: "",
    });

    const inputChangeHandler = (e) => {
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex

        if (e.target.value === "" || re.test(e.target.value)) {
            setOtp({ ...otp, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (state !== undefined) {
            Toast(state.message, "success");
        }
    }, [state]);

    const onhandleSubmit = (event) => {
        event.preventDefault();
        const otpCode =
            otp.pin1 + otp.pin2 + otp.pin3 + otp.pin4 + otp.pin5 + otp.pin6;

        const params = {
            inputOTP: otpCode,
            email: email,
            hash: hash,
        };
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

    const onKeyUp = (event) => {
        console.log(event, "keyup");
        const length = event.target.value.length;
        const maxLength = event.target.maxLength;
        if (length !== 0 && length === maxLength) {
            event.target.nextSibling && event.target.nextSibling.focus();
        } else if (event.keyCode === 8) {
            event.target.previousSibling &&
                event.target.previousSibling.focus();
        }
    };

    const onClickResend = (event) => {
        event.preventDefault();
        postData(
            sendOTP,
            { email: email && email },
            (onSuccess) => {
                const { hash, message } = onSuccess.data;
                Toast(message, "info");
                history.push({
                    pathname: `/account/verify`,
                    search: `?email=${email}&hash=${hash}`,
                });
            },
            (onFail) => {}
        );
        setCounter(60);
    };

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (counter > 0) {
                setCounter(counter - 1);
                setResendDisable(true);
            }
            if (counter === 0) {
                clearInterval(myInterval);
                setResendDisable(false);
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    }, [counter]);

    return (
        <div
            style={{
                width: "100%",
                height: "95vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{ width: "40%" }}
                className="jumbotron d-flex flex-column justify-content-center align-items-center"
            >
                <div className="heading" style={{ fontSize: "24px" }}>
                    Enter OTP sent to your mail
                </div>
                <span style={{ fontSize: "14px", color: colors.dark }}>
                    Check your mail for the OTP
                </span>
                <form
                    className="d-flex flex-column align-items-center"
                    onSubmit={onhandleSubmit}
                >
                    <div className="m-2 d-flex align-items-center justify-content-center">
                        <Input
                            id="pin1"
                            name="pin1"
                            onChange={inputChangeHandler}
                            value={otp.pin1}
                            onKeyUp={onKeyUp}
                        />
                        <Input
                            id="pin2"
                            name="pin2"
                            onChange={inputChangeHandler}
                            value={otp.pin2}
                            onKeyUp={onKeyUp}
                        />
                        <Input
                            id="pin3"
                            name="pin3"
                            onChange={inputChangeHandler}
                            value={otp.pin3}
                            onKeyUp={onKeyUp}
                        />
                        <Input
                            id="pin4"
                            name="pin4"
                            onChange={inputChangeHandler}
                            value={otp.pin4}
                            onKeyUp={onKeyUp}
                        />
                        <Input
                            id="pin5"
                            name="pin5"
                            onChange={inputChangeHandler}
                            value={otp.pin5}
                            onKeyUp={onKeyUp}
                        />
                        <Input
                            id="pin6"
                            name="pin6"
                            onChange={inputChangeHandler}
                            value={otp.pin6}
                            onKeyUp={onKeyUp}
                        />
                    </div>
                    <div className="mt-2">
                        <Button
                            type="submit"
                            buttonStyle="button--primary--solid"
                            buttonSize="button--small"
                        >
                            Verify OTP
                        </Button>
                    </div>
                </form>
                <div style={{ fontSize: "14px", color: colors.gray }}>
                    Didn’t receive OTP ?
                </div>
                <div>
                    <span
                        onClick={onClickResend}
                        style={{
                            cursor: "pointer",
                            color:
                                resendDisable === true
                                    ? colors.gray
                                    : colors.primary,
                            fontSize: "14px",
                            pointerEvents:
                                resendDisable === true ? "none" : "auto",
                        }}
                    >
                        {counter && counter > 0
                            ? `Resend Otp (${counter})`
                            : "Resend Otp"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default OTPVerification;
