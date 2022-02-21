import React from "react";
import Blogs from "../../config/Blogs.json";
import { useWindowDimensions } from "../../functions/Functions";
import "./BlogComponent.css";
import Button from "../Button";
import { divIcon } from "leaflet";
import SlideView from "../slideView/SlideView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../Values/colors";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const fontWeignt = { fontWeight: "lighter" };
const imgWidth = { maxWidth: "400px", maxHeight: "400px" };
function BlogComponent(props) {
    const {
        title,
        description,
        contents,
        author,
        gallary,
        coverImage,
        pdfFile,
        productionDetails,
        publishDate,
        editable,
        trashIconClick,
        editIconClick,
    } = props;

    const { width, height } = useWindowDimensions();
    console.log(props, "props");
    const cardStyle = {
        background: "white",
        borderRadius: "5px",
        overflow: "hidden",
        height: "392px",
        width: "98%",
    };

    console.log(author, "author");

    return (
        <div>
            <img
                src={coverImage}
                style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    backgroundPosition: "center",
                }}
                alt=""
            />
            {editable && (
                <div className="d-flex justify-content-end mx-5 my-2">
                    <FontAwesomeIcon
                        style={{ marginRight: 2, color: colors.success }}
                        icon={faEdit}
                        size="lg"
                        onClick={editIconClick}
                    />
                    <FontAwesomeIcon
                        style={{ marginLeft: 5, color: colors.danger }}
                        icon={faTrashAlt}
                        size="lg"
                        onClick={trashIconClick}
                    />
                </div>
            )}
            <div className="contain--80">
                <div
                    className="heading"
                    style={{ fontSize: "36px", color: "#000000" }}
                >
                    {title}
                </div>
                <div>{description}</div>
            </div>
            <div style={{ background: "#C4C4C4", marginTop: "150px" }}>
                <SlideView
                    showImage={true}
                    className="mt-5 mb-5"
                    slides={gallary}
                    imageStyle={{ height: "100%", width: "100%" }}
                    cardStyle={cardStyle}
                />
            </div>
            {contents.map((content, index) => (
                <div className="contain--80 row">
                    <div
                        className={
                            content.image_position.direction === "right"
                                ? "col-xl-6 col-lg-6 col-md-6"
                                : "col-xl-6 col-lg-6 col-md-6 position_img d-flex justify-content-end"
                        }
                    >
                        <img
                            style={{
                                width: width < 768 ? "100%" : "80%",
                                height: "100%",
                            }}
                            src={content.content_image}
                            alt=""
                        />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="heading" style={{ fontSize: "24px" }}>
                            {content.content_title}
                        </div>
                        <div
                            className="text_align pt-3 sub-heading"
                            style={fontWeignt}
                        >
                            {content.content_details}
                        </div>
                    </div>
                </div>
            ))}
            <div
                className="mb-5 sub-heading d-flex justify-content-around align-items-center"
                style={{ background: "#000000", height: "170px" }}
            >
                <div style={{ fontSize: "24px", color: "white" }}>
                    Download the pdf here
                </div>
                <div className="d-flex align-items-center h-100">
                    <Button
                        buttonStyle="button--white--solid"
                        buttonSize="button--medium"
                        style={{
                            fontSize: "18px",
                        }}
                    >
                        Download
                    </Button>
                </div>
            </div>
            <div className="contain--80 mt-3 d-flex flex--colm">
                <img
                    style={{ width: "256px" }}
                    src={
                        author.Profile_Image
                            ? author.Profile_Image
                            : author.Logo
                    }
                    alt=""
                />
                <div className="d-flex flex-column justify-content-between pad-mar">
                    <span className="heading mt-3" style={{ fontSize: "36px" }}>
                        {author.First_Name
                            ? author.First_Name + " " + author.Last_Name
                            : author.Company_Name}
                    </span>
                    <div className="pb-5">
                        <span className="download_text_size sub-heading ">
                            {author.Address}
                        </span>
                        <br />
                        <span className="sub-heading download_text_size">
                            {author.Phone_Number}
                        </span>
                    </div>

                    <div>
                        <Button
                            buttonStyle="button--primary--solid"
                            buttonSize="button--small"
                            style={{
                                fontSize: "14px",
                            }}
                        >
                            Check profile
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogComponent;
