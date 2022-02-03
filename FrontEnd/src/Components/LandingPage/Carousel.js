import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

function Carousel({ slides }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        appendDots: (dots) => (
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                }}
            >
                <ul style={{ color: "white", fontsize: "1rem", margin: "0px" }}>
                    {dots}
                </ul>
            </div>
        ),
    };

    const slidesView = slides.map((slide, index) => {
        return <CustomSlide key={index} slide={slide} />;
    });

    return (
        <div
            style={{
                width: "100%",
            }}
        >
            <Slider {...settings}>{slidesView}</Slider>
        </div>
    );
}

export default Carousel;

const CustomSlide = ({ slide }) => {
    const styles = {
        objectFit: "cover",
        width: "100%",
        backgroundPosition: "center",
    };

    return (
        <div
        // className="m-2"
        // onMouseDown={() => {
        //     setSwiping(false);
        // }}
        // onMouseMove={() => {
        //     setSwiping(true);
        // }}
        // onMouseUp={(e) => {
        //     if (!isSwiping && e.button === 0) {
        //         setDrag(true);
        //     } else {
        //         setDrag(false);
        //     }
        //     setSwiping(false);
        // }}
        >
            <img src={slide.image} className="carousel" style={styles} alt="" />
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: "100px",
                    backgroundImage:
                        "linear-gradient(rgb(255, 255, 255, 0.1), rgb(255, 255, 255, 0.5))",
                }}
            />
        </div>
    );
};
