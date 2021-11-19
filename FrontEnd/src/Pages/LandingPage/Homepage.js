import React, { Component, createRef } from "react";
import AboutUs from "./AboutUs";
import "../css/HomePage.css";
import Partners from "./Partners";
import ProductionCapabilities from "./ProductionCapabilities";
import Button from "../../components/global/Button";
import Footer from "../../components/Footer/Footer";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: "",
        };
        this.aboutusRef = createRef();
    }

    componentDidMount() {
        console.log(this.props);
        console.log("aboutus", this.props.location);
        const location = this.props.location;
        console.log("aboutus", location.data);
        if (location.data == "aboutus") {
            console.log("scroll");
            window.scrollTo({
                top: this.aboutusRef.current.offsetTop - 50,
                behavior: "smooth",
            });
        }
    }

    render() {
        return (
            <div className="mt-4">
                <div className="" style={{ overflowX: "hidden" }}>
                    <div className="row m-auto">
                        <div className="col-lg-5 offset-1 my-auto pr-5">
                            {/* <img
                                src={logo}
                                alt="logo"
                                style={{ width: '400px' }}
                            /> */}
                            <h1>MAKERKO</h1>
                            <p className="mt-4" style={{ fontSize: "16px" }}>
                                A web of production platform, an online
                                marketplace that connects local producers and
                                end-users. End-users will have the ability to
                                request the production of a product via the
                                platform.
                            </p>
                            <Button
                                btnName="Get a Quote"
                                styleClass="btn btn-lg d-flex justify-content-center mb-2"
                                toggle="modal"
                                target="#placeOrderModal"
                            />
                        </div>
                        <div className="col-lg p-0 m-0">
                            <img
                                //className="w-100"
                                src="/assests/Homepage.jpg"
                                alt="3D printing"
                                style={{ width: "100%", height: "600px" }}
                            />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <div style={{ height: "70px" }}></div>
                                <h4 className="font-weight-bold">
                                    {" "}
                                    Hundreds of local makers with amazing
                                    manufacturing resources are waiting for your
                                    order. Do you have something cool to make it
                                    locally?
                                </h4>
                                <div className="mt-4 mb-5">
                                    <a
                                        href="/how-to-get-a-quote"
                                        className="order-link"
                                    >
                                        {" "}
                                        <h5> Learn How to Place Orders</h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProductionCapabilities />
                    <AboutUs reference={this.aboutusRef} />
                    <Partners />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default HomePage;
