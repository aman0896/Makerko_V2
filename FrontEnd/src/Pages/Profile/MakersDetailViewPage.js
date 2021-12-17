import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import CardViewComponent from "../../Components/card/CardViewComponent";
import SlideView from "../../Components/slideView/SlideView";
import TableComponent from "../../Components/table/TableComponent";
import { useWindowDimensions } from "../../functions/Functions";
import { colors } from "../../Values/colors";
import myImage from "../../Values/Images";
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
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FileDownload } from "../../commonApi/CommonApi";
import { SetMakersServices } from "../../Components/Redux/Reducers/SetMakersServices";

const profileData = require("../../data/ProfileData.json");

const projects = [
    {
        image: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg",
        title: "Project Sunset",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
    },
    {
        image: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg",
        title: "Project Sunset",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
    },
    {
        image: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg",
        title: "Project Sunset",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
    },
    {
        image: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg",
        title: "Project Sunset",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
    },
];

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

const images = [
    { image: "https://images3.alphacoders.com/853/thumb-1920-85305.jpg" },
    {
        image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg",
    },
    {
        image: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    { image: "https://www.w3schools.com/howto/img_snow.jpg" },
    {
        image: "https://media.istockphoto.com/photos/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-picture-id1093110112?k=20&m=1093110112&s=612x612&w=0&h=3OhKOpvzOSJgwThQmGhshfOnZTvMExZX2R91jNNStBY=",
    },
];

const services = [
    {
        name: "CNC Carving",
    },
    {
        name: "Vaccum Forming",
    },
    {
        name: "3D Printing",
    },
];

const otherServices = [
    {
        name: "Plasma Cutting",
    },
];

const cardStyle = {
    background: "white",
    borderRadius: "5px",
    overflow: "hidden",
    height: "392px",
    width: "98%",
};

const column = [
    {
      field: "material",
      subField: "Material_Name",
      header: "Materials",
    },
    {
      field: "thickness",
      header: "Thickness",
    },
    {
      field: "costUnit",
      subField: "type",
      header: "Cost Unit",
    },
    {
      field: "unitRate",
      header: "Unit Rate",
    },
    {
      field: "leadTime",
      header: "Lead Time",
    },
    {
      field: "action",
      header: "Action",
    },
  ];

export default function MakersDetailViewPage() {
    const { height, width } = useWindowDimensions();
    const [profileImagePreview, setProfileImagePreview] = useState();
    const [maker, setMaker] = useState();
    const [services, setServices] = useState();
    const makersList = useSelector((state) => state.makersList.makersList);
    const makersServices = useSelector(
        (state) => state.makersServices.services
    );
    const methods = useSelector((state) => state.method.method);
    const { id } = useParams();

    useEffect(() => {
        async function GetMakerData() {
            if (makersList && makersServices) {
                makersList.filter(async (maker) => {
                    if (maker.Manufacturer_ID === id) {
                        setMaker(maker);
                        const imageData = JSON.parse(maker.Logo);
                        const imageBlob = await FileDownload(
                            imageData.filePath
                        );
                        const profileImageUrl = window.URL.createObjectURL(
                            new Blob([imageBlob])
                        );
                        setProfileImagePreview(profileImageUrl);
                    }
                });

                const services = makersServices.filter(
                    (service) => service.Manufacturer_ID === id
                );
                setServices(services);
            }
        }

        GetMakerData();
    }, [makersList, makersServices, id]);

    const showServices = services && services.map((service) => {
        methods &&
            methods.map((method) => {
                if (method.Service_ID === service.Service_ID) {
                    return (
                        <>
                            <div
                                className="heading mb-3"
                                style={{ fontSize: width < 768 ? 20 : 38 }}
                            >
                                Manufacturing Services
                            </div>
                            <div className="mb-5">
                                <div className="border tableMainHeader">
                                    <h2 className="mx-5">{method.Name}</h2>
                                </div>
                                <TableComponent
                                    column={column}
                                    data={service}
                                />
                            </div>
                        </>
                    );
                }
            });
    });

    return (
        <div style={{ minHeight: height - 80, backgroundColor: colors.dark }}>
            {maker && (
                <>
                    <img
                        src={myImage.cover}
                        style={{ width: "100%", height: height / 2 }}
                        alt="Profile Cover"
                    />
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
                                            <p>
                                                {maker.Website}
                                                <br />
                                                {maker.Address}
                                            </p>
                                        </div>
                                        <div>
                                            <QuoteButton
                                                value="get a quote"
                                                textTransform="capitalize"
                                                buttonStyle="button--primary--solid"
                                            />
                                        </div>
                                        <div>
                                            <StarRatingAverage
                                                widgetDimensions="20px"
                                                averageRating={3.5}
                                            />
                                        </div>
                                    </div>
                                    <ServicesComponent
                                        header="Fabrication Services"
                                        services={services}
                                    />
                                    <ServicesComponent
                                        header="Other Services"
                                        services={otherServices}
                                    />
                                    <>
                                        <div className="heading my-3 mt-5">
                                            Contact
                                        </div>
                                        <TextIconComponent
                                            icon={<HiPhone />}
                                            text="9815401344"
                                        />
                                        <TextIconComponent
                                            icon={<MdMail />}
                                            text="zener@gmail.com"
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
                                <h4 className="heading">Zener Technology</h4>
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
                                    <div>
                                        <QuoteButton
                                            value="get a quote"
                                            textTransform="capitalize"
                                            buttonStyle="button--primary--solid"
                                        />
                                        {/* <Button
                                    buttonStyle="button--primary--solid"
                                    style={{
                                        fontWeight: 100,
                                        minWidth: 150,
                                    }}
                                >
                                    <b>Get A Quote</b>
                                </Button> */}
                                    </div>
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
                                {showServices}
                                {/* <div
                                    className="heading mb-3"
                                    style={{ fontSize: width < 768 ? 20 : 38 }}
                                >
                                    Manufacturing Services
                                </div>
                                <div className="mb-5">
                                    <div className="border tableMainHeader">
                                        <h2 className="mx-5">{methodName}</h2>
                                    </div>
                                    <TableComponent
                                        column={column}
                                        data={profileData.profile}
                                    />
                                </div>
                                <div className="border tableMainHeader">
                                    <h2 className="mx-5">3D Printing</h2>
                                </div>
                                <TableComponent
                                    column={column}
                                    data={profileData.profile}
                                /> */}
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
                                    <ServicesComponent
                                        header="Other Services"
                                        services={otherServices}
                                        style={{
                                            fontSize: width < 768 ? 20 : 38,
                                        }}
                                    />
                                </div>
                            </>

                            <div className="mt-5">
                                <Button style={styles.whiteButton}>
                                    Projects
                                </Button>
                                <div className="d-flex flex-column flex-md-row justify-content-between">
                                    {projects &&
                                        projects
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
                                            ))}
                                </div>
                            </div>

                            <div className="mt-5">
                                <Button style={styles.whiteButton}>
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
                        </div>
                        <div
                            className="text-white text-center w-100 p-3 heading"
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
                    <SlideView
                        showImage={true}
                        className="mt-5 mb-5"
                        slides={images}
                        imageStyle={{ height: "100%", width: "100%" }}
                        cardStyle={cardStyle}
                    />
                    <div
                        className="text-white text-center"
                        style={{ display: width < 768 ? "block" : "none" }}
                    >
                        <>
                            <div className="heading my-3 mt-5">Contact</div>
                            <TextIconComponent
                                icon={<HiPhone />}
                                text="9815401344"
                            />
                            <TextIconComponent
                                icon={<MdMail />}
                                text="zener@gmail.com"
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
