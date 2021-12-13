import * as Yup from "yup";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import { useWindowDimensions } from "../../Functions";
import { colors } from "../../Values/colors";
import OtherServices from "./OtherServices";
import TableComponent from "../../Components/table/TableComponent";
import { useEffect, useState } from "react";
import ManufacturingServices from "./ManufacturingServices";
import "./AdditionalDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  FileDownload,
  patchData,
  postDataWithFormData,
} from "../../commonApi/CommonApi";
import { makersAdditionalDetails, makersServices } from "../../commonApi/Link";
import { Toast } from "../../Components/ReactToastify";
import { GetMfgProcess } from "../../Components/Redux/Actions/MfgProcess";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const MakersValidationSchema = Yup.object().shape({
  // file: Yup.object().required("No file Uploaded"),
  // files: Yup.mixed().required("Photos  of project is required"),
});

function AdditionalDetailsFillUp() {
  const [formikData, setFormikData] = useState([]);
  const mfgProcess = useSelector((state) => state.mfgProcess.mfgProcess);
  const [otherServices, setOtherServices] = useState();
  const [oldOtherServices, setOldOtherServices] = useState();
  const hub = useSelector((state) => state.mfgProcess.hub);
  const [imagePreview, setImagePreview] = useState();

  const dispatch = useDispatch();

  const currentUserData = useSelector(
    (state) => state.currentUserdata.currentUserdata
  );

  useEffect(() => {
    console.log(hub, "inside useeffect11");
    GetMfgProcess(dispatch, currentUserData);
  }, [currentUserData]);

  useEffect(() => {
    console.log(hub, "inside useeffect22");

    if (hub) {
      console.log(hub, "hubs");
      setOldOtherServices(JSON.parse(hub.Other_Services));
      async function GetMultipleImage() {
        if (hub.Additional_Images) {
          console.log(hub.Additional_Images, "image");
          let filesUrl = [];
          const imageData = JSON.parse(hub.Additional_Images);
          for (let i = 0; i < imageData.length; i++) {
            const imageBlob = await FileDownload(imageData[i].filePath, null);
            console.log(imageBlob, "files");
            const profileImageUrl = window.URL.createObjectURL(
              new Blob([imageBlob])
            );
            filesUrl.push(profileImageUrl);
          }

          setImagePreview(filesUrl);
        }
      }
      GetMultipleImage();
    }
  }, [hub]);

  const InitialValues = {
    // file: "",
    files: "",
  };
  console.log(currentUserData, "userdata");
  const handleSubmit = (values) => {
    console.log("values");
    console.log(mfgProcess, "mmmmfgprocess");
    console.log(otherServices, "otherServices");
    console.log(currentUserData, "userdata");

    const formData = new FormData();
    formData.append("otherServices", JSON.stringify(otherServices));

    for (let i = 0; i < values.files.length; i++) {
      formData.append("multipleImage", values.files[i]);
    }
    patchData(
      makersServices,
      { mfgProcess },
      currentUserData.Manufacturer_ID,
      (onSuccess) => {
        if (onSuccess) {
          console.log("success");
          // if (onSuccess.data.emailExist === true) {
          //   Toast("Email already exits", "error", 3000, colors.white);
          //   return;
          // }
          // const { hash } = onSuccess.data;
          // history.push({
          //   pathname: `/account/verify`,
          //   search: `?email=${values.email}&hash=${hash}`,
          //   //send data to verify page
          //   });
        }
      },
      (onFail) => {}
    );
    postDataWithFormData(
      `${makersAdditionalDetails}/${currentUserData.Manufacturer_ID}`,
      formData,
      (onSuccess) => {
        console.log(onSuccess.data, "onsuccess");

        Toast("Profile Updated Successfully", "success");
      },
      (onFail) => {
        console.log(onFail, "failed");
      }
    );
  };

  const { width } = useWindowDimensions();

  return (
    <div
      className="container-fluid mt-4"
      style={{
        width: width <= 800 ? "95%" : "80%",
      }}
    >
      {console.log(oldOtherServices)}
      <ManufacturingServices />

      <OtherServices
        getData={(data) => setOtherServices(data)}
        oldOtherServices={oldOtherServices}
      />

      <div className="mt-4">{/* <OtherServices /> */}</div>
      <FormikComponent
        initialValues={InitialValues}
        onSubmit={handleSubmit}
        validationSchema={MakersValidationSchema}
      >
        {/* <div className="mt-5 mb-5">
          <FormikController
            control="multipleFile"
            label={<div className="heading title">Upload Company Logo:</div>}
            name="files"
            title="Choose Files"
            accept={SUPPORTED_FORMATS}
          />
        </div> */}
        {imagePreview &&
          imagePreview.map((src) => (
            <img src={src} style={{ height: 100, width: 100 }} />
          ))}
        <div className="mt-5 mb-5">
          <FormikController
            control="multipleFile"
            label={<div className="heading title">Upload Multiple Photos:</div>}
            name="files"
            title="Choose Files"
            accept={SUPPORTED_FORMATS}
          />
        </div>
        <div className="d-flex justify-content-end mt-2">
          <FormikController title="Save" type="submit" control="submit" />
        </div>
      </FormikComponent>
    </div>
  );
}

export default AdditionalDetailsFillUp;
