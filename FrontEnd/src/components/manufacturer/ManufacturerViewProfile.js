import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faEnvelope,
    faMapMarker,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import StarRating, {
    AverageRatingNum,
    StarRatingAverage,
} from "../starrating/StarRating";
import MfgProcessViewSelected from "./MfgProcessViewSelected";
import { Redirect, useParams } from "react-router";
import Footer from "../main/footer";
import Button from "../global/Button";
import { File_Server } from "../common/Link";
import Carousel from "../global/Carousel";
import NotFoundErr from "../global/404Error";

function ManufacturerViewProfile(props) {
    const [data, setData] = useState();
    const [serviceList, setServiceList] = useState([]);
    const [filePath, setFilePath] = useState();
    const [averageRating, setAverageRating] = useState();
    const [totalRatings, setTotalRatings] = useState();
    //const [overallRatingArray, setOverallRatingArray] = useState();
    const [otherServices, setOtherServices] = useState([]);
    const [slides, setSlides] = useState([]);
    const { id, companyname } = useParams();
    console.log("manufactuerer", id, companyname);

    var [hubService, setHubService] = useState();
    const [coverImagePath, setCoverImagePath] = useState();

    useEffect(() => {
        axios
            .get(`${window.host}/manufacturer/${id}/${companyname}`)
            .then((response) => {
                if (response.data) {
                    const { hub, services } = response.data;
                    setData(hub[0]);
                    setServiceList(services);
                    console.log(
                        hub[0].Additional_Images,
                        "multipleimages....."
                    );
                    if (hub[0].Other_Services) {
                        setOtherServices(JSON.parse(hub[0].Other_Services));
                    }
                    if (hub[0].Logo) {
                        const { filePath } = JSON.parse(hub[0].Logo);
                        setFilePath(filePath);
                    }
                    if (hub[0].CoverImage) {
                        const { fileName, filePath } = JSON.parse(
                            hub[0].CoverImage
                        );
                        setCoverImagePath({ fileName, filePath });
                    }
                    let additionalImages = JSON.parse(hub[0].Additional_Images);
                    setSlides(additionalImages);
                    //   let filePath = [];
                    //   additionalImages.forEach((item) => filePath.push(item.filePath));
                }
            })
            .catch((err) => {
                return <NotFoundErr />;
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${window.host}/manufacturer/${id}/${companyname}`)
            .then((response) => {
                if (response.data) {
                    const { services } = response.data;
                    // setCurrentHub(hub[0]);
                    const hubService = services.map((service) => {
                        console.log(service);
                        const { Name, Material_Name, Service_ID } = service;
                        var data = {
                            selectedFabrication: {
                                value: Service_ID,
                                Name: Name,
                            },
                            materialDetails: JSON.parse(Material_Name),
                        };
                        return data;
                    });
                    //console.log('hubs', hubService[0], typeof hubService);
                    setHubService(hubService);
                }
            });
    }, []);

    //#region view_otherservices
    const otherServiceList = otherServices.map((otherService, index) => {
        const serviceName = otherService.serviceName;
        const materials = otherService.materials;
        return (
            <div key={index} className="pl-3">
                <ul className="p-1 m-0" style={{ listStyle: "none" }}>
                    <li>
                        <OtherService
                            service={serviceName}
                            materials={materials}
                        />
                    </li>
                </ul>
            </div>
        );
    });
    //#endregion

    var services = serviceList.map((service, index) => {
        const { Name } = service;
        return (
            <div key={index}>
                <div className="col m-0 p-0">
                    <span className="mt-2 text-white">
                        <h6
                            className="p-2 m-1"
                            style={{
                                backgroundColor: "#5044FD",
                                borderRadius: "5px",
                                width: "140px",
                                textAlign: "center",
                            }}
                        >
                            {Name}
                        </h6>
                    </span>
                </div>
            </div>
        );
    });

    return (
        <>
            {console.log("checked", data, filePath)}
            {data && (
                <div>
                    <div
                        className="mb-4"
                        style={{
                            marginTop: "25px",
                            backgroundImage: `url(${
                                coverImagePath
                                    ? `${File_Server}${coverImagePath.filePath}`
                                    : ""
                            })`,
                            paddingTop: "30%",
                            width: "100%",
                            backgroundPosition: "center",
                            backgroundSize: "100%",
                        }}
                    />
                    <div className="container">
                        <div className="row mb-4 pl-3">
                            <div className="col-md-3">
                                <img
                                    src={`${File_Server}${filePath}`}
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                    }}
                                    alt=""
                                />
                            </div>
                            <div className="col-md-9 d-flex justify-content-center align-items-center ">
                                <div
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                >
                                    <h4 className="text-dark pl-3 pt-3 mb-4 font-weight-bold">
                                        {data.Company_Name}
                                    </h4>
                                    <p
                                        className="pl-3 pr-3"
                                        style={{
                                            textAlign: "justify",
                                        }}
                                    >
                                        {data.Brief_Description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="mt-2 mr-5 ml-2">
                            <div
                                className="row offset-1"
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    height: "100px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div className="col-lg">
                                    <StarRatingView
                                        averageRating={averageRating}
                                        totalRatings={totalRatings}
                                    />
                                </div>

                                <div className="col-lg pr-5">
                                    <div
                                        className="row d-flex justify-content-center"
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        Delivery:
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        Within 20km
                                    </div>
                                </div>
                                <div className="col-lg">
                                    <div
                                        className="row d-flex justify-content-center"
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        Location:
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        {data.Address}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {data.Slogan && (
                        <div
                            className="mt-5 pl-3 d-flex justify-content-center align-items-center flex-column"
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                fontWeight: "700px",
                                minHeight: "200px",
                                fontSize: "16px",
                                textAlign: "center",
                            }}
                        >
                            {data.Slogan}
                        </div>
                    )}
                    <div className="container mt-5">
                        <div className="row m-auto">
                            <div className="col-lg-4 ml-2 mr-0">
                                <div className="row">
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    >
                                        <div className="row m-auto">
                                            <h4 className="text-dark pl-3 pt-3 font-weight-bold mb-4 pb-2">
                                                Fabrication Services
                                            </h4>
                                        </div>
                                        <div className="row m-auto pb-2 pl-3">
                                            {services}
                                        </div>
                                    </div>
                                </div>
                                {otherServices.length > 0 && (
                                    <div className="row mt-4">
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                paddingBottom: 5,
                                            }}
                                        >
                                            <div className="row m-auto">
                                                <h4 className="text-dark pl-3 pt-3 mb-4 font-weight-bold">
                                                    Other Services:
                                                </h4>
                                            </div>

                                            <div className="row m-auto d-flex flex-column">
                                                {otherServiceList}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="row mt-5">
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    >
                                        <div className="row m-auto pl-3 pt-3">
                                            <h4 className="font-weight-bold">
                                                Contact
                                            </h4>
                                        </div>
                                        <ContactInformationView
                                            icon={faPhone}
                                            label="Phone"
                                            info={data.Phone_Number}
                                            rotation={90}
                                        />
                                        <ContactInformationView
                                            icon={faEnvelope}
                                            label="Email"
                                            info={data.Email}
                                        />
                                        <ContactInformationView
                                            icon={faChrome}
                                            label="Website"
                                            info={
                                                data.Website
                                                    ? data.Website
                                                    : "-"
                                            }
                                            link={true}
                                        />
                                        <ContactInformationView
                                            icon={faMapMarker}
                                            label="Location"
                                            info={data.Address}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    >
                                        <div className="mb-3">
                                            <h4 className="text-dark pl-3 pt-3 font-weight-bold m-0">
                                                Rate this Manufacturing Hub
                                            </h4>
                                            <span
                                                className="pl-3 pt-4"
                                                style={{ fontSize: "16px" }}
                                            >
                                                Tell others what you think
                                            </span>
                                        </div>
                                        <div className="pl-3 pr-3 pb-3 d-flex justify-content-center">
                                            <StarRating
                                                widgetDimensions="30px"
                                                widgetSpacing="20px"
                                                setAverageRating={
                                                    setAverageRating
                                                }
                                                setTotalRatings={
                                                    setTotalRatings
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg  m-2  mb-4">
                                {data.Additional_Details && (
                                    <div className="row">
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                            }}
                                        >
                                            <h4 className="text-dark pt-3 font-weight-bold mb-4 pb-2">
                                                About {data.Company_Name}
                                            </h4>
                                            <p
                                                className="pr-3"
                                                style={{
                                                    fontSize: 16,
                                                    textAlign: "justify",
                                                }}
                                            >
                                                {data.Additional_Details}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="row">
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    >
                                        <div className="mb-3">
                                            <h4 className="text-dark pt-3 font-weight-bold m-0">
                                                Manufacturing Services
                                            </h4>
                                        </div>
                                        {hubService && (
                                            <div
                                                className=""
                                                style={{ width: "100%" }}
                                            >
                                                <MfgProcessViewSelected
                                                    viewsData={hubService}
                                                    deleteicon={false}
                                                    showProfile={true}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-center text-dark font-weight-bold">
                                Photos
                            </h4>
                            <div>
                                {slides && (
                                    <Carousel
                                        slides={slides}
                                        path="makerViewProfile"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <div
                                className="mt-5 ml-3"
                                style={{
                                    color: "#A0A0A0",
                                    letterSpacing: "0.3px",
                                }}
                            >
                                Found what you are looking for?
                            </div>
                            <Button
                                btnName="Get a Quote"
                                styleClass="btn btn-lg d-flex justify-content-center mb-5 mt-2"
                                toggle="modal"
                                target="#placeOrderModal"
                                style={{
                                    paddingLeft: "100px",
                                    paddingRight: "100px",
                                    fontSize: "16px",
                                    backgroundColor: "#5044FD",
                                    borderRadius: "5px",
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "center",
                                    textAlign: "center",
                                }}
                            />
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
}

export default ManufacturerViewProfile;

const ContactInformationView = ({
    icon,
    label,
    info,
    rotation,
    link = false,
}) => {
    var httpString = "https://";
    var httpLink = httpString.concat(info);

    return (
        <>
            <div className="row m-auto pl-3 pt-3">
                <span className="col-1">
                    <FontAwesomeIcon
                        icon={icon}
                        size="1x"
                        rotation={rotation}
                    />
                </span>
                {link ? (
                    <a
                        className="col-1"
                        style={{
                            fontSize: 16,
                            color: "black",
                            textDecoration: "underline",
                        }}
                        href={httpLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {info}
                    </a>
                ) : (
                    <span className="col-1" style={{ fontSize: 16 }}>
                        {info}
                    </span>
                )}
            </div>
        </>
    );
};

const StarRatingView = ({ averageRating = 0, totalRatings = 0 }) => {
    //const averageRating = 2;
    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div
                    style={{
                        display: "flex",
                        backgroundColor: "#5044fd",
                        borderRadius: "5px",
                        height: "50px",
                        width: "50px",

                        fontSize: "26px",
                        fontWeight: "bold",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                    }}
                >
                    <AverageRatingNum averageRating={averageRating} />
                </div>
                <div>
                    <div
                        className="ml-3"
                        style={{
                            backgroundColor: "white",
                        }}
                    >
                        <StarRatingAverage
                            averageRating={averageRating}
                            widgetDimensions="25px"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const OtherService = ({ service, materials }) => {
    const [visibleMaterial, setVisibleMaterial] = useState(false);

    const onClickChevron = () => {
        setVisibleMaterial(!visibleMaterial);
    };

    const chaveronToggleOn = {
        marginRight: 5,
        transition: "all 0.5s ease",
        transform: "rotate(90deg)",
    };

    const chaveronToggleOff = {
        marginRight: 5,
        transition: "all 0.5s ease",
    };

    return (
        <div>
            <span>
                <span className="mt-2 text-white">
                    <h6
                        className="p-2"
                        style={{
                            backgroundColor: "#5044FD",
                            borderRadius: "5px",
                            width: "140px",
                        }}
                    >
                        <FontAwesomeIcon
                            style={
                                visibleMaterial
                                    ? chaveronToggleOn
                                    : chaveronToggleOff
                            }
                            icon={faChevronRight}
                            onClick={() => onClickChevron()}
                            size="md"
                        />
                        {service}
                    </h6>
                </span>
            </span>

            {visibleMaterial && (
                <ul
                    className="pl-5"
                    style={{
                        fontSize: "14px",
                        color: "black",
                    }}
                >
                    {materials.map((material, index) => {
                        return <li key={index}>{material}</li>;
                    })}
                </ul>
            )}
        </div>
    );
};
