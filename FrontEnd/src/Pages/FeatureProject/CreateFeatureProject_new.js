import React from "react";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import "./Featureproject.css";
import * as Yup from "yup";
import BrowseFileComponent from "../../Components/browseFile/BrowseFileComponent";
import Button from "../../Components/Button";
import { ProjectValidationSchema } from "../Form/ValidationSchema";
import { postData } from "../../commonApi/CommonApi";
import { createProject } from "../../commonApi/Link";

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
  const handleSubmit = (values) => {
    console.log(values, "values");
    const formData = new FormData();
    // for (let i = 0; i < values.files.length; i++) {
    //   formData.append("files", values.files[i]);
    // }
    formData.append("file", values.image);
    formData.append("project", JSON.stringify(values));
    postData(
      createProject,
      formData,
      "multipart/form-data",
      (response) => {
        console.log(response, "success");
      },
      (error) => {
        console.log(error, "failure");
      }
    );
  };
  return (
    <>
      <div></div>
    </>
  );
}

export default CreateFeatureProject;
