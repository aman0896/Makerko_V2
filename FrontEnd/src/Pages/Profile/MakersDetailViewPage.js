import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import CardViewComponent from "../../Components/card/CardViewComponent";
import SlideView from "../../Components/slideView/SlideView";
import TableComponent from "../../Components/table/TableComponent";
import { useWindowDimensions } from "../../functions/Functions";
import { colors } from "../../Values/colors";
import "./Profile.css";
import { HiPhone } from "react-icons/hi";
import { MdMail } from "react-icons/md";
import StarRating, {
    StarRatingAverage,
} from "../../Components/starRating/StarRating";
import {
    QuoteButton,
    ServicesComponent,
    TextIconComponent,
} from "./ProfileComponent";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FileDownload } from "../../commonApi/CommonApi";
import { FeatureProjectList } from "../../Components/Redux/Actions/FeatureProjectList";
import { webDomain } from "../../commonApi/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { SET_LOCATION_PATHNAME } from "../../Components/Redux/Actions/Types";

export default function MakersDetailViewPage() {
    //#region hooks call
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    //#endregion

    const { height, width } = useWindowDimensions();

    //#region State Define
    const [profileImagePreview, setProfileImagePreview] = useState();
    const [maker, setMaker] = useState();
    const [services, setServices] = useState();
    const [featureProject, setFeatureProject] = useState();
    const [coverImage, setCoverImage] = useState();
    const [imageGallary, setImageGallary] = useState();
    const [otherServices, setOtherServices] = useState();
    const [methods, setMethods] = useState();
    const [myProfile, setMyProfile] = useState(false);
    const [coverImagePreview, setCoverImagePreview] = useState();
    //#endregion

    //#region react redux call
    const makersList = useSelector((state) => state.makersList.makersList);
    const makersServices = useSelector(
        (state) => state.makersServices.services
    );
    const process = useSelector((state) => state.method.method);
    const projectList = useSelector((state) => state.projectList.projectList);
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );
    //#endregion

    useEffect(() => {
        if (currentUserData && id) {
            if (
                Object.keys(currentUserData).includes("Manufacturer_ID") &&
                currentUserData.Manufacturer_ID == id
            ) {
                setMyProfile(true);
            } else {
                setMyProfile(false);
            }
        }
    }, [currentUserData, id]);

    useEffect(() => {
        async function GetMakerData() {
            if (makersList && makersServices) {
                makersList.filter(async (maker) => {
                    if (maker.Manufacturer_ID === id) {
                        setMaker(maker);

                        //cover image
                        if (maker.CoverImage) {
                            const imageData = JSON.parse(maker.CoverImage);
                            const imageBlob = await FileDownload(
                                imageData.filePath
                            );
                            const coverImageUrl = window.URL.createObjectURL(
                                new Blob([imageBlob])
                            );
                            setCoverImagePreview(coverImageUrl);
                        } else {
                            setCoverImagePreview(
                                `${webDomain}assests/makerlogo.jpg`
                            );
                        }

                        //profile image
                        if (maker.Logo) {
                            const imageData = JSON.parse(maker.Logo);
                            const imageBlob = await FileDownload(
                                imageData.filePath
                            );
                            const profileImageUrl =
                                window.URL.createObjectURL(imageBlob);
                            setProfileImagePreview(profileImageUrl);
                        } else {
                            setProfileImagePreview(
                                `${webDomain}assests/makerlogo.jpg`
                            );
                        }

                        //gallary image
                        let filesUrl = [];
                        if (maker.Additional_Images) {
                            const gallaryImage = JSON.parse(
                                maker.Additional_Images
                            );
                            for (let i = 0; i < gallaryImage.length; i++) {
                                const imageBlob = await FileDownload(
                                    gallaryImage[i].filePath,
                                    null
                                );
                                const gallaryImageUrl =
                                    window.URL.createObjectURL(imageBlob);
                                filesUrl.push({
                                    image: gallaryImageUrl,
                                });
                            }
                            setImageGallary(filesUrl);
                        }

                        //otherservices
                        let otherServiceNameList = [];
                        const otherServices = JSON.parse(maker.Other_Services);
                        for (let i = 0; i < otherServices.length; i++) {
                            otherServiceNameList.push({
                                name: otherServices[i].serviceName,
                            });
                        }
                        setOtherServices(otherServiceNameList);
                    }
                });

                const services = makersServices.filter(
                    (service) => service.Manufacturer_ID === id
                );
                setServices(services);
            }
        }

        GetMakerData();

        function SetFeatureProjectList() {
            if (projectList) {
                console.log(projectList, "list");
                const ownProjects = projectList.filter(
                    (project) => project.Author_ID === id
                );
                setFeatureProject(ownProjects);
            }
        }

        SetFeatureProjectList();
    }, [makersList, makersServices, projectList, id]);

    useEffect(() => {
        //get featureProject List
        FeatureProjectList(dispatch);
    }, []);

    useEffect(() => {
        if (process) {
            setMethods(process);
        }
    }, [process]);

    const methodsName = [];

    console.log(methods, "methods");

    const showServices =
        services &&
        services.map((service) => {
            return (
                methods &&
                methods.length > 0 &&
                methods.map((method) => {
                    if (method.Service_ID === service.Service_ID) {
                        console.log(method.Name, "method");
                        console.log(
                            JSON.parse(service.Material_Name),
                            "service"
                        );
                        methodsName.push({ name: method.Name });
                        return (
                            <>
                                <div className="mb-5">
                                    <div className="border tableMainHeader">
                                        <h2 className="mx-5">{method.Name}</h2>
                                    </div>
                                    <TableComponent
                                        column={column}
                                        data={JSON.parse(service.Material_Name)}
                                    />
                                </div>
                            </>
                        );
                    }
                })
            );
        });

    useEffect(() => {
        async function SetCoverImage() {
            let data = [];
            if (featureProject) {
                for (let i = 0; i < featureProject.length; i++) {
                    const imageData = JSON.parse(featureProject[i].Cover_Image);
                    const imageBlob = await FileDownload(imageData.filePath);
                    const previewUrl = window.URL.createObjectURL(
                        new Blob([imageBlob])
                    );
                    data.push({
                        previewUrl: previewUrl,
                        projectId: featureProject[i].Project_ID,
                    });
                }
            }
            setCoverImage(data);
        }

        SetCoverImage();
    }, [featureProject]);

    const showFeatureProject =
        featureProject &&
        featureProject.map((project, index) => {
            return (
                coverImage &&
                coverImage.map((image) => {
                    if (image.projectId === project.Project_ID) {
                        return (
                            <CardViewComponent
                                key={index}
                                imageStyle={{
                                    backgroundImage: `url(${image.previewUrl})`,
                                }}
                                title={project.Title}
                                description={project.Description}
                            />
                        );
                    }
                })
            );
        });

    const onEditBtnClick = () => {
        history.push({ pathname: "/profile/makers/edit" });
        dispatch({
            type: SET_LOCATION_PATHNAME,
            pathname: "/profile/customer/edit",
        });
    };
    const onProjectBtnClick = () => {
        history.push({ pathname: "/profile/myprojects" });
        dispatch({
            type: SET_LOCATION_PATHNAME,
            pathname: "/profile/myprojects",
        });
    };

    const onBlogBtnClick = () => {
        console.log("open blog");
    };

    return (
        <div style={{ minHeight: height - 80, backgroundColor: colors.dark }}>
            {maker && (
                <>
                    <img
                        src={coverImagePreview}
                        style={{
                            width: "100%",
                            height:
                                width <= 500
                                    ? "300px"
                                    : width <= 766
                                    ? "400px"
                                    : "600px",
                            backgroundPosition: "center",
                            objectFit: "cover",
                        }}
                        alt="Profile Cover"
                    />
                    {myProfile && (
                        <div className="d-flex justify-content-end mx-5 my-2">
                            <Button
                                style={{
                                    marginRight: 2,
                                    fontSize: "0.9rem",
                                    fontWeight: 700,
                                }}
                                buttonStyle="button--white--solid"
                                buttonSize="button--small"
                                onClick={onEditBtnClick}
                            >
                                <FontAwesomeIcon
                                    style={{ marginRight: 2 }}
                                    icon={faEdit}
                                    size="xl"
                                />
                                Edit Profile
                            </Button>
                        </div>
                    )}
                    <div className="row m-auto">
                        <div
                            className="col-4"
                            style={{ display: width < 768 ? "none" : "block" }}
                        >
                            <div className="ml-md-5 d-flex align-items-center flex-column">
                                <div className="bg-white stack-top px-4 py-3">
                                    <div className="bg-white d-flex align-items-center flex-column py-2 text-center">
                                        <div className="my-4 p-3 webLogo">
                                            <img
                                                src={profileImagePreview}
                                                alt="logo"
                                                style={{
                                                    width: "inherit",
                                                    height: "inherit",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="heading">
                                                {maker.Company_Name}
                                            </h4>
                                            <p className="px-3">
                                                {maker.Brief_Description}
                                            </p>
                                            <a
                                                style={{
                                                    color: colors.primary,
                                                }}
                                                href={`https://${maker.Website}/`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {maker.Website}
                                            </a>
                                            <p>{maker.Address}</p>
                                        </div>
                                        {myProfile === false && (
                                            <div>
                                                <QuoteButton
                                                    value="get a quote"
                                                    textTransform="capitalize"
                                                    buttonStyle="button--primary--solid"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <StarRatingAverage
                                                widgetDimensions="20px"
                                                averageRating={3.5}
                                            />
                                        </div>
                                    </div>
                                    <ServicesComponent
                                        header="Fabrication Services"
                                        services={methodsName}
                                    />
                                    {/* <ServicesComponent
                                        header="Other Services"
                                        services={otherServices}
                                    /> */}
                                    <>
                                        <div className="heading my-3 mt-5">
                                            Contact
                                        </div>
                                        <TextIconComponent
                                            icon={<HiPhone />}
                                            text={maker.Phone_Number}
                                        />
                                        <TextIconComponent
                                            icon={<MdMail />}
                                            text={maker.Email}
                                        />
                                    </>
                                    <>
                                        <div className="mb-4">
                                            <b>Rate this Manufactoring Hub</b>
                                            <label>
                                                Tell others what you think
                                            </label>
                                            <StarRating
                                                widgetDimensions="25px"
                                                widgetSpacing="5px"
                                            />
                                        </div>
                                    </>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 mt-5 text-justify text-white">
                            <div
                                style={{
                                    display: width < 768 ? "block" : "none",
                                }}
                            >
                                <h4 className="heading">
                                    {maker.Company_Name}
                                </h4>
                                <div className="my-4 p-3 mobileLogo">
                                    <img
                                        src={profileImagePreview}
                                        alt="logo"
                                        style={{
                                            width: "inherit",
                                            height: "inherit",
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                                <p className="px-3">
                                    {maker.Brief_Description}
                                </p>
                                <div className="text-center mb-5">
                                    <p>
                                        {maker.Website}
                                        <br />
                                        {maker.Address}
                                    </p>
                                    {myProfile === false && (
                                        <div>
                                            <QuoteButton
                                                value="get a quote"
                                                textTransform="capitalize"
                                                buttonStyle="button--primary--solid"
                                            />
                                        </div>
                                    )}
                                    <div className="w-100 d-flex justify-content-center">
                                        <StarRatingAverage
                                            widgetDimensions="20px"
                                            averageRating={3.5}
                                            ratingBlockColor="primary"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className="heading mb-3 text-left"
                                style={{ fontSize: width < 768 ? 20 : 38 }}
                            >
                                About {maker.Company_Name}
                            </div>
                            <p>{maker.Additional_Details}</p>
                            <>
                                <div
                                    className="heading mb-3"
                                    style={{ fontSize: width < 768 ? 20 : 38 }}
                                >
                                    Manufacturing Services
                                </div>
                                {showServices}
                                <div
                                    style={{
                                        display: width < 768 ? "block" : "none",
                                    }}
                                >
                                    <ServicesComponent
                                        header="Fabrication Services"
                                        services={services}
                                        style={{
                                            fontSize: width < 768 ? 20 : 38,
                                        }}
                                    />
                                    {/* <ServicesComponent
                                        header="Other Services"
                                        services={otherServices}
                                        style={{
                                            fontSize: width < 768 ? 20 : 38,
                                        }}
                                    /> */}
                                </div>
                            </>

                            <div className="mt-5">
                                <Button
                                    buttonStyle="button--white--solid"
                                    style={{ fontWeight: 700 }}
                                    onClick={onProjectBtnClick}
                                >
                                    Projects
                                </Button>
                                <div className="d-flex flex-column flex-md-row justify-content-between">
                                    {coverImage && showFeatureProject}
                                    {/* {featureProject &&
                                        featureProject
                                            .slice(0, 2)
                                            .map((item, index) => (
                                                <CardViewComponent
                                                    key={index}
                                                    imageStyle={{
                                                        backgroundImage: `url(${item.image})`,
                                                    }}
                                                    title={item.title}
                                                    description={
                                                        item.description
                                                    }
                                                />
                                            ))} */}
                                </div>
                            </div>

                            <div className="mt-5">
                                <Button
                                    buttonStyle="button--white--solid"
                                    style={{ fontWeight: 700 }}
                                    onClick={onBlogBtnClick}
                                >
                                    Blogs
                                </Button>
                                <div className="d-flex flex-column flex-md-row justify-content-between">
                                    {blog &&
                                        blog.slice(0, 2).map((item, index) => (
                                            <CardViewComponent
                                                key={index}
                                                imageStyle={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}
                                                title={item.title}
                                                description={item.description}
                                            />
                                        ))}
                                </div>
                            </div>

                            {!myProfile && (
                                <div>
                                    <p
                                        className="text-center mt-5"
                                        style={{
                                            width: width < 768 ? "100%" : "50%",
                                        }}
                                    >
                                        Found what you are looking for?
                                    </p>
                                    <Button
                                        buttonStyle="button--white--solid"
                                        buttonSize={
                                            width < 768
                                                ? "button--large--100"
                                                : "button--large--50"
                                        }
                                    >
                                        <b>Get A Quote</b>
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div
                            className="text-white text-center w-100 p-3 heading mt-5"
                            style={{
                                backgroundColor: colors.primary,
                            }}
                        >
                            <label
                                style={{
                                    fontSize: width < 768 ? 20 : 30,
                                    marginLeft: width > 768 ? 50 : 10,
                                    marginRight: width > 768 ? 50 : 10,
                                }}
                            >
                                "Wow what great service, I love it! It's is the
                                most valuable business resource we have EVER
                                purchased. We can't understand how we've been
                                living without it."
                            </label>
                        </div>
                    </div>
                    {imageGallary && (
                        <SlideView
                            showImage={true}
                            className="mt-5 mb-5"
                            slides={imageGallary}
                            imageStyle={{ height: "100%", width: "100%" }}
                            cardStyle={cardStyle}
                        />
                    )}
                    <div
                        className="text-white text-center"
                        style={{ display: width < 768 ? "block" : "none" }}
                    >
                        <>
                            <div className="heading my-3 mt-5">Contact</div>
                            <TextIconComponent
                                icon={<HiPhone />}
                                text={maker.Phone_Number}
                            />
                            <TextIconComponent
                                icon={<MdMail />}
                                text={maker.Email}
                            />
                        </>
                        <>
                            <div className="pb-4">
                                <b>Rate this Manufactoring Hub</b>
                                <label>Tell others what you think</label>
                                <StarRating
                                    widgetDimensions="25px"
                                    widgetSpacing="5px"
                                />
                            </div>
                        </>
                    </div>
                </>
            )}
        </div>
    );
}

const styles = {
    whiteButton: {
        backgroundColor: colors.white,
        color: colors.primary,
        fontSize: 14,
        fontWeight: 700,
        textTransform: "uppercase",
    },
};

const blog = [
    {
        image: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg",
        title: "Sunset Blog",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
    },
    {
        image: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg",
        title: "Sunset Blog",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
    },
    {
        image: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg",
        title: "Sunset Blog",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
    },
    {
        image: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg",
        title: "Sunset Blog",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
    },
    {
        image: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg",
        title: "Sunset Blog",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
    },
    {
        image: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg",
        title: "Sunset Blog",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
    },
];

const cardStyle = {
    background: "white",
    borderRadius: "5px",
    overflow: "hidden",
    height: "392px",
    width: "98%",
};

// const column = [
//     {
//         field: "material",
//         subField: "Material_Name",
//         header: "Materials",
//     },
//     {
//         field: "thickness",
//         header: "Thickness",
//     },
//     {
//         field: "costUnit",
//         subField: "label",
//         header: "Cost Unit",
//     },
//     {
//         field: "unitRate",
//         header: "Unit Rate",
//     },
//     {
//         field: "leadTime",
//         header: "Lead Time",
//     },
// ];

const column = [
    {
        field: "material",
        subField: "Material_Name",
        header: "Materials",
    },
    {
        field: "materialDetails",
        header: "Material Details",
    },
    {
        field: "pricing",
        header: "Pricing/Costing",
    },
    // {
    //     field: "thickness",
    //     header: "Thickness",
    // },
    // {
    //     field: "costUnit",
    //     subField: "type",
    //     header: "Cost Unit",
    // },
    // {
    //     field: "unitRate",
    //     header: "Unit Rate",
    // },
    {
        field: "leadTime",
        header: "Lead Time",
    },
];
