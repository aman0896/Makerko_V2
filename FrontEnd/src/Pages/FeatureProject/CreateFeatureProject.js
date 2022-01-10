import React, { useState } from "react";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import "./Featureproject.css";
import * as Yup from "yup";
import BrowseFileComponent from "../../Components/browseFile/BrowseFileComponent";
import Button from "../../Components/Button";
import { ProjectValidationSchema } from "../Form/ValidationSchema";
import { postData, postDataWithFormData } from "../../commonApi/CommonApi";
import { createProject } from "../../commonApi/Link";
import { Toast } from "../../Components/ReactToastify";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const SUPPORTED_FORMATS_PDF = [".pdf"];

const InitialValues = {
  title: "",
  process: "",
  materials: "",
  summary: "",
  description: "",
  image: "",
  pdfDocument: "",
  termsCondition: false,
  files: "",
};
function CreateFeatureProject() {
  // const [mainPhoto, setMainPhoto] = useState();
  // const [otherPhotos, setOtherPhotos] = useState();
  // const [pdfDoc, setPdfDoc] = useState();
  const handleSubmit = (values, onSubmitProps) => {
    console.log(values.image, "values");
    // setMainPhoto(values.image[0]);
    // setOtherPhotos(values.files);
    // setPdfDoc(values.pdfDocument[0]);

    onSubmitProps.resetForm();
    // const formData = new FormData();
    // for (let i = 0; i < values.files.length; i++) {
    //   formData.append("files", values.files[i]);
    // }
    // formData.append("file", values.image[0]);
    // formData.append("project", JSON.stringify(values));
    // formData.append("pdfDocument", values.pdfDocument[0]);
    // postData(
    //   createProject,
    //   formData,
    //   "multipart/form-data",
    //   (response) => {
    //     console.log(response, "success");
    //   },
    //   (error) => {
    //     console.log(error, "failure");
    //   }
    // );
    const formData = new FormData();
    formData.append("project", JSON.stringify(values));
    formData.append("mainPhoto", values.image);
    formData.append("otherPhotos", values.files);
    formData.append("pdfDocument", values.pdfDocument[0]);
    console.log("FormData", formData);
    postDataWithFormData(
      createProject,
      formData,
      (onSuccess) => {
        console.log(onSuccess.data, "onsuccess");
      },
      (onFail) => {}
    );
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="row mt-3" style={{ width: "80%" }}>
          <div className="col-lg-4 project-title mb-4">Feature Project</div>
          <div className="col-lg-7 ml-lg-5 d-flex justify-content-end">
            <Button
              buttonStyle="button--primary--solid"
              buttonSize="button--small"
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center flex-column">
        <FormikComponent
          initialValues={InitialValues}
          onSubmit={handleSubmit}
          validationSchema={ProjectValidationSchema}
        >
          <div className="row" style={{ width: "80%" }}>
            <div className="col-lg-4">
              <div>
                <FormikController
                  control="file"
                  label="Add main Photo of project :"
                  name="image"
                  title="Choose File"
                  accept={SUPPORTED_FORMATS}
                  image
                />
              </div>
              <div>
                <FormikController
                  control="ckEditor"
                  label="Summary of the Project (Key Features) :"
                  name="summary"
                  placeholder="Add summary of project"
                />
              </div>
              <div className="mt-5">
                <FormikController
                  control="file"
                  label="Upload Documents :"
                  name="pdfDocument"
                  title="Add Documents"
                  accept={SUPPORTED_FORMATS_PDF}
                  placeholder="ex Assembly manual, flyer, proposal, etc."
                />
              </div>
            </div>
            <div className="col-lg-7 ml-lg-5">
              <div className="row">
                <div className="col-lg">
                  <FormikController
                    control="input"
                    label="Title of Project :"
                    name="title"
                    placeholder="Enter Title of Project"
                    setInitial=""
                  />
                </div>
                <div className="col-lg ml-lg-4">
                  <FormikController
                    control="input"
                    label="Manufacturing Process :"
                    name="process"
                    placeholder="Ex. CNC, Injection Molding, Lazer cut"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg ">
                  <FormikController
                    control="input"
                    label="Materials :"
                    name="materials"
                    placeholder="Ex. CNC, Injection Molding, Lazer cut"
                  />
                </div>
                <div className="col-lg ml-lg-4">
                  <FormikController
                    control="multipleFile"
                    label="Upload other Multiple Photos of Project :"
                    name="files"
                    title="Add photos"
                    accept={SUPPORTED_FORMATS}
                  />
                </div>
              </div>
              <div className="description">
                <FormikController
                  control="ckEditor"
                  label="Detail Description :"
                  name="description"
                  placeholder="Add summary of project"
                />
              </div>
              <div className="d-flex justify-content-end termsAndCondition">
                <FormikController
                  name="termsCondition"
                  control="checkbox"
                  label="I agree with Terms and Conditions before submission of Project details and files."
                />
              </div>
              <div className="d-flex justify-content-end">
                <Button
                  buttonStyle="button--primary--outline"
                  buttonSize="button--small"
                  type="button"
                >
                  Cancel
                </Button> 
                <div className="ml-5">
                  <FormikController
                    title="Upload"
                    type="submit"
                    control="submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </FormikComponent>
      </div>
    </>
  );
}

export default CreateFeatureProject;
