import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { File_Server } from "../common/Link";
import Lightbox from "react-image-lightbox";
import "./Carousel.css";

export default function Carousel({ slides, path = "" }) {
    console.log(slides);
    const [viewImage, setViewImage] = useState(false);
    const [photoIndex, setPhotoIndex] = useState();

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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

    const onImageClick = (index) => {
        setViewImage(true);
        setPhotoIndex(index);
    };

    const slidesView = slides.map((slide, index) => {
        return (
            <CustomSlide
                key={index}
                slide={slide}
                index={index}
                setViewImage={setViewImage}
                onClick={onImageClick}
            />
        );
    });

    const modalStyles = {
        content: { marginTop: "70px" },
    };

    return (
        <div>
            {viewImage && (
                <Lightbox
                    reactModalStyle={modalStyles}
                    mainSrc={`${File_Server}${slides[photoIndex].filePath}`}
                    nextSrc={`${File_Server}${
                        slides[(photoIndex + 1) % slides.length].filePath
                    }`}
                    prevSrc={`${File_Server}${
                        slides[(photoIndex + slides.length - 1) % slides.length]
                            .filePath
                    }`}
                    onCloseRequest={() => setViewImage(false)}
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

            <Slider prev {...settings}>
                {slidesView}
            </Slider>
        </div>
    );
}

const CustomSlide = ({ slide, setViewImage, onClick, index }) => {
    const [isSwiping, setSwiping] = useState(false);
    const [isDrag, setDrag] = useState(false);

    const styles = {
        borderWidth: "5px",
        borderRadius: "5px",
        objectFit: "cover",
        width: "100%",
        height: "300px",
    };

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
            <img
                src={`${File_Server}${slide.filePath}`}
                style={styles}
                onClick={() => isDrag && onClick(index)}
            />
        </div>
    );
};

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
};
