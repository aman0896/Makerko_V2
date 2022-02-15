import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { postData } from "../commonApi/CommonApi";
import { requestDesign } from "../commonApi/Link";
import FormikComponent from "../Components/formik/FormikComponent";
import FormikController from "../Components/formik/FormikController";
import { Toast } from "../Components/ReactToastify";
import WrapperComponent from "../Components/WrapperComponent";
import { colors } from "../Values/colors";
import { RequestDesignValidationSchema } from "./Form/ValidationSchema";
import "./RequestDesign.css";

const InitialValues = {
    productFile: "",
    sketchFile: "",
    description: "",
    termsCondition: false,
};

function RequestDesign() {
    const formRef = useRef();
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );
    const acceptedFiles = ".pdf, .jpeg, .dxf, .stl, .obj, .step, .tif";

    const handleSubmit = (values) => {
        console.log(values, "valuesrequestdesign");
        const data = { values, currentUserData };

        postData(
            requestDesign,
            data,
            (onSuccess) => {
                if (onSuccess.data.mailSent === true) {
                    Toast("Request Sent Successfully", "success");
                    formRef.current.resetForm();
                }

                console.log(onSuccess, "success");
            },
            (onFail) => {}
        );
    };

    const onCancel = () => {
        formRef.current.resetForm();
        window.location.href = "/";
    };

    return (
        <WrapperComponent>
            <div>
                <div className="heading request-design-title">Need Design</div>
                <div>
                    All fields with <span style={{ color: "red" }}>*</span> are
                    required
                </div>
                <FormikComponent
                    initialValues={InitialValues}
                    onSubmit={handleSubmit}
                    validationSchema={RequestDesignValidationSchema}
                    formRef={formRef}
                >
                    <div className="row mt-5 mx-auto request-design-subtitle sub-heading">
                        Upload Product photographs or inspirations
                    </div>
                    <div className="mt-2">
                        <FormikController
                            name="productFile"
                            control="dropzone"
                            accept={acceptedFiles}
                            requirementNote="File size < 15 MB"
                        />
                    </div>

                    <div className="row mt-5 mx-auto request-design-subtitle sub-heading">
                        Upload Sketches or drawings
                    </div>
                    <div className="mt-2">
                        <FormikController
                            name="sketchFile"
                            control="dropzone"
                            accept={acceptedFiles}
                            requirementNote="File size < 15 MB"
                        />
                    </div>
                    <div className="row mt-5 mx-auto request-design-subtitle sub-heading">
                        Description of your project
                    </div>
                    <div className="col mt-2">
                        <FormikController
                            name="description"
                            control="textarea"
                            placeholder="Description of your project"
                            // setInitial={currentUserData.Brief_Description}
                        />
                    </div>
                    <div className=" col mt-3 d-flex justify-content-end">
                        <FormikController
                            label={
                                <>
                                    I agree with
                                    <a
                                        href="/#"
                                        className="ml-1"
                                        style={{
                                            color: colors.primary,
                                        }}
                                    >
                                        Terms and Conditions{" "}
                                    </a>
                                    before submission of Project details and
                                    files.
                                </>
                            }
                            name="termsCondition"
                            control="checkbox"
                        />
                    </div>
                    <div className="col mt-3 d-flex justify-content-end">
                        <div className="cancelButton">
                            <FormikController
                                title="Cancel"
                                type="button"
                                control="cancel"
                                buttonStyle="button--danger--outline"
                                onClick={onCancel}
                            />
                        </div>
                        <div>
                            <FormikController
                                title="Submit"
                                type="submit"
                                control="submit"
                                buttonStyle="button--primary--solid"
                                buttonSize="button--small"
                            />
                        </div>
                    </div>
                </FormikComponent>
            </div>
        </WrapperComponent>
    );
}

export default RequestDesign;
