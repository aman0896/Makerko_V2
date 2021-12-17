import React, { useRef, useState, useEffect } from "react";
import DropZone from "../Components/input/DropZone";
import WrapperComponent from "../Components/WrapperComponent";
import FormikComponent from "../Components/formik/FormikComponent";
import FormikController from "../Components/formik/FormikController";
import { GetAQuoteValidationSchema } from "./Form/ValidationSchema";
import hubListData from "../config/HubList.json";
import Card from "../Components/Card";
import { colors } from "../Values/colors";
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
  requestPrototype: false,
  checkDesign: false,
  requestQuotation: false,
};

function GetAQuote() {
  const formRef = useRef();
  const [selectedHub, setSelectedHub] = useState();
  const [hub, setHub] = useState(null);
  const makersList = useSelector((state) => state.makersList.makersList);

  const methods = useSelector((state) => state.method.method);
  const materials = useSelector((state) => state.material.material);
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
    console.log(filteredMaterial[0], "material");
    setSelectedMaterial(filteredMaterial[0]);
    formRef.current.setFieldValue("material", filteredMaterial[0]);
  };

  const onMaterialSelect = (material) => {
    formRef.current.setFieldValue("material", material);
    setSelectedMaterial(material);
  };

  const imageStyle = {
    objectFit: "cover",
    width: "100%",
    height: "260px",
  };

  const titleStyle = {
    color: colors.primary,
  };

  const cardStyle = {
    borderRadius: "5px",
    overflow: "hidden",
    height: "392px",
    width: "98%",
  };

  const cardStyleActive = {
    borderRadius: "5px",
    overflow: "hidden",
    height: "392px",
    width: "98%",
    border: `1px solid ${colors.primary}`,
  };

  const descriptionStyle = {
    color: colors.primary,
  };

  // useEffect(() => {
  //     setHubs(makersList);
  // }, [makersList]);

  const list = hubListData.map((hub, index) => {
    if (selectedHub && selectedHub === index) {
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
        description={hub.Brief_Descsr}
        imageFit="contain"
        selectedCard={(selectedCard) => {
          setSelectedHub(selectedCard);
        }}
      />
    );
  });

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
      maker: hubListData[selectedHub],
      currentUserData,
      file: values.file,
    };
    postData(
      getAQuote,
      data,
      (onSuccess) => {
        Toast(onSuccess.data.message, "success");
        console.log(onSuccess, "success");
      },
      (onFail) => {}
    );
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
          <FormikController title="Upload" type="submit" control="submit" />
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
