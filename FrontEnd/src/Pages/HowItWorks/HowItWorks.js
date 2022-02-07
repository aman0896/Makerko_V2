import React from "react";
import "./HowItWorks.css";
import play from "./demo.svg";
import { MdCloudUpload } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { BsPersonCheckFill } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { colors } from "../../Values/colors";

function HowitWorks() {
    return (
        <>
            <div className="" style={{ width: "80%", margin: "0 10%" }}>
                <div className="row mt-5">
                    <div className="col-sm">
                        <div
                            className="heading text-uppercase"
                            style={{ fontSize: "2rem", color: colors.primary }}
                        >
                            HOW TO GET A QUOTE
                        </div>

                        <span className="quote">
                            Learn how to build your first quote, upload your
                            part and specify requirements
                        </span>
                    </div>
                </div>
                <div className="row" style={{ paddingTop: "80px" }}>
                    <div className="col-md">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <MdCloudUpload size={100} />
                        </div>

                        <div
                            className="upload"
                            style={{
                                textAlign: "center",
                                paddingTop: "30px",
                            }}
                        >
                            Upload
                        </div>
                        <div
                            className="quote"
                            style={{ textAlign: "center", margin: 0 }}
                        >
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint.
                        </div>
                    </div>
                    <div className="col-md">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <GrConfigure size={100} />
                        </div>

                        <div
                            className="upload"
                            style={{
                                textAlign: "center",
                                paddingTop: "30px",
                            }}
                        >
                            Configure
                        </div>
                        <div
                            className="quote"
                            style={{ textAlign: "center", margin: 0 }}
                        >
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint.
                        </div>
                    </div>
                    <div className="col-md">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <BsPersonCheckFill size={100} />
                        </div>

                        <div
                            className="upload"
                            style={{
                                textAlign: "center",
                                paddingTop: "30px",
                            }}
                        >
                            Select
                        </div>
                        <div
                            className="quote"
                            style={{ textAlign: "center", margin: 0 }}
                        >
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint.
                        </div>
                    </div>
                    <div className="col-md">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <FaDollarSign size={100} />
                        </div>

                        <div
                            className="upload"
                            style={{
                                textAlign: "center",
                                paddingTop: "30px",
                            }}
                        >
                            Pricing
                        </div>
                        <div
                            className="quote"
                            style={{ textAlign: "center", margin: 0 }}
                        >
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint.
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "black" }}>
                <div className="" style={{ width: "80%", margin: "0 10%" }}>
                    <div className="row" style={{ marginTop: "80px" }}>
                        <div className="col">
                            <div
                                className="heading text-uppercase pt-5 pb-5"
                                style={{
                                    color: colors.white,
                                    fontSize: "2rem",
                                }}
                            >
                                DEMONSTRATION VIDEO
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <video
                                    style={{
                                        position: "relative",
                                        width: "1500px",
                                        height: "500px",
                                        backgroundColor: "lightgray",

                                        marginBottom: "100px",
                                    }}
                                ></video>
                                <img
                                    src={play}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "45%",
                                    }}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HowitWorks;
