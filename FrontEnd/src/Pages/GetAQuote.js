import React, { useRef, useState, useEffect } from "react";
import WrapperComponent from "../Components/WrapperComponent";
import FormikComponent from "../Components/formik/FormikComponent";
import FormikController from "../Components/formik/FormikController";
import { GetAQuoteValidationSchema } from "./Form/ValidationSchema";
import { Toast } from "../Components/ReactToastify";
import { useSelector } from "react-redux";
import { postData } from "../commonApi/CommonApi";
import { getAQuote } from "../commonApi/Link";
import CardViewVerticalComponent from "../Components/card/CardViewVerticalComponent";

const InitialValues = {
    method: "",
    material: "",
    thickness: "",
    quantity: "",
    file: "",
    description: "",
    requestPrototype: false,
    checkDesign: false,
    requestQuotation: false,
};

function GetAQuote() {
    const formRef = useRef();
    const [selectedHub, setSelectedHub] = useState();
    const [hub, setHubs] = useState(null);
    const [filteredHub, setHubList] = useState();
    const makersList = useSelector((state) => state.makersList.makersList);

    const methods = useSelector((state) => state.method.method);
    const materials = useSelector((state) => state.material.material);
    const makersServices = useSelector(
        (state) => state.makersServices.services
    );
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );
    const [filteredMaterial, setFilteredMaterial] = useState();
    const [selectedMaterial, setSelectedMaterial] = useState();
    const [selectedMethod, setSelectedMethod] = useState();
    const [acceptedFiles, setAcceptedFiles] = useState();

    const onMethodSelect = (method) => {
        formRef.current.setFieldValue("method", method);
        setSelectedMethod(method);

        setAcceptedFiles(method.Accepted_Files);
        const filteredMaterial = materials.filter(
            (material) => material.Service_ID === method.Service_ID
        );
        setFilteredMaterial(filteredMaterial);
        setSelectedMaterial(filteredMaterial[0]);
        formRef.current.setFieldValue("material", filteredMaterial[0]);
    };

    const onMaterialSelect = (material) => {
        formRef.current.setFieldValue("material", material);
        setSelectedMaterial(material);
    };

    useEffect(() => {
        if (makersList && makersServices && selectedMethod) {
            const filteredServices = makersServices.filter(
                (service) => service.Service_ID === selectedMethod.Service_ID
            );
            const filteredMakersList = makersList.filter((maker) => {
                if (filteredServices.length > 0) {
                    const data = filteredServices.map((service) => {
                        if (service.Manufacturer_ID === maker.Manufacturer_ID)
                            return maker;
                    });
                    return data;
                } else return null;
            });
            if (filteredMakersList && filteredMakersList.length > 0) {
                setHubList(filteredMakersList);
            } else setHubList([]);
        }
    }, [makersList, makersServices, selectedMethod]);

    const list =
        filteredHub && filteredHub.length > 0
            ? filteredHub.map((hub, index) => {
                  if (selectedHub === index) {
                      var selected = true;
                  } else {
                      selected = false;
                  }

                  return (
                      <CardViewVerticalComponent
                          selected={selected}
                          index={index}
                          header="makers hub"
                          name={hub.Company_Name}
                          image={hub.Logo}
                          description={hub.Brief_Description}
                          imageFit="contain"
                          setSelectedHub={setSelectedHub}
                      />
                  );
              })
            : "There are no hubs with selected method";

    const handleSubmit = (values) => {
        if (selectedHub === null || selectedHub === undefined) {
            Toast("Hub is not selected", "error");
            return;
        }
        const orderType = GetOrderType(
            values.requestPrototype,
            values.checkDesign,
            values.requestQuotation
        );
        if (orderType === null || orderType === undefined) {
            return;
        }
        const process = {
            method: values.method,
            material: values.material,
            thickness: values.thickness,
            quantity: values.quantity,
        };
        console.log(hub, "chekchub");
        const data = {
            process,
            orderType,
            maker: filteredHub[selectedHub],
            currentUserData,
            file: values.file,
        };
        postData(
            getAQuote,
            data,
            (onSuccess) => {
                console.log(onSuccess.data, "check quote");
                if (
                    onSuccess.data.mailSent[0].checkDesign === true ||
                    onSuccess.data.mailSent[1].requestPrototype === true ||
                    onSuccess.data.mailSent[2].requestQuotation === true
                ) {
                    Toast("Request Sent Successfully", "success");
                }
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
            <FormikComponent
                initialValues={InitialValues}
                onSubmit={handleSubmit}
                validationSchema={GetAQuoteValidationSchema}
                formRef={formRef}
            >
                <div className="row m-auto heading">Fabrication Process</div>
                <div className="row mt-2 mx-auto">
                    <div className="col-lg">
                        <FormikController
                            name="method"
                            control="select"
                            label="Method"
                            value={selectedMethod}
                            options={methods}
                            getOptionLabel={(options) => options.Name}
                            getOptionValue={(options) => options.Service_ID}
                            onChange={onMethodSelect}
                        />
                    </div>
                    <div className="col-lg">
                        <FormikController
                            name="material"
                            control="select"
                            label="Material"
                            value={selectedMaterial}
                            options={filteredMaterial}
                            getOptionLabel={(options) => options.Material_Name}
                            getOptionValue={(options) => options.Material_ID}
                            onChange={onMaterialSelect}
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
                        accept={acceptedFiles}
                        requirementNote="File size < 15 MB"
                    />
                </div>

                <div className="row mt-5 mx-auto heading">Select your hub</div>
                <div className=" row mx-auto mt-2 p-3 border d-flex justify-content-center align-items-center">
                    {list}
                </div>
                <div className="row mt-5 mx-auto heading">
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
                <div className="d-flex mt-3 justify-content-end">
                    <div className="m-1">
                        <FormikController
                            label="Request Prototype"
                            name="requestPrototype"
                            control="checkbox"
                        />
                    </div>
                    <div className="m-1">
                        <FormikController
                            label="Check Design"
                            name="checkDesign"
                            control="checkbox"
                        />
                    </div>
                    <div className="m-1">
                        <FormikController
                            label="Request Quotation"
                            name="requestQuotation"
                            control="checkbox"
                        />
                    </div>
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

function GetOrderType(requestPrototype, checkDesign, requestQuotation) {
    let checkedList;

    if (checkDesign && requestPrototype && requestQuotation) {
        return (checkedList = [
            "Check Design",
            "Request Prototype",
            "Request Quotation",
        ]);
    } else if (checkDesign && requestPrototype) {
        return (checkedList = ["Check Design", "Request Prototype"]);
    } else if (checkDesign && requestQuotation) {
        return (checkedList = ["Check Design", "Request Quotation"]);
    } else if (requestPrototype && requestQuotation) {
        return (checkedList = ["Request Prototype", "Request Quotation"]);
    } else if (checkDesign) {
        return (checkedList = ["Check Design"]);
    } else if (requestPrototype) {
        return (checkedList = ["Request Prototype"]);
    } else if (requestQuotation) {
        return (checkedList = ["Request Quotation"]);
    } else {
        Toast("Atleast one check box must be selected", "error");
        return;
    }
}
