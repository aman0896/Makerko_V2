import * as Yup from "yup";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import { useWindowDimensions } from "../../Functions";
import { colors } from "../../Values/colors";
import OtherServices from "./OtherServices";
import TableComponent from "../../Components/table/TableComponent";
import { useState } from "react";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const MakersValidationSchema = Yup.object().shape({
  fabricationService: Yup.object().required(
    "Fabrication Service Status is required."
  ),
  material: Yup.object().required("Material is required."),
  thickness: Yup.number().required("Thickness is required."),
  costUnit: Yup.object().required("Cost Unit is required."),
  unitRate: Yup.string().required("Material is required."),
  MoQ: Yup.string().required("MoQ is required."),
  leadTime: Yup.string().required("Lead Time is required."),
});

function ManufacturingServices() {
  const [formikData, setFormikData] = useState([]);

  const InitialValues = {
    fabricationService: "",
    material: "",
    thickness: "",
    costUnit: "",
    unitRate: "",
    acceptedFiles: "",
    MoQ: "",
    leadTime: "",
  };

  const companyStatus = [
    {
      value: 1,
      type: "Registered Company",
    },
    {
      value: 2,
      type: "Individual/Hobbyist",
    },
  ];

  const handleSubmit = (values) => {
    console.log(values, "values");
    const {
      fabricationService,
      material,
      thickness,
      costUnit,
      unitRate,
      acceptedFiles,
      MoQ,
      leadTime,
    } = values;
    const data = {
      fabricationService: fabricationService.type,
      material: material.type,
      thickness,
      costUnit: costUnit.type,
      unitRate,
      MoQ,
      leadTime,
    };
    // setFormikData([...formikData, data]);
  };

  const { width } = useWindowDimensions();
  const column = [
    {
      field: "material",
      header: "Materials",
    },
    {
      field: "thickness",
      header: "Thickness",
    },
    {
      field: "costUnit",
      header: "Cost Unit",
    },
    {
      field: "unitRate",
      header: "Unit Rate",
    },
    {
      field: "leadTime",
      header: "Lead Time",
    },
  ];

  return (
    <div>
      {/* {console.log(formikData, "data line 83")}
      {formikData.length > 0 && (
        <>
          <TableComponent column={column} data={formikData} />
        </>
      )} */}
      <div
        className="heading titke"
        style={{ fontSize: 36, color: colors.primary }}
      >
        Manufacturing Process:
      </div>
      <FormikComponent
        initialValues={InitialValues}
        onSubmit={handleSubmit}
        validationSchema={MakersValidationSchema}
      >
        <div className="d-flex justify-content-end mt-2">
          <FormikController title="Add New" type="submit" control="submit" />
        </div>
        <div className="row mt-3">
          <div className="col-lg-3">
            <FormikController
              name="fabricationService"
              control="select"
              label="Fabrication Service"
              options={companyStatus}
              getOptionLabel={(options) => options.type}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-lg">
            <FormikController
              name="material"
              control="select"
              label="Material"
              options={companyStatus}
              getOptionLabel={(options) => options.type}
            />
          </div>
          <div className="col-lg">
            <FormikController
              name="thickness"
              control="input"
              label="Thickness"
              type="number"
            />
          </div>
          <div className="col-lg">
            <FormikController
              name="costUnit"
              control="select"
              label="Cost Unit"
              options={companyStatus}
              getOptionLabel={(options) => options.type}
            />
          </div>
          <div className="col-lg">
            <FormikController
              name="unitRate"
              control="input"
              label="Unit Rate"
              //type="number"
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-lg-3">
            <FormikController
              name="acceptedFiles"
              control="input"
              label="Accepted Files"
              readOnly
            />
          </div>
          <div className="col-lg-3">
            <FormikController name="MoQ" control="input" label="Moq" />
          </div>
          <div className="col-lg-3">
            <FormikController
              name="leadTime"
              control="input"
              label="Lead Time"
            />
          </div>
        </div>
      </FormikComponent>
    </div>
  );
}

export default ManufacturingServices;
