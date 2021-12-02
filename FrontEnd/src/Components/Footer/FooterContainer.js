import React from "react";
import Footer from "./FooterIndex";

function FooterContainer() {
    return (
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                    <Footer.LogoColumn>
                        <Footer.Logo src="./makerko.png" alt="logo" />
                    </Footer.LogoColumn>
                    <Footer.Column>
                        <Footer.Title>Explore</Footer.Title>
                        <Footer.Link>About</Footer.Link>
                        <Footer.Link>Makers</Footer.Link>
                        <Footer.Link>Projects</Footer.Link>
                        <Footer.Link>Blog</Footer.Link>
                        <Footer.Link>Get A Quote</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Unique Services</Footer.Title>
                        <Footer.Link>Prototyping</Footer.Link>
                        <Footer.Link>Design Support</Footer.Link>
                        <Footer.Link>Local Production</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Socials</Footer.Title>
                        <Footer.Link
                            href="https://www.facebook.com"
                            target="_blank"
                        >
                            Facebook
                        </Footer.Link>
                        <Footer.Link href="#" target="_blank">
                            Twitter
                        </Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Contact and Support</Footer.Title>
                        <Footer.Link>Phone no</Footer.Link>
                        <Footer.Link href="#">Contact Us</Footer.Link>
                        <Footer.Link href="#">Give Feedback</Footer.Link>
                    </Footer.Column>
                </Footer.Row>
                <Footer.Horizontal />
                <div className="pl-3 pr-3">
                    <Footer.Copyright>
                        Copyright(c) Makerko 2021
                    </Footer.Copyright>
                    <Footer.TermsAndPolicy>
                        <Footer.TermsPolicy href="#">
                            Privacy Policy
                        </Footer.TermsPolicy>{" "}
                        |{" "}
                        <Footer.TermsPolicy href="#">
                            Terms of Use
                        </Footer.TermsPolicy>
                    </Footer.TermsAndPolicy>
                </div>
            </Footer.Wrapper>
        </Footer>
    );
}

export default FooterContainer;