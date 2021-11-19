import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../components/global/Button";

function OTPVerification(props) {
    const [otp, setOtp] = useState(null);
    const [msg, setMsg] = useState(null);
    const [path, setPath] = useState(null);
    const query = new URLSearchParams(useLocation().search);
    const [email, setEmail] = useState();
    const [hash, setHash] = useState();
    const location = useLocation();
    const history = useHistory();

    console.log(email, hash);

    const handleOnchange = (arg) => {
        setOtp(arg.target.value);
    };

    useEffect(() => {
        const email = query.get("email");
        const hash = query.get("hash");
        setEmail(email);
        setHash(hash);
    }, [query]);

    useEffect(() => {
        axios.post(`${window.host}/verify-password`).then((response) => {
            setPath(response.data.locate);
        });
    }, []);

    const onVerifyClick = (event) => {
        //event.preventDefault();
        console.log(otp);
        axios
            .post(`${window.host}/verify`, {
                otp: otp,
                email: email,
                hash: hash,
            })
            .then((response) => {
                if (response.data.msg && response.data.isVerified) {
                    setMsg(response.data.msg);
                    history.push({ pathname: "/login" });
                } else {
                    setMsg(response.data.msg);
                }
            });
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
                        styleClass="btn  btn-lg d-flex ml-auto"
                        onClick={onVerifyClick}
                        btnName="Verify"
                        type="button"
                    />
                </form>

                <div className="text-center text-danger">{msg}</div>
            </div>
        </div>
    );
}

export default OTPVerification;
