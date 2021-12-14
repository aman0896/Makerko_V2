import * as Yup from "yup";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import { useWindowDimensions } from "../../Functions";
import { colors } from "../../Values/colors";
import OtherServices from "./OtherServices";
import TableComponent from "../../Components/table/TableComponent";
import { useState } from "react";
import ManufacturingServices from "./ManufacturingServices";
import "./AdditionalDetails.css";
import { useSelector } from "react-redux";
import { patchData } from "../../commonApi/CommonApi";
import { makersServices } from "../../commonApi/Link";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const MakersValidationSchema = Yup.object().shape({
    // file: Yup.object().required("No file Uploaded"),
    // files: Yup.mixed().required("Photos  of project is required"),
});

function AdditionalDetailsFillUp() {
    const [formikData, setFormikData] = useState([]);
    const mfgProcess = useSelector((state) => state.mfgProcess.mfgProcess);

    const InitialValues = {
        file: "",
        files: "",
    };

    const handleSubmit = (values) => {
        console.log(values, "values");
        console.log(mfgProcess, "mmmmfgprocess");

        patchData(
            makersServices,
            { mfgProcess },
            "0e868405eebeea624dddbb05a3e0fdc5",
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
    };

    const { width } = useWindowDimensions();

    return (
        <div
            className="container-fluid"
            style={{
                width: width <= 800 ? "95%" : "80%",
            }}
        >
            <ManufacturingServices />

            <div className="mt-4">{/* <OtherServices /> */}</div>
            <FormikComponent
                initialValues={InitialValues}
                onSubmit={handleSubmit}
                validationSchema={MakersValidationSchema}
            >
                {/* <div className="mt-5 mb-5">
          <FormikController
            name="file"
            label={<div className="heading title">Upload Photos:</div>}
            control="dropzone"
            // accept={this.state.acceptedFiles}
            // requirementNote="File size < 15 MB"
            // user={this.state.user}
            // error={this.state.errMsg}
            // fileUpload={this.state.fileUpload}

            accept={SUPPORTED_FORMATS}
          />
        </div>
        <div className="mt-5 mb-5">
          <FormikController
            control="multipleFile"
            label={<div className="heading title">Upload Multiple Photos:</div>}
            name="files"
            title="Choose Files"
            accept={SUPPORTED_FORMATS}
          />
        </div> */}
                <div className="d-flex justify-content-end mt-2">
                    <FormikController
                        title="Save"
                        type="submit"
                        control="submit"
                    />
                </div>
            </FormikComponent>
        </div>
    );
}

export default AdditionalDetailsFillUp;
