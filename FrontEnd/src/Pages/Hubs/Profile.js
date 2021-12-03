import React from "react";
import { useWindowDimensions } from "../../functions/Functions";
import myImage from "../../Values/Images";
import "./Profile.css";

export default function Profile() {
    const { height, width } = useWindowDimensions();
    return (
        <div className="bg-dark" style={{ minHeight: height - 80 }}>
            <img
                src={myImage.cover}
                style={{ width: "100%", height: height / 2 }}
                alt="Profile Cover"
            />
            <div className="row m-auto">
                <div
                    className="col-4"
                    style={{ display: width < 768 ? "none" : "block" }}
                >
                    <div className="ml-md-5 d-flex align-items-center flex-column">
                        <div
                            className="bg-white stack-top px-3"
                            style={{
                                // width: "65%",
                                maxWidth: "400px",
                                minWidth: "200px",
                            }}
                        >
                            <div className="bg-white d-flex align-items-center flex-column py-2 text-center">
                                <div
                                    className="my-4 p-3"
                                    style={{
                                        height: 150,
                                        width: 150,
                                        display: "flex",
                                        backgroundColor: "black",
                                    }}
                                >
                                    <img
                                        src={myImage.profileLogo}
                                        alt="logo"
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                                <div>
                                    <h4>Zener Technology</h4>
                                    <p className="px-3">
                                        3D Design and Additive manufacturing
                                        Tech Company, inspired by the fourth
                                        Industrial Revolution.
                                    </p>
                                    <p>
                                        www.promechminds.com
                                        <br />
                                        Kupondole,Lalitpur
                                    </p>
                                </div>
                                <div>
                                    <button>Get A Quote</button>
                                </div>
                                <div>Rating</div>
                            </div>
                            <div>Fabrication Services</div>
                            <div className="row text-center">
                                <div className="p-2 bg-primary ml-3 mb-2">
                                    Get A Quote
                                </div>
                                <div className="p-2 bg-primary ml-3 mb-2">
                                    Get A Quote
                                </div>
                                <div className="p-2 bg-primary ml-3 mb-2">
                                    Get A Quote
                                </div>
                            </div>
                            <div>Other Services</div>
                            <div className="row text-center">
                                <div className="p-2 bg-primary ml-3 mb-2">
                                    Get A Quote
                                </div>
                            </div>
                            <div>Contact</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 text-justify text-white">
                    <h1>About Zener Technologies</h1>
                    <p>
                        3D Design and Additive manufacturing Tech Company,
                        inspired by the fourth Industrial Revolution. It uses
                        the range of 3D printers and desktop manufacturing tools
                        to offer prototyping and Just-in-time (JIT)
                        manufacturing services to the local and international
                        customers.
                    </p>
                    <p>
                        3D printing enabled manufacturing increases efficiency
                        and reliability by reducing labour, tools and material
                        cost. It’s a clean production technology capable of
                        making complex objects through additive processes and
                        then taking it to conventional mass manufacturing
                        processes with ease.
                    </p>
                    <p>
                        Established in 2016 Zener Technologies took pioneering
                        steps to commercialize 3D Printers and 3D Printing
                        Services to the public, thus making the boons of
                        additive manufacturing accessible to everyone in Nepal.
                        In 2018, Zener Technologies started the commercial
                        application of 3D Scanning and Reverse Engineering in
                        Nepal.
                    </p>
                    <p>
                        With growing market needs, we are determined to uplift
                        the technology sector of Nepal by introducing new and
                        advanced tools/services. Zener Technologies has been a
                        Global Environment Facility Small Grants Programme
                        (GEF-SGP) of the UNDP grantee and DFID UK Aid’s Frontier
                        Tech Hub #COVIDaction Local Production Local Solution
                        awardee – 2020.
                    </p>
                </div>
                <div style={{ display: width < 768 ? "block" : "none" }}>
                    <div>Fabrication Services</div>
                    <div className="row text-center">
                        <div className="p-2 bg-primary ml-3 mb-2">
                            Get A Quote
                        </div>
                        <div className="p-2 bg-primary ml-3 mb-2">
                            Get A Quote
                        </div>
                        <div className="p-2 bg-primary ml-3 mb-2">
                            Get A Quote
                        </div>
                    </div>
                    <div>Other Services</div>
                    <div className="row text-center">
                        <div className="p-2 bg-primary ml-3 mb-2">
                            Get A Quote
                        </div>
                    </div>
                    <div>Contact</div>
                </div>
            </div>
        </div>
    );
}
