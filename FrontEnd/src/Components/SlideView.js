import React, { useState } from "react";
import Card from "./Card";
import Slider from "react-slick";

function SlideView({
    path,
    cardStyle,
    slides,
    imageStyle,
    titleStyle,
    descriptionStyle = null,
}) {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    const slidesView = slides.map((slide, index) => {
        return (
            <CustomSlide
                path={path}
                cardStyle={cardStyle}
                key={index}
                slide={slide}
                imageStyle={imageStyle}
                titleStyle={titleStyle}
                descriptionStyle={descriptionStyle}
            />
        );
    });

    return (
        <div>
            <Slider {...settings}>{slidesView}</Slider>
        </div>
    );
}

export default SlideView;

const CustomSlide = ({
    path,
    cardStyle,
    slide,
    imageStyle,
    titleStyle,
    descriptionStyle,
}) => {
    const [isSwiping, setSwiping] = useState(false);
    const [isDrag, setDrag] = useState(false);

    return (
        <div
            className="m-2"
            onMouseDown={() => {
                setSwiping(false);
            }}
            onMouseMove={() => {
                setSwiping(true);
            }}
            onMouseUp={(e) => {
                if (!isSwiping && e.button === 0) {
                    setDrag(true);
                } else {
                    setDrag(false);
                }
                setSwiping(false);
            }}
        >
            <Card
                path={path}
                cardStyle={cardStyle}
                data={slide}
                imageStyle={imageStyle}
                titleStyle={titleStyle}
                descriptionStyle={descriptionStyle}
            />
        </div>
    );
};
