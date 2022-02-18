import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import CardViewComponent from "../../Components/card/CardViewComponent";
import { useWindowDimensions } from "../../functions/Functions";
import { colors } from "../../Values/colors";
import "./Profile.css";
import { HiPhone } from "react-icons/hi";
import { MdLocationOn, MdMail } from "react-icons/md";
import { TextIconComponent } from "./ProfileComponent";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FileDownload, getData } from "../../commonApi/CommonApi";
import { FeatureProjectList } from "../../Components/Redux/Actions/FeatureProjectList";
import { currentUserLink, webDomain } from "../../commonApi/Link";
import { SET_LOCATION_PATHNAME } from "../../Components/Redux/Actions/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

export default function CustomerDetailViewPage() {
    //#region hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    //#endregion

    //#region react-redux
    const projectList = useSelector((state) => state.projectList.projectList);
    const loggedInUser = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );
    //#endregion

    //#region state define
    const { height, width } = useWindowDimensions();
    const [customer, setCustomer] = useState();
    const [featureProject, setFeatureProject] = useState();
    const [coverImage, setCoverImage] = useState();
    const [coverImagePreview, setCoverImagePreview] = useState();
    const [myProfile, setMyProfile] = useState(false);
    //#endregion

    useEffect(() => {
        if (loggedInUser && id) {
            if (
                Object.keys(loggedInUser).includes("Customer_ID") &&
                loggedInUser.Customer_ID == id
            ) {
                setMyProfile(true);
            } else {
                setMyProfile(false);
            }
        }
    }, [loggedInUser, id]);

    useEffect(() => {
        async function GetCustomerDetail() {
            getData(
                currentUserLink,
                { uid: id },
                async (onSuccess) => {
                    let { currentUserData } = onSuccess.data;

                    //cover image
                    if (currentUserData[0] && currentUserData[0].CoverImage) {
                        const imageData = JSON.parse(
                            currentUserData[0].CoverImage
                        );
                        const imageBlob = await FileDownload(
                            imageData.filePath
                        );
                        const coverImageUrl = window.URL.createObjectURL(
                            new Blob([imageBlob])
                        );
                        setCoverImagePreview(coverImageUrl);
                    } else {
                        setCoverImagePreview(`${webDomain}assests/cover.jpg`);
                    }

                    //profile image
                    if (
                        currentUserData[0] &&
                        currentUserData[0].Profile_Image
                    ) {
                        const imageData = JSON.parse(
                            currentUserData[0].Profile_Image
                        );
                        const imageBlob = await FileDownload(
                            imageData.filePath
                        );
                        const profileImageUrl =
                            window.URL.createObjectURL(imageBlob);
                        currentUserData[0].Profile_Image = profileImageUrl;
                    }
                    console.log(currentUserData[0]);
                    setCustomer(currentUserData[0]);
                },
                (onFail) => {
                    return console.log(onFail, "function GetCurrentUserdata");
                }
            );
        }

        GetCustomerDetail();

        function SetFeatureProjectList() {
            if (projectList) {
                console.log(projectList, "list");
                const ownProjects = projectList.filter(
                    (project) => project.Author_ID == id
                );
                console.log(ownProjects);
                setFeatureProject(ownProjects);
            }
        }

        SetFeatureProjectList();
    }, [projectList, id]);

    useEffect(() => {
        //get featureProject List
        FeatureProjectList(dispatch);
    }, []);

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
        history.push({ pathname: "/profile/customer/edit" });
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

    return (
        <div style={{ minHeight: height - 80, backgroundColor: colors.dark }}>
            {customer && (
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
                                    size="1x"
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
                                                src={customer.Profile_Image}
                                                alt=""
                                                style={{
                                                    width: "inherit",
                                                    height: "inherit",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="heading">
                                                {`${customer.First_Name} ${customer.Last_Name}`}
                                            </h4>
                                        </div>
                                    </div>
                                    <>
                                        <div className="heading my-3">
                                            Contact
                                        </div>
                                        <TextIconComponent
                                            icon={<HiPhone />}
                                            text={customer.Phone_Number}
                                        />
                                        <TextIconComponent
                                            icon={<MdMail />}
                                            text={customer.Email}
                                        />
                                        <TextIconComponent
                                            icon={<MdLocationOn />}
                                            text={customer.Address}
                                        />
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
                                        src={customer.Profile_Image}
                                        alt="profileImage"
                                        style={{
                                            width: "inherit",
                                            height: "inherit",
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                className="heading mb-3 text-left"
                                style={{ fontSize: width < 768 ? 20 : 38 }}
                            >
                                Bio
                            </div>
                            <p>{customer.Bio}</p>

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

                            {/* <div>
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
                            </div> */}
                        </div>
                    </div>

                    <div
                        className="text-white text-center"
                        style={{ display: width < 768 ? "block" : "none" }}
                    >
                        <>
                            <div className="heading my-3 mt-5">Contact</div>
                            <TextIconComponent
                                icon={<HiPhone />}
                                text={customer.Phone_Number}
                            />
                            <TextIconComponent
                                icon={<MdMail />}
                                text={customer.Email}
                            />
                            <TextIconComponent
                                icon={<MdLocationOn />}
                                text={customer.Address}
                            />
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
