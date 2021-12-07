import React, { useState } from "react";
import Card from "./Card";
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";

function SlideView({
    path,
    cardStyle,
    slides,
    imageStyle,
    titleStyle,
    descriptionStyle = null,
    setImageView,
    imageView,
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

    const [photoIndex, setPhotoIndex] = useState();

    const slidesView = slides.map((slide, index) => {
        const onImageClick = (index) => {
            console.log(index, "inside slide vies");
            setImageView();
            setPhotoIndex(index);
        };
        return (
            <CustomSlide
                path={path}
                cardStyle={cardStyle}
                key={index}
                slide={slide}
                imageStyle={imageStyle}
                titleStyle={titleStyle}
                descriptionStyle={descriptionStyle}
                handleClick={() => onImageClick(index)}
            />
        );
    });

    const modalStyles = {
        content: { marginTop: "70px" },
    };

    return (
        <div>
            {console.log(slides, photoIndex, "image")}
            {imageView && (
                <Lightbox
                    reactModalStyle={modalStyles}
                    mainSrc={`${slides[photoIndex].filePath}`}
                    nextSrc={`${
                        slides[(photoIndex + 1) % slides.length].filePath
                    }`}
                    prevSrc={`${
                        slides[(photoIndex + slides.length - 1) % slides.length]
                            .filePath
                    }`}
                    onCloseRequest={() => setImageView(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex(
                            (photoIndex + slides.length - 1) % slides.length
                        )
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % slides.length)
                    }
                    imagePadding={50}
                    reactModalStyle={modalStyles}
                />
            )}
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
    handleClick,
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
                handleClick={handleClick}
            />
        </div>
    );
};
