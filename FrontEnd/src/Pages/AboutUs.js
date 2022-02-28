import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    DesktopMediaQuery,
    MobileMediaQuery,
    TabletMediaQuery,
} from "../Components/ReactResponsize";
import WrapperComponent from "../Components/WrapperComponent";
import aboutus from "../config/AboutUs.json";

function AboutUs() {
    //hooks
    const location = useLocation();

    const isDesktop = DesktopMediaQuery();
    const isTablet = TabletMediaQuery();
    const isMobile = MobileMediaQuery();

    const style = {
        display: "flex",
        flexDirection: isMobile
            ? "column-reverse"
            : isTablet
            ? "column-reverse"
            : "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "10px 0px",
    };
    const contentDivStyle = {
        flex: 2,
        marginTop: isMobile ? "10px" : isTablet ? "10px" : "",
    };
    const descriptionStyle = {
        fontSize: isMobile ? "12px" : isTablet ? "1rem" : "",
        textAlign: "justify",
    };
    const imageDivStyle = {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
    };

    const imageStyle = {
        width: isMobile ? "150px" : isTablet ? "200px" : "250px",
        height: "auto",
        objectFit: "content",
        alignSelf: "self-end",
    };

    useEffect(() => {
        if (location.state) {
            const element = document.getElementById(location.state);
            console.log(element, "element");

            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        }
    }, [location]);

    return (
        <WrapperComponent>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    className="p-2"
                    style={{
                        width: isMobile ? "95%" : isTablet ? "90%" : "80%",
                    }}
                >
                    <div style={style} id="local-production">
                        <div style={contentDivStyle}>
                            <h4 className="heading">{aboutus[0].name}</h4>
                            <p style={descriptionStyle}>
                                MAKERKO enables producers and consumers interact
                                locally. Local production is at the core of the
                                Makerko principle as its key to boosting local
                                economy by engaging people in local making and
                                creating more jobs, climate friendly approach to
                                saving thousands of Tons of carbon emission
                                otherwise generated during long distance complex
                                global supply chain. We believe finding
                                sustainable local solutions to community’s
                                pressing challenges through local production and
                                innovation. MAKERKO aims to map distributed
                                local makers, document their capabilities and
                                provide them a platform to build their digital
                                portfolio where potential designers/innovators
                                can spot them online and connect to make things
                                locally. “MAKERKO - Making Things Locally!”
                            </p>
                        </div>
                        <div style={imageDivStyle}>
                            <img
                                style={imageStyle}
                                src={aboutus[0].image}
                                alt=""
                            />
                        </div>
                    </div>
                    <div style={style} id="collaborative-manufacturing">
                        <div style={contentDivStyle}>
                            <h4 className="heading">{aboutus[1].name}</h4>
                            <p style={descriptionStyle}>
                                MAKERKO is a web of production platform, an
                                online marketplace that connects local producers
                                and end-users. End-users have the ability to
                                request for the Production via the platform. It
                                makes the capabilities of local producers more
                                visible to consumers, as the producers offer new
                                products and innovations. As a result, designers
                                and innovators also have diverse manufacturing
                                options within a platform. Users then have the
                                ability to upload a work order (with a product
                                design if applicable) and be connected with a
                                local producer that execute the job. 2 The
                                platform also brings together idle machines,
                                decentralized technology tools, global and
                                remote expertise, diverse skill sets, and a
                                growing supplier network - making the product
                                development process collaborative and more
                                reliable for consumers. With MAKERKO - you don’t
                                need to own proprietary tools. Through
                                Collaborative Manufacturing, you rule
                                Production.
                            </p>
                        </div>
                        <div style={imageDivStyle}>
                            <img
                                src={aboutus[1].image}
                                style={imageStyle}
                                alt=""
                            />
                        </div>
                    </div>
                    <div style={style} id="design-support">
                        <div style={contentDivStyle}>
                            <h4 className="heading">{aboutus[2].name}</h4>
                            <p style={descriptionStyle}>
                                MAKERKO platform addresses local challenges in
                                Nepal around production, including: incorrect
                                designs for manufacturing, obtaining a workable
                                prototype, lack of access to
                                design/manufacturing experts, and marketing and
                                communication gaps. While users can choose to
                                engage with their preferred maker partners, they
                                can still seek support on their design
                                correction and request for prototype to the
                                Makerko before final production. Makerko fully
                                comply to standards to ensure Intellectual
                                Property rights of users data are safe, and
                                provide Design and Prototyping Support through
                                its trusted partners. 3 The first milestone to
                                successful production and innovation is a
                                correct design and a successful prototype there
                                after. Makerko has this tailored service for
                                you!
                            </p>
                        </div>
                        <div style={imageDivStyle}>
                            <img
                                style={imageStyle}
                                src={aboutus[2].image}
                                alt=""
                            />
                        </div>
                    </div>
                    <div style={style} id="design-challanges">
                        <div style={contentDivStyle}>
                            <h4 className="heading">{aboutus[3].name}</h4>
                            <p style={descriptionStyle}>
                                Around 20% of the nearly 30 million population
                                of Nepal live on less than $ 1.25 a day with a
                                serious compromise on daily basic needs of food
                                and nutrition, clean water, sanitation, safer
                                accommodation and clean energy. To make it
                                worst, the climate change is adding to the
                                vulnerability of Nepal being one of the most
                                catastrophic geographies in the world facing
                                more recurring disasters at an unprecedented
                                scale. Quite often, the solutions to the
                                community’s some pressing challenges lies within
                                communities itself - in a form of indeginous
                                knowledge and local skills. 4 MAKERKO believes
                                in finding local solutions through facilitating
                                periodic Design and Innovation Challenge -
                                letting innovators and problem solvers tinker
                                ideas on different themes - that can have
                                potential to directly impact people’s life in
                                needy communities. Join MAKERKO Design &
                                Innovation Challenge to create lasting impact in
                                vulnerable communities!
                            </p>
                        </div>
                        <div style={imageDivStyle}>
                            <img
                                style={imageStyle}
                                src={aboutus[3].image}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </WrapperComponent>
    );
}

export default AboutUs;
