import React, { useState } from "react";
import Card from "../Card";
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import "./SlideView.css";
import "react-image-lightbox/style.css";

function SlideView({
    className,
    path,
    cardStyle,
    slides,
    imageStyle,
    titleStyle,
    descriptionStyle = null,
    showImage,
}) {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [imageView, setImageView] = useState(false);
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,
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
        setImageView(true);
        setPhotoIndex(index);
    };
    const onCloseClick = () => {
        setImageView(false);
    };
    const slidesView = slides.map((slide, index) => {
        return (
            <div className={className}>
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
            </div>
        );
    });

    const modalStyles = {
        content: { marginTop: "80px" },
    };

    return (
        <div>
            {imageView && showImage && (
                <Lightbox
                    mainSrc={slides[photoIndex].image}
                    nextSrc={slides[(photoIndex + 1) % slides.length].image}
                    prevSrc={
                        slides[(photoIndex + slides.length - 1) % slides.length]
                            .image
                    }
                    onCloseRequest={onCloseClick}
                    onMovePrevRequest={() =>
                        setPhotoIndex(
                            (photoIndex + slides.length - 1) % slides.length
                        )
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % slides.length)
                    }
                    reactModalStyle={modalStyles}
                />
            )}
            <Slider {...settings}>{slidesView}</Slider>
        </div>
    );
}

export default SlideView;

// const NextArrow = (props) => {
//     const { className, style, onClick } = props;
//     return (
//         <div className={className} style={style} onClick={onClick}>
//             next
//         </div>
//     );
// };

// const PrevArrow = (props) => {
//     const { className, style, onClick } = props;
//     return <div className={className} style={{ ...style }} onClick={onClick} />;
// };

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
                handleClick={isDrag && handleClick}
            />
        </div>
    );
};
