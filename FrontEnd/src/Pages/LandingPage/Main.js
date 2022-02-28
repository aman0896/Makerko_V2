import React, { createRef, useEffect, useRef } from "react";
import Carousel from "../../Components/LandingPage/Carousel";
// import data from "../../config/SlliderImageData.json";
import { slideData } from "../../Components/LandingPage/data";
// import MakerkoGIF from "../../Components/LandingPage/MakerkoGIF";
import { colors } from "../../Values/colors";
import ProductionCapabilities from "../../Components/LandingPage/ProductionCapabilities";
import productionType from "../../config/ProductionCapabilities.json";
import AboutUs from "../../Components/LandingPage/AboutUs";
import aboutUs from "../../config/AboutUs.json";
import "./Main.css";
import partners from "../../config/Partners.json";
import PartnersAndCollaboration from "../../Components/LandingPage/PartnersAndCollaboration";
import { Button2 } from "../../Components/Button";
import { useHistory, useLocation } from "react-router-dom";
import { useWindowDimensions } from "../../Functions";
import {
    DesktopMediaQuery,
    TabletMediaQuery,
    MobileMediaQuery,
} from "../../Components/ReactResponsize";

function Main() {
    const history = useHistory();
    const location = useLocation();
    console.log(location, "location");
    const slides = slideData;
    const aboutRef = useRef(null);
    const { width } = useWindowDimensions();

    const isTablet = TabletMediaQuery();
    const isMobile = MobileMediaQuery();

    useEffect(() => {
        console.log(location.state, "location line 35 main");
        if (location.state && location.state.toScroll === "aboutUs") {
            scrollFunction();
        } else if (location.pathname === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [location]);

    const scrollFunction = () => {
        if (aboutRef) console.log(aboutRef, "current offset");
        window.scrollTo({
            top: aboutRef.current.offsetTop - 80,
            behavior: "smooth",
        });
    };

    return (
        <div>
            <Carousel slides={slides} />
            {/* <MakerkoGIF /> */}
            <div className="main-box-2">
                <p
                    style={{
                        fontSize: "1.2rem",
                        maxWidth: "90%",
                        textAlign: "center",
                    }}
                >
                    Hundreds of local makers with amazing manufacturing
                    resources are waiting for your order. <br /> Do you have
                    something cool to make it locally?
                </p>
                <a
                    style={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        color: colors.primary,
                        textDecoration: "underline",
                    }}
                    href="/how-it-works"
                    target="_blank"
                >
                    Learn How to Place Orders
                </a>
            </div>
            <ProductionCapabilities productionType={productionType} />
            <div className="main-box-4">
                <div className="main-sub-box-4">
                    <div className="makers-col">
                        <h2>Makers</h2>
                        <p>
                            Explore our manufacturing hubs to select from the
                            portfolio of local makers. Users can sort and filter
                            makers by their preferred company name,
                            manufacturing process, material and location. Users
                            know makers’ production capabilities, products,
                            services, materials and rates by visiting their
                            portfolio.
                        </p>
                        <Button2
                            type="button"
                            buttonSize="button2--medium"
                            onClick={() => {
                                history.push({ pathname: "/makers" });
                            }}
                        >
                            <span>Explores </span>
                            <span style={{ color: colors.primary }}>
                                MAKERS
                            </span>
                        </Button2>

                        <a href="/account/makers-signup">
                            Are you a Maker? Sign Up to build your portfolio
                        </a>
                    </div>
                    <div className="divider"></div>
                    <div className="project-col">
                        <h2>Projects</h2>
                        <p>
                            Share what you make. Someone might be in need of it.
                            The Makerko platform provides makers and innovators
                            greater visibility to their business and product
                            ideas. Explore featured projects to learn how local
                            innovators and makers are applying manufacturing
                            technologies to bring good to humanity.
                        </p>
                        <Button2
                            type="button"
                            buttonSize="button2--medium"
                            onClick={() => {
                                history.push({ pathname: "/projects" });
                            }}
                        >
                            <span>View </span>
                            <span style={{ color: colors.primary }}>
                                PROJECTS
                            </span>
                        </Button2>
                        <a href="/create-project">
                            Share your innovation/ product/ project to feature
                            in our platform.
                        </a>
                    </div>
                </div>
            </div>
            <AboutUs aboutRef={aboutRef} data={aboutUs} />
            <div className="main-quote">
                <img
                    style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        opacity: "0.5",
                    }}
                    src="https://www.whatspaper.com/wp-content/uploads/2021/07/abstract-wallpaper-whatspaper.png"
                    alt="quote"
                />
                <span
                    style={{
                        position: "absolute",
                        width: "80%",
                        textAlign: "center",
                        color: colors.white,
                        fontSize: isMobile
                            ? "1.2rem"
                            : isTablet
                            ? "1.5rem"
                            : "2rem",
                    }}
                >
                    "Distributed Manufacturing is the Future of Production. It
                    Helps you reach your market with near to zero investment in
                    less time and minimum carbon footprint - all done locally."
                </span>
            </div>
            <PartnersAndCollaboration partners={partners} />
            {/* <MakerkoGIF /> */}
            <div>
                <img
                    style={{
                        width: "100%",
                        height: "450px",
                        objectFit: "cover",
                    }}
                    src="https://makerko.com/KnowledgeBank/Vacuum%20Forming%20.jpg"
                    alt=""
                />
            </div>
        </div>
    );
}

export default Main;
