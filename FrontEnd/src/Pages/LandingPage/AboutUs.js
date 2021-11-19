import React, { Component } from "react";
import "../css/AboutUs.css";

class AboutUs extends Component {
    render() {
        return (
            <div
                id="about-us"
                ref={this.props.reference}
                className="text-white pb-5"
            >
                <div>
                    <div className="row m-auto ">
                        <div className="col-lg d-flex justify-content-center">
                            <div
                                style={{
                                    fontSize: "24px",
                                    marginBottom: "50px",
                                    marginTop: "50px",
                                    fontWeight: "bold",
                                }}
                            >
                                About Us
                            </div>{" "}
                        </div>
                    </div>
                    <div className="row m-auto">
                        <div className="col-lg d-flex justify-content-center align-items-center">
                            <img
                                className=""
                                src="/assests/About us .jpg"
                                alt="logo"
                                style={{ height: "80%", width: "70%" }}
                            />
                        </div>
                        <div className="col-lg d-flex justify-content-center pr-5 m-4">
                            <div style={{ width: "90%" }}>
                                The <b>Makerko</b> is a web of production
                                platform, an online marketplace that connects
                                local producers and end-users. End-users will
                                have the ability to request the production of a
                                product via the platform.
                                <br />
                                <br />
                                This platform addresses local challenges in
                                Nepal around production, including: incorrect
                                designs for manufacturing, obtaining a workable
                                prototype, lack of access to
                                design/manufacturing experts and marketing and
                                communication gaps. The makerko platform will
                                make the capabilities of local producers more
                                visible to consumers, as the producers offer new
                                products and innovations. Users will then have
                                the ability to upload a work order (with a
                                product design if applicable) and be connected
                                with a local producer that will execute the work
                                order.
                                <br />
                                <br /> The platform also brings together idle
                                machines, decentralized technology tools, global
                                and remote expertise, diverse skill sets, and a
                                growing supplier network, making the product
                                development process more reliable for consumers.
                            </div>
                        </div>
                    </div>{" "}
                </div>
            </div>
        );
    }
}

export default AboutUs;
