import React from "react";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import "./Featureproject.css";
import * as Yup from "yup";
import BrowseFileComponent from "../../Components/browseFile/BrowseFileComponent";
import Button from "../../Components/Button";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const SUPPORTED_FORMATS_PDF = [".pdf"];
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),

  process: Yup.string().required("Manufacturing process is required"),
  materials: Yup.string().required("Materials is required"),
  summary: Yup.string().required("Summary is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed()
    .required("A photo of project is required")
    // .test(
    //   "fileSize",
    //   "File too large",
    //   (value) => value && value.size <= FILE_SIZE
    // )
    .test(
      "fileFormat",
      "Unsupported File Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  // pdfDocument: Yup.mixed().test(
  //   "fileFormat",
  //   "Unsupported File Format",
  //   (value) => value && SUPPORTED_FORMATS_PDF.includes(value.type)
  // ),
  termsCondition: Yup.bool().oneOf(
    [true],
    "Please accept the terms and conditions to continue."
  ),
  files: Yup.mixed().required("Photos  of project is required"),

  // .test(
  //   "len",
  //   "No of photos must be between 3 and 10",
  //   (value) => value.length <= 10
  // )
  // .test(
  //   "len",
  //   "No of photos must be between 3 and 10",
  //   (value) => value.length >= 3
  // ),
  // .test(
  //   "fileFormat",
  //   "Unsupported File Format",
  //   (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
  // ),
});

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
function FeatureProjectAdd() {
  const handleSubmit = (values) => {
    console.log(values, "values");
  };
  return (
    <>
      <div className="mt-5  d-flex align-items-center flex-column">
        <FormikComponent
          initialValues={InitialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <div className="row" style={{ width: "80%" }}>
            <div className="col-md-4">
              <div className="project-title mb-4">Feature Project</div>
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
                  title="Choose File"
                  accept={SUPPORTED_FORMATS_PDF}
                  placeholder="ex Assembly manual, flyer, proposal, etc."
                />
              </div>
            </div>
            <div className="col-md-7 ml-md-5">
              <div
                className=" d-flex justify-content-end"
                style={{ marginBottom: 11 }}
              >
                <Button
                  buttonStyle="button--primary--solid"
                  buttonSize="button--small"
                >
                  Add New
                </Button>
              </div>
              <div className="row">
                <div className="col-md">
                  <FormikController
                    control="input"
                    label="Title of Project :"
                    name="title"
                    placeholder="Enter Title of Project"
                  />
                </div>
                <div className="col-md ml-md-5">
                  <FormikController
                    control="input"
                    label="Manufacturing Process :"
                    name="process"
                    placeholder="Ex. CNC, Injection Molding, Lazer cut"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md ">
                  <FormikController
                    control="input"
                    label="Materials :"
                    name="materials"
                    placeholder="Ex. CNC, Injection Molding, Lazer cut"
                  />
                </div>
                <div className="col-md ml-md-5">
                  <FormikController
                    control="multipleFile"
                    label="Upload other Multiple Photos of Project :"
                    name="files"
                    title="Choose Files"
                    accept={SUPPORTED_FORMATS}
                  />
                </div>
              </div>
              <div style={{ marginTop: 130 }}>
                <FormikController
                  control="ckEditor"
                  label="Detail Description :"
                  name="description"
                  placeholder="Add summary of project"
                />
              </div>
              <div
                style={{ marginTop: 200 }}
                className="d-flex justify-content-end"
              >
                <FormikController
                  name="termsCondition"
                  control="checkbox"
                  label="before submission of Project details and files."
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

export default FeatureProjectAdd;
