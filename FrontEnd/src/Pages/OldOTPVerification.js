import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { postData } from "../commonApi/CommonApi";
import { otpVerification } from "../commonApi/Link";
import Button from "../Components/Button";

function OldOTPVerification(props) {
    const [otp, setOtp] = useState(null);
    const [msg, setMsg] = useState(null);
    const [path, setPath] = useState(null);
    const query = new URLSearchParams(useLocation().search);
    // const [email, setEmail] = useState();
    // const [hash, setHash] = useState();
    const location = useLocation();
    const history = useHistory();
    const email = query.get("email");
    const hash = query.get("hash");
    const [params, setParams] = useState({
        inputOTP: "",
        email: email,
        hash: hash,
    });

    const handleOnchange = (arg) => {
        setParams({ ...params, inputOTP: arg.target.value });
    };

    // useEffect(() => {
    //     const email = query.get("email");
    //     const hash = query.get("hash");
    //     setEmail(email);
    //     setHash(hash);
    // }, [query]);

    // useEffect(() => {
    //     axios.post(`${window.host}/verify-password`).then((response) => {
    //         setPath(response.data.locate);
    //     });
    // }, []);

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
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">OTP Verification</h1>
                <form>
                    <input
                        id="otp"
                        type="text"
                        autoFocus
                        className="form-control"
                        placeholder="Enter Your OTP"
                        name="otp"
                        onChange={handleOnchange}
                        value={otp}
                    />
                    <hr className="my-4" />
                    <p>Enter the OTP sent to you email address.</p>

                    <Button
                        type="submit"
                        buttonStyle="button--primary--solid"
                        buttonSize="button--small"
                        onClick={onVerifyBtnClick}
                    >
                        Verify
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default OldOTPVerification;
