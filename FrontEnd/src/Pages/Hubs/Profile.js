import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import ButtonComponent from "../../Components/button/ButtonComponent";
import CardViewComponent from "../../Components/card/CardViewComponent";
import SlideView from "../../Components/SlideView";
import TableComponent from "../../Components/table/TableComponent";
import { useWindowDimensions } from "../../functions/Functions";
import { colors } from "../../Values/colors";
import myImage from "../../Values/Images";
import "./Profile.css";

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

const cardStyle = {
    background: "white",
    borderRadius: "5px",
    overflow: "hidden",
    height: "392px",
    width: "98%",
};

const column = [
    {
        field: "materials",
        header: "Materials",
    },
    {
        field: "thickness",
        header: "Thickness",
    },
    {
        field: "costUnit",
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
];

export default function Profile() {
    const { height, width } = useWindowDimensions();
    const [imageView, setImageView] = useState(false);

    const toggleImageView = () => {
        console.log("image view ", imageView);
        setImageView(!imageView);
    };
    return (
        <div className="bg-dark" style={{ minHeight: height - 80 }}>
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
                        <div
                            className="bg-white stack-top px-3"
                            style={{
                                // width: "65%",
                                maxWidth: "400px",
                                minWidth: "200px",
                            }}
                        >
                            <div className="bg-white d-flex align-items-center flex-column py-2 text-center">
                                <div
                                    className="my-4 p-3"
                                    style={{
                                        height: 150,
                                        width: 150,
                                        display: "flex",
                                        backgroundColor: "black",
                                    }}
                                >
                                    <img
                                        src={myImage.profileLogo}
                                        alt="logo"
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                                <div>
                                    <h4>Zener Technology</h4>
                                    <p className="px-3">
                                        3D Design and Additive manufacturing
                                        Tech Company, inspired by the fourth
                                        Industrial Revolution.
                                    </p>
                                    <p>
                                        www.promechminds.com
                                        <br />
                                        Kupondole,Lalitpur
                                    </p>
                                </div>
                                <div>
                                    <button>Get A Quote</button>
                                </div>
                                <div>Rating</div>
                            </div>
                            <div>Fabrication Services</div>
                            <div className="row text-center">
                                <div className="p-2 bg-primary ml-3 mb-2">
                                    Get A Quote
                                </div>
                                <div className="p-2 bg-primary ml-3 mb-2">
                                    Get A Quote
                                </div>
                                <div className="p-2 bg-primary ml-3 mb-2">
                                    Get A Quote
                                </div>
                            </div>
                            <div>Other Services</div>
                            <div className="row text-center">
                                <div className="p-2 bg-primary ml-3 mb-2">
                                    Get A Quote
                                </div>
                            </div>
                            <div>Contact</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 text-justify text-white">
                    <h1>About Zener Technologies</h1>
                    <p>
                        3D Design and Additive manufacturing Tech Company,
                        inspired by the fourth Industrial Revolution. It uses
                        the range of 3D printers and desktop manufacturing tools
                        to offer prototyping and Just-in-time (JIT)
                        manufacturing services to the local and international
                        customers.
                    </p>
                    <p>
                        3D printing enabled manufacturing increases efficiency
                        and reliability by reducing labour, tools and material
                        cost. It’s a clean production technology capable of
                        making complex objects through additive processes and
                        then taking it to conventional mass manufacturing
                        processes with ease.
                    </p>
                    <p>
                        Established in 2016 Zener Technologies took pioneering
                        steps to commercialize 3D Printers and 3D Printing
                        Services to the public, thus making the boons of
                        additive manufacturing accessible to everyone in Nepal.
                        In 2018, Zener Technologies started the commercial
                        application of 3D Scanning and Reverse Engineering in
                        Nepal.
                    </p>
                    <p>
                        With growing market needs, we are determined to uplift
                        the technology sector of Nepal by introducing new and
                        advanced tools/services. Zener Technologies has been a
                        Global Environment Facility Small Grants Programme
                        (GEF-SGP) of the UNDP grantee and DFID UK Aid’s Frontier
                        Tech Hub #COVIDaction Local Production Local Solution
                        awardee – 2020.
                    </p>
                    <>
                        <h1>Manufacturing Services</h1>
                        <div className="mb-5">
                            <div
                                style={{
                                    backgroundColor: "#A0A0A0",
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                }}
                                className="p-0 m-0 border"
                            >
                                <h2 className="mx-5 w-100">3D Printing</h2>
                            </div>
                            <TableComponent
                                column={column}
                                data={profileData.profile}
                            />
                        </div>
                        <div
                            style={{
                                backgroundColor: "#A0A0A0",
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                            }}
                            className="p-0 m-0 border"
                        >
                            <h2 className="mx-5 w-100">3D Printing</h2>
                        </div>
                        <TableComponent
                            column={column}
                            data={profileData.profile}
                        />
                    </>

                    <div className="mt-5">
                        <Button
                            // className="heading"
                            style={{
                                backgroundColor: colors.white,
                                color: colors.primary,
                                fontSize: 14,
                                fontWeight: 700,
                                textTransform: "uppercase",
                            }}
                        >
                            Projects
                        </Button>

                        <div className="d-flex flex-column flex-md-row justify-content-between">
                            {projects &&
                                projects.slice(0, 2).map((item, index) => (
                                    <CardViewComponent
                                        key={index}
                                        imageStyle={{
                                            // height: 280,
                                            // height:
                                            //     width >= 1024 ? width / 5 : 280,
                                            // width:
                                            //     width >= 1024
                                            //         ? width / 5 + 100
                                            //         : 200,
                                            // width: 380,
                                            backgroundImage: `url(${item.image})`,
                                        }}
                                        title={item.title}
                                        description={item.description}
                                    />
                                ))}
                        </div>
                    </div>

                    <div className="mt-5">
                        <Button
                            // className="heading"
                            style={{
                                backgroundColor: colors.white,
                                color: colors.primary,
                                fontSize: 14,
                                fontWeight: 700,
                                textTransform: "uppercase",
                            }}
                        >
                            Blogs
                        </Button>

                        <div className="d-flex flex-row justify-content-between">
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
                        <p>Found what you are looking for?</p>
                        <Button
                            // className="heading"
                            // className="w-50"
                            buttonStyle="button--white--solid"
                            buttonSize={
                                width < 768
                                    ? "button--large--100"
                                    : "button--large--50"
                            }
                            // style={{
                            //     backgroundColor: colors.white,
                            //     color: colors.primary,
                            //     fontSize: 14,
                            //     fontWeight: 700,
                            //     width: width < 768 ? "100%" : "50%",
                            // }}
                        >
                            <b>Get A Quote</b>
                        </Button>
                    </div>
                </div>
                <div className="bg-primary text-white text-center w-100 p-3">
                    <p style={{ fontSize: "38px" }}>
                        "Wow what great service, I love it! It's is the most
                        valuable business resource we have EVER purchased. We
                        can't understand how we've been living without it."
                    </p>
                </div>

                <div style={{ display: width < 768 ? "block" : "none" }}>
                    <div>Fabrication Services</div>
                    <div className="row text-center">
                        <div className="p-2 bg-primary ml-3 mb-2">
                            Get A Quote
                        </div>
                        <div className="p-2 bg-primary ml-3 mb-2">
                            Get A Quote
                        </div>
                        <div className="p-2 bg-primary ml-3 mb-2">
                            Get A Quote
                        </div>
                    </div>
                    <div>Other Services</div>
                    <div className="row text-center">
                        <div className="p-2 bg-primary ml-3 mb-2">
                            Get A Quote
                        </div>
                    </div>
                    <div>Contact</div>
                </div>
            </div>
            <SlideView
                slides={blog}
                imageStyle={{ height: "100%", width: "100%" }}
                cardStyle={cardStyle}
                imageView={imageView}
                setImageView={toggleImageView}
            />
        </div>
    );
}
