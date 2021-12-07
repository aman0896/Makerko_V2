import React from "react";
import Carousel from "../../Components/LandingPage/Carousel";
import data from "../../config/Data.json";
import MakerkoGIF from "../../Components/LandingPage/MakerkoGIF";
import { colors } from "../../Values/colors";
import ProductionCapabilities from "../../Components/LandingPage/ProductionCapabilities";
import productionType from "../../config/ProductionCapabilities.json";
import AboutUs from "../../Components/LandingPage/AboutUs";
import aboutUs from "../../config/AboutUs.json";
import "./Main.css";
import partners from "../../config/Partners.json";
import PartnersAndCollaboration from "../../Components/LandingPage/PartnersAndCollaboration";
import Button, { Button2 } from "../../Components/Button";

function Main() {
    const slides = data;
    return (
        <div>
            <Carousel slides={slides} />
            <MakerkoGIF />
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
                    href="https://www.google.com"
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
                        <Button2 type="button" buttonSize="button2--medium">
                            <span>Explores </span>
                            <span style={{ color: colors.primary }}>
                                MAKERS
                            </span>
                        </Button2>

                        <a href="#">
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
                        <Button2 type="button" buttonSize="button2--medium">
                            <span>View </span>
                            <span style={{ color: colors.primary }}>
                                PROJECTS
                            </span>
                        </Button2>
                        <a href="#">
                            Share your innovation/ product/ project to feature
                            in our platform.
                        </a>
                    </div>
                </div>
            </div>
            <AboutUs data={aboutUs} />
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
                        fontSize: "2rem",
                        textAlign: "center",
                        color: colors.white,
                    }}
                >
                    “Creativity is allowing yourself to make mistakes. Art is
                    knowing which ones to keep.” - Susan Tamrakar
                </span>
            </div>
            <PartnersAndCollaboration partners={partners} />
            <MakerkoGIF />
            <div>
                <img
                    style={{
                        width: "100%",
                        height: "450px",
                        objectFit: "cover",
                    }}
                    src="https://makerko.com/KnowledgeBank/Vacuum%20Forming%20.jpg"
                    alt="image"
                />
            </div>
        </div>
    );
}

export default Main;
