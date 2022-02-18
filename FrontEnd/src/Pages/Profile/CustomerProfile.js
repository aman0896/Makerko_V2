import React, { useState, useEffect } from "react";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import { useWindowDimensions } from "../../Functions";
import { MdEdit } from "react-icons/md";
import "./Profile.css";
import ChangePasswordComponent from "../../Components/Password/ChangePasswordComponent";
import { ValidationSchemaCustomerProfile } from "../Form/ValidationSchema";
import { useSelector } from "react-redux";
import { FileDownload, postDataWithFormData } from "../../commonApi/CommonApi";
import { customerCoverImage, customerProfileEdit } from "../../commonApi/Link";
import { Toast } from "../../Components/ReactToastify";
import ImageCropper, {
    dataURItoBlob,
} from "../../Components/imageCropper/ImageCropper";
import { useLocation } from "react-router-dom";

const InitialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
    bio: "",
};

function CustomerProfile() {
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );

    const location = useLocation();
    const { state } = location;

    const { width } = useWindowDimensions();

    const [profileImage, setProfileImage] = useState();
    const [profileImagePreview, setProfileImagePreview] = useState();
    const [prevProfileImage, setPrevProfileImage] = useState();
    const [showCoverImage, setShowCoverImage] = useState();
    const [showImageCropper, setImageCropper] = useState(false);
    const [imageDestination, setImageDestination] = useState();
    const [prevCoverImage, setPrevCoverImage] = useState();
    const [targetFile, setTargetFile] = useState();

    useEffect(() => {
        //cover image
        async function GetCoverImage() {
            if (currentUserData && currentUserData.CoverImage) {
                const imageData = JSON.parse(currentUserData.CoverImage);
                const imageBlob = await FileDownload(imageData.filePath);
                const profileImageUrl = window.URL.createObjectURL(
                    new Blob([imageBlob])
                );
                setShowCoverImage(profileImageUrl);
                setPrevCoverImage(currentUserData.CoverImage);
            }
        }

        GetCoverImage();

        //profile image
        async function GetProfileImage() {
            if (currentUserData && currentUserData.Profile_Image) {
                const imageData = JSON.parse(currentUserData.Profile_Image);
                const imageBlob = await FileDownload(imageData.filePath);
                const profileImageUrl = window.URL.createObjectURL(
                    new Blob([imageBlob])
                );
                console.log(imageData);
                setProfileImagePreview(profileImageUrl);
                setPrevProfileImage(currentUserData.Profile_Image);
            }
        }

        GetProfileImage();
    }, [currentUserData]);

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append("userUpdates", JSON.stringify(values));
        formData.append("currentUser", JSON.stringify(currentUserData));
        formData.append("profileImage", profileImage);
        formData.append("prevImage", prevProfileImage);
        postDataWithFormData(
            customerProfileEdit,
            formData,
            (onSuccess) => {
                console.log(onSuccess.data, "onsuccess");
                Toast("Profile Updated Successfully", "success");
            },
            (onFail) => {}
        );
    };

    const handleOnChangeImage = (e) => {
        setProfileImage(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        setProfileImagePreview(url);
    };

    const coverImageUpdate = (e) => {
        const file = e.target.files[0];
        setImageCropper(true);

        if (file) {
            setShowCoverImage(URL.createObjectURL(file));
            setTargetFile(file);
        }
    };

    const onCroppedImageSave = () => {
        const formData = new FormData();
        const blob = dataURItoBlob(imageDestination);
        formData.append("cover", blob, targetFile.name);
        formData.append("userId", currentUserData.Customer_ID);
        formData.append("prevImage", prevCoverImage);
        postDataWithFormData(
            customerCoverImage,
            formData,
            (onSuccess) => {
                if (onSuccess.data) {
                    const url = URL.createObjectURL(blob);
                    setShowCoverImage(url);
                    Toast("Cover Image Changed", "success");
                    setImageCropper(false);
                    window.location.reload();
                }
            },
            (onFail) => {}
        );
    };

    const onImageCropCancel = () => {
        setImageCropper(false);
        setImageDestination(profileImagePreview);
        setShowCoverImage();
    };

    useEffect(() => {
        if (state !== undefined && state !== null) {
            Toast(state.message, "success");
        }
    }, [state]);

    return (
        <div
            className="container-fluid"
            style={{
                width: width <= 800 ? "95%" : "80%",
            }}
        >
            {currentUserData && (
                <>
                    <div className="cover-image my-4">
                        {showImageCropper ? (
                            <ImageCropper
                                src={showCoverImage}
                                aspectRatio={16 / 6}
                                setImageDestination={setImageDestination}
                                onSaveClick={onCroppedImageSave}
                                onCancelClick={onImageCropCancel}
                            />
                        ) : (
                            <>
                                <img
                                    className="cover-image-profile"
                                    src={
                                        showCoverImage
                                            ? showCoverImage
                                            : "http://localhost:3000/assests/cover.jpg"
                                    }
                                    alt=""
                                />
                                <label
                                    className="button cover-edit"
                                    htmlFor="cover-image"
                                >
                                    <span>
                                        <MdEdit style={{ margin: 1 }} />
                                    </span>
                                    <span style={{ margin: 1 }}>
                                        Edit Cover
                                    </span>
                                </label>

                                <input
                                    id="cover-image"
                                    type="file"
                                    name="file"
                                    hidden
                                    accept={".jpg, .jpeg, .png"}
                                    onChange={coverImageUpdate}
                                />
                            </>
                        )}
                    </div>
                    <div className="d-flex align-items-center flex-column my-4">
                        <div className="change-image">
                            <img
                                className="image-profile"
                                src={
                                    profileImagePreview
                                        ? profileImagePreview
                                        : "http://localhost:3000/assests/user.png"
                                }
                                alt=""
                            />

                            <div className="icon-edit">
                                <MdEdit size="24px" />
                            </div>

                            <input
                                className="avatar-file h-100 w-100"
                                type="file"
                                name="file"
                                accept={".jpg, .jpeg, .png"}
                                onChange={handleOnChangeImage}
                            />
                        </div>

                        <div className="profile-name">
                            {currentUserData.First_Name}&nbsp;
                            {currentUserData.Last_Name}
                        </div>
                    </div>
                    <div className="section-heading mb-3">Edit Profile</div>
                    <FormikComponent
                        initialValues={InitialValues}
                        onSubmit={handleSubmit}
                        validationSchema={ValidationSchemaCustomerProfile}
                    >
                        <div className="row">
                            <div className="col-lg">
                                <FormikController
                                    label="First Name"
                                    name="firstName"
                                    control="input"
                                    placeholder="First Name"
                                    type="text"
                                    setInitial={currentUserData.First_Name}
                                />
                            </div>
                            <div className="col-lg offset-lg-1">
                                <FormikController
                                    label="Last Name"
                                    name="lastName"
                                    control="input"
                                    placeholder="Last Name"
                                    type="text"
                                    setInitial={currentUserData.Last_Name}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg">
                                <FormikController
                                    label="Phone Number"
                                    name="phoneNumber"
                                    control="input"
                                    placeholder="Phone Number"
                                    type="text"
                                    setInitial={currentUserData.Phone_Number}
                                />
                            </div>
                            <div className="col-lg offset-lg-1">
                                <FormikController
                                    label="Address"
                                    name="address"
                                    control="input"
                                    placeholder="Enter Address"
                                    type="text"
                                    setInitial={currentUserData.Address}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-6">
                                <FormikController
                                    label="Email"
                                    name="email"
                                    control="input"
                                    placeholder="Email Address"
                                    type="email"
                                    setInitial={currentUserData.Email}
                                />
                            </div>
                            <div className="col-lg offset-lg-1"></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg">
                                <FormikController
                                    label="Bio"
                                    name="bio"
                                    control="textarea"
                                    placeholder="Enter Address"
                                    type="text"
                                    setInitial={currentUserData.Bio}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <FormikController
                                title="Save"
                                type="submit"
                                control="submit"
                            />
                        </div>
                    </FormikComponent>
                    <ChangePasswordComponent />
                </>
            )}
        </div>
    );
}

export default CustomerProfile;
