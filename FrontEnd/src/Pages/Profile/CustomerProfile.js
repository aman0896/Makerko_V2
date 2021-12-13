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
import { customerProfileEdit } from "../../commonApi/Link";
import { Toast } from "../../Components/ReactToastify";

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

  const [profileImage, setProfileImage] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState();

  useEffect(() => {
    async function GetProfileImage() {
      if (currentUserData && currentUserData.Profile_Image) {
        console.log(currentUserData.Profile_Image, "image");
        const imageData = JSON.parse(currentUserData.Profile_Image);
        const imageBlob = await FileDownload(imageData.filePath);
        const profileImageUrl = window.URL.createObjectURL(
          new Blob([imageBlob])
        );
        console.log(imageData);
        setProfileImagePreview(profileImageUrl);
      }
    }

    GetProfileImage();
  }, [currentUserData]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("userUpdates", JSON.stringify(values));
    formData.append("currentUser", JSON.stringify(currentUserData));
    formData.append("profileImage", profileImage);
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

  const { width } = useWindowDimensions();
  return (
    <div
      className="container-fluid"
      style={{
        width: width <= 800 ? "95%" : "60%",
      }}
    >
      {currentUserData && (
        <>
          <div className="d-flex align-items-center flex-column my-4">
            <div className="change-image">
              <img
                className="image-profile"
                src={
                  profileImagePreview
                    ? profileImagePreview
                    : "http://localhost:3000/assests/user.png"
                }
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
                  setInitial="Software Developer"
                />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <FormikController title="Save" type="submit" control="submit" />
            </div>
          </FormikComponent>
          <ChangePasswordComponent />
        </>
      )}
    </div>
  );
}

export default CustomerProfile;
