import React, { useState } from "react";
import DropZone from "../Components/input/DropZone";
import WrapperComponent from "../Components/WrapperComponent";
import FormikComponent from "../Components/formik/FormikComponent";
import FormikController from "../Components/formik/FormikController";
import { GetAQuoteValidationSchema } from "./Form/ValidationSchema";

const InitialValues = {
    method: "",
    material: "",
    thickness: "",
    quantity: "",
    file: "",
};

function GetAQuote() {
    const method = [
        {
            value: 1,
            type: "CNC Cutting",
        },
        {
            value: 2,
            type: "3D Printing",
        },
        {
            value: 3,
            type: "Laser Cutting",
        },
    ];

    const material = [
        {
            value: 1,
            type: "Steel",
        },
        {
            value: 2,
            type: "Wood",
        },
        {
            value: 3,
            type: "PVC",
        },
    ];

    const handleSubmit = (values) => {
        console.log(values, "values");
    };
    return (
        <WrapperComponent>
            <FormikComponent
                initialValues={InitialValues}
                onSubmit={handleSubmit}
                validationSchema={GetAQuoteValidationSchema}
            >
                <div className="row m-auto heading">Fabrication Process</div>
                <div className="row mt-2 mx-auto">
                    <div className="col-lg">
                        <FormikController
                            name="method"
                            control="select"
                            label="Method"
                            options={method}
                            getOptionLabel={(options) => options.type}
                        />
                    </div>
                    <div className="col-lg">
                        <FormikController
                            name="material"
                            control="select"
                            label="Material"
                            options={material}
                            getOptionLabel={(options) => options.type}
                        />
                    </div>
                    <div className="position-relative col-lg">
                        <FormikController
                            name="thickness"
                            control="input"
                            placeholder="Thickness..."
                            label="Thickness"
                            isUnit
                            unit="mm"
                        />
                    </div>
                    <div className="col-lg">
                        <FormikController
                            name="quantity"
                            control="input"
                            placeholder="Quantity..."
                            label="Quantity"
                            isUnit
                            unit="pcs"
                        />
                    </div>
                </div>
                <div className="row mt-5 mx-auto heading">Upload File</div>
                <div className="mt-2">
                    <FormikController
                        name="file"
                        label="Upload File"
                        control="dropzone"
                        // accept={this.state.acceptedFiles}
                        // requirementNote="File size < 15 MB"
                        // user={this.state.user}
                        // error={this.state.errMsg}
                        // fileUpload={this.state.fileUpload}
                    />
                </div>
                <div className="col mt-3 d-flex justify-content-end">
                    <FormikController
                        title="Upload"
                        type="submit"
                        control="submit"
                    />
                </div>
            </FormikComponent>
        </WrapperComponent>
    );
}

export default GetAQuote;
