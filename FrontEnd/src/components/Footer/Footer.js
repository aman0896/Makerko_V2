import React, { Component } from "react";
import { Link as Scroll } from "react-scroll";
import { withRouter } from "react-router";
import "./Footer.css";
import TermsAndPolicy from "../Terms&Policy";

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    onClickAboutUs = () => {
        console.log(this.props);
        this.props.history.push({ pathname: "/", data: "aboutus" });
    };
    render() {
        return (
            <div className="mt-5" style={{ letterSpacing: "0.3px" }}>
                <div className="row m-3 pr-5 footer-column">
                    <div className="col-lg-2 offset-1 d-flex align-items-center">
                        <span style={{ fontSize: "45px" }}>MAKERKO</span>
                    </div>
                    <div className="col-lg footer capabilities">
                        <div className="footer-title">Explore</div>
                        <span className="footer-link">
                            <div>
                                <Scroll
                                    id="about"
                                    to="about-us"
                                    spy={true}
                                    hashSpy={true}
                                    smooth={true}
                                    duration={500}
                                    offset={-50}
                                    onClick={() => {
                                        this.onClickAboutUs();
                                    }}
                                >
                                    About
                                </Scroll>
                            </div>
                            <div>
                                <a href="/manufacturer-list">
                                    Manufacturing Hub
                                </a>
                            </div>
                            <div>
                                <a href="/feature-project">Feature Project</a>
                            </div>
                            <div>
                                <a href="/knowledgebank">Knowledge Bank</a>
                            </div>
                            <div>
                                <a
                                    href=""
                                    data-toggle="modal"
                                    data-target="#placeOrderModal"
                                >
                                    Get A Quote
                                </a>
                            </div>
                        </span>
                    </div>

                    <div className="col-lg  footer ">
                        <div className="footer-title">Unique Services</div>
                        <div> Prototyping</div>
                        <div> Design Support</div>
                        <div>Local Production</div>
                    </div>
                    <div className="col-lg   footer">
                        <div className="footer-title">Socials</div>
                        <div>
                            <span>
                                <i className="fab fa-facebook-f social-buttons mr-1"></i>
                                Facebook
                            </span>
                        </div>
                        <div>
                            <span>
                                <i className="fab fa-twitter social-buttons mr-1"></i>
                                Twitter
                            </span>
                        </div>
                    </div>
                    <div className="col-lg  footer">
                        <div
                            className="footer-title mr-1"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            Contact and Support
                        </div>
                        <div>
                            <span>
                                <i className="fas fa-phone fa-rotate-90 mr-1"></i>
                                +97701546789
                            </span>
                        </div>
                        <div>
                            <span>
                                <i className="fas fa-envelope mr-1 "></i>

                                <a
                                    type="button"
                                    className="text-black"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                >
                                    Contact us
                                </a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <i className="fas fa-star mr-1" />
                                Give feedback
                            </span>
                        </div>
                    </div>
                </div>{" "}
                <div className="offset-1 pb-4 footer-end">
                    <hr className="hr mr-5 mb-1" />
                    <div className="row mx-auto">
                        <div className="col-lg pl-2">
                            <span className="copyright">
                                Copyright &copy; MAKERKO{" "}
                                {new Date().getFullYear()}
                            </span>
                        </div>
                        <div className="col-lg d-flex justify-content-end pr-5 mr-4">
                            <span
                                className="pr-2  text-black"
                                style={{
                                    borderRight: "1px solid black",
                                    borderBottom: "1px solid black",
                                }}
                            >
                                <TermsAndPolicy
                                    subject="Privacy Policy"
                                    file="/terms&policy/PrivacyPolicy.pdf"
                                    type="pdf"
                                />
                            </span>
                            <span
                                className="pl-2  text-black"
                                style={{
                                    borderBottom: "1px solid black",
                                }}
                            >
                                <TermsAndPolicy
                                    subject="Terms of Use"
                                    file="/terms&policy/T&C.pdf"
                                    type="pdf"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Footer);
