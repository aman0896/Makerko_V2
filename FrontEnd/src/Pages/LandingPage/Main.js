import React from "react";
import Section from "../../Components/Section";
import Carousel from "../../Components/LandingPage/Carousel";
import data from "../../config/Data.json";
import MakerkoGIF from "../../Components/LandingPage/MakerkoGIF";
import { colors } from "../../Values/colors";

function Main() {
    const slides = data;
    return (
        <Section>
            <div>
                <Carousel slides={slides} />
                <MakerkoGIF />
                <div className="d-flex flex-column align-items-center justify-content-center pt-5 pb-5">
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
                        href="#"
                    >
                        Learn How to Place Orders
                    </a>
                </div>
            </div>
        </Section>
    );
}

export default Main;
