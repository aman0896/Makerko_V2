import React, { useState, useEffect } from "react";
import Dropzone from "../global/Dropzone";
import { GetCookiesInfo } from "../global/GlobalFunction";
import { StoreDesignInfo } from "./RequestDesignApi";
import { GetUserInfo } from "../common/restApi";
import Footer from "../main/footer";
import "../newquote/NewQuote.css";
import CancelButton from "../global/CancelButton";
import Alert from "../global/Alert";
import { toast } from "react-toastify";
import ReactToastify from "../global/ReactToastify";
import TermsAndPolicy from "../main/Terms&Policy";

function RequestDesign() {
    const [productImage, setproductImage] = useState();
    const [productSketch, setProductSketch] = useState();
    const [productDescription, setProductDescription] = useState();
    const [userID, setUserID] = useState();
    const [userEmail, setUserEmail] = useState();
    const [errMsg, setErrMsg] = useState();
    const [error, setError] = useState();
    const [checked, setChecked] = useState(false);
    const [userName, setUserName] = useState();
    const onhandleChange = (e) => {
        setErrMsg("");
        setProductDescription(e.target.value);
    };
    const style = {
        width: "20%",
    };

    useEffect(async () => {
        const userInfo = await GetCookiesInfo().then((response) => {
            return response.data;
        });
        const { uid } = userInfo;
        console.log(uid);
        setUserID(uid);
        GetUserInfo(uid, (err, userInfo) => {
            if (err) {
                return console.log(err, "getuserinfoerr");
            }
            setUserEmail(userInfo[0].Email);
            setUserName(userInfo[0].First_Name);
        });
    }, []);

    const onDesignSubmit = () => {
        const productDetail = {
            productImage,
            productSketch,
            productDescription,
        };
        if (!productImage || !productSketch || !productDescription) {
            return setErrMsg("All Fields are required");
        } else if (!checked) {
            return setError(
                "Please accept the terms and conditions to continue."
            );
        }
        StoreDesignInfo(
            userID,
            userEmail,
            userName,
            productDetail,
            (response) => {
                if (response) {
                    toast.success("Your Request for design has been submitted");
                } else {
                    toast.error("Fail to Request for design");
                }
            }
        );
    };
    const handleChange = (event) => {
        var isChecked = event.target.checked;
        console.log(isChecked, "check");
        setChecked(isChecked);
        setError("");
        var item = event.target.value;
    };

    return (
        <div>
            <div className="container ">
                {console.log(productImage, productSketch, productDescription)}
                <div className="titlequote pl-3 pt-5 mt-5">
                    I don't have a Design{" "}
                </div>
                <div className="pl-3" style={{ fontSize: "14px" }}>
                    All fields with <span style={{ color: "red" }}>*</span> are
                    required
                </div>
                {errMsg && (
                    <div className="mt-4 pl-5">
                        <Alert
                            onClick={() => {
                                setErrMsg("");
                            }}
                            alertType="alert-warning"
                            alertMessage={errMsg}
                        />
                    </div>
                )}
                <Dropzone
                    className="mt-4"
                    title="Upload Product photographs or inspirations"
                    fileNote="jpeg, png, svg, and other image file format"
                    requirementNote="Image size must not be greater than 10 MB"
                    accept="Image/*"
                    parentCallback={(photoGraph) => {
                        setproductImage(photoGraph);
                        setErrMsg("");
                    }}
                    path="requestdesign/image"
                />
                <div className="pt-5"></div>
                <Dropzone
                    className="row mt-5 pt-4"
                    title="Submit Sketches or drawings"
                    fileNote="jpeg, png, svg, and other image file format"
                    requirementNote="Image size must not be greater than 10 MB"
                    accept="Image/*"
                    parentCallback={(sketch) => {
                        setProductSketch(sketch);
                        setErrMsg("");
                    }}
                    path="requestdesign/sketch"
                />
                <div className="mt-5 ml-5">
                    <div className="col-lg">
                        <div className="title">
                            Description of your project
                            <span style={{ color: "red" }}>*</span>
                        </div>
                    </div>
                </div>{" "}
                <div className="row ml-5 mt-4  ">
                    <div className="col-sm">
                        <div>
                            <textarea
                                className="mb-4 form-control"
                                input="text"
                                row="10"
                                cols="20"
                                style={{ height: "200px" }}
                                value={productDescription}
                                onChange={onhandleChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div
                    className="row mt-5 mr-2 d-flex justify-content-end"
                    style={{
                        backgroundColor: "white",

                        fontWeight: "bold",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                    }}
                >
                    <input
                        type="checkbox"
                        value="terms"
                        name="terms"
                        onChange={handleChange}
                        style={{
                            marginRight: "10px",
                            marginLeft: "10px",
                            marginTop: "3px",
                        }}
                    />
                    I agree with&nbsp;
                    {/* <span
                        style={{
                            textDecoration: "underline",
                            color: "#5044fd",
                        }}
                    >
                        {" "}
                        Terms and Conditions{" "}
                    </span> */}
                    <TermsAndPolicy
                        subject="Terms and Conditions"
                        file="/terms&policy/T&C.pdf"
                        type="pdf"
                        style={{
                            color: "#5044fd",
                            textDecoration: "underline",
                        }}
                    />
                    &nbsp; before submission of Project details and files.
                </div>
                {error && (
                    <span className="text-danger d-flex justify-content-end m-3">
                        {error}
                    </span>
                )}
                <div
                    className="p-3 d-flex justify-content-end labeltext"
                    style={{ marginLeft: "150px", marginTop: "20px" }}
                >
                    <button
                        type="button"
                        className="btn  text-white"
                        style={{ backgroundColor: "#5044FD" }}
                        onClick={onDesignSubmit}
                    >
                        Submit
                    </button>

                    <CancelButton styleClass="btn ml-2" />
                </div>
            </div>
            <Footer />
            <ReactToastify closeTime={5000} color="white" />
        </div>
    );
}

export default RequestDesign;
