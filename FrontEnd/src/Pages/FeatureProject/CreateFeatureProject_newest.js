import { Form, FieldArray } from "formik";
import React, { useState } from "react";
import Button from "../../Components/Button";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import FormikControllerNew from "../../Components/formik/FormikControllerNew";
import { useWindowDimensions } from "../../functions/Functions";
import { colors } from "../../Values/colors";
import { ProjectValidationSchema } from "../Form/ValidationSchema";
import { AiOutlinePlus } from "react-icons/ai";

function CreateFeatureProject_newest() {
  const [addMore, setAddMore] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const { width } = useWindowDimensions();
  const style = width > 700 ? { width: "30%" } : { width: "100%" };
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const SUPPORTED_FORMATS_PDF = [".pdf"];
  // const initialValues = {
  //   coverImage: "",
  //   title: "",
  //   productionDetail: "",
  //   description: "",
  //   content: {
  //     contentTitle: "",
  //     contentImage: "",
  //     imagePosition: "",
  //     contentDetails: "",
  //   },

  //   pdfFile: "",
  //   gallery: "",
  //   termsCondition: false,
  // };
  const imageOption = [
    { getOptionLabel: "left", getOptionValue: "left" },
    { getOptionLabel: "right", getOptionValue: "right" },
  ];
  const initialValues = {
    Production_Details: "",
    Title: "",
    Cover_Image: "",
    PdfFile: "",
    Description: "",
    Content: [
      {
        content_title: "",
        content_image: "",
        image_position: "left",
        content_details: "",
      },
    ],
    Gallery: "",
    termsCondition: false,
  };
  const handleSubmit = (values) => {
    console.log("Values", values);
  };

  return (
    <div
      className="d-flex flex-column border-border-danger"
      style={{ width: "80%", margin: "0 10%" }}
    >
      <div className="heading" style={{ color: "#0000FF", fontSize: "36px" }}>
        Feature Project
      </div>
      <div>
        <FormikComponent
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={ProjectValidationSchema}
        >
          <FormikController
            control="file"
            label="Choose Main Photo of Project:"
            name="Cover_Image"
            title="Choose File"
            accept={SUPPORTED_FORMATS}
            image
          />

          <FormikController
            control="input"
            label="Title of Project:"
            placeholder="Enter Title of Project"
            name="Title"
          />

          <FormikController
            control="input"
            label="Production Detail:"
            name="Production_Details"
            placeholder="Ex. Polypropylene(PP),PVC"
          />

          <FormikController
            control="textarea"
            label="Description:"
            name="Description"
            placeholder="Ex. #CNC, #Handicraft"
          />

          <div className="font-weight-bold mr-2" style={{ fontSize: 14 }}>
            Content
          </div>
          {showPreview && <h1>{initialValues.Title}</h1>}
          <FieldArray name="Content">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { Content } = values;
              return Content.map((values, index) => {
                return (
                  <div key={index}>
                    <FormikController
                      control="input"
                      label="Title:"
                      name={`Content[${index}].content_title`}
                    />

                    <div style={style}>
                      <FormikController
                        control="file"
                        name={`Content[${index}].content_image`}
                        title="Choose File"
                        accept={SUPPORTED_FORMATS}
                      />

                      <FormikController
                        control="select"
                        label="Image Position:"
                        placeholder="Right or Left"
                        name={`Content[${index}].image_position`}
                        options={imageOption}
                      />
                    </div>

                    <FormikController
                      control="textarea"
                      label="Detail Description:"
                      placeholder="Add summary of project"
                      name={`Content[${index}].content_details`}
                    />
                    <div className="d-flex justify-content-end">
                      {addMore === index && (
                        <>
                          {!showPreview ? (
                            <Button
                              buttonStyle="button--primary--solid"
                              buttonSize="button--medium"
                              onClick={(values) => {
                                setShowPreview(true);
                                console.log(initialValues, "Values for preview")
                              }}
                              style={{ marginRight: "15px" }}
                            >
                              View Preview
                            </Button>
                          ) : (
                            <Button
                              buttonStyle="button--primary--solid"
                              buttonSize="button--medium"
                              onClick={() => {
                                setShowPreview(false);
                              }}
                              style={{ marginRight: "15px" }}
                            >
                              Hide Preview
                            </Button>
                          )}
                          <Button
                            buttonStyle="button--primary--solid"
                            buttonSize="button--medium"
                            onClick={() => {
                              push("");
                              setAddMore(index + 1);
                            }}
                          >
                            Add More Contents
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              });
            }}
          </FieldArray>

          <div style={style}>
            <FormikController
              control="file"
              label="Upload Documents :"
              name="PdfFile"
              title="Add Documents"
              accept={SUPPORTED_FORMATS_PDF}
              placeholder="ex Assembly manual, flyer, proposal, etc."
            />

            <FormikController
              control="multipleFile"
              label="Upload other Multiple Photos of Project :"
              name="Gallery"
              title="Add photos"
              accept={SUPPORTED_FORMATS}
            />
          </div>

          <div className="d-flex justify-content-end">
            <FormikController
              name="termsCondition"
              control="checkbox"
              label="I agree with Terms and Conditions before submission of Project details and files."
            />
          </div>

          <div className="d-flex justify-content-end">
            <Button
              buttonStyle="button--white--outline"
              buttonSize="button--small"
              type="button"
            >
              Cancel
            </Button>
            <div className="ml-5">
              <FormikController title="Upload" type="submit" control="submit" />
            </div>
          </div>
        </FormikComponent>
      </div>
    </div>
  );
}

export default CreateFeatureProject_newest;
