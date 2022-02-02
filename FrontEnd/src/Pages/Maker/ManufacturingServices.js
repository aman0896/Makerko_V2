import * as Yup from "yup";
import FormikComponent from "../../Components/formik/FormikComponent";
import FormikController from "../../Components/formik/FormikController";
import { colors } from "../../Values/colors";
import TableComponent from "../../Components/table/TableComponent";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DeleteMfgProcess,
    GetMfgProcess,
    MfgProcess,
} from "../../Components/Redux/Actions/MfgProcess";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronCircleUp,
    faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";

// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

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

function ManufacturingServices(props) {
    const [formikData, setFormikData] = useState([]);
    const [mfgData, setMfgData] = useState([]);
    const formRef = useRef();
    const methods = useSelector((state) => state.method.method);
    const materials = useSelector((state) => state.material.material);
    const [filteredMaterial, setFilteredMaterial] = useState();
    const [selectedMaterial, setSelectedMaterial] = useState();
    const [selectedMethod, setSelectedMethod] = useState();
    const [acceptedFiles, setAcceptedFiles] = useState();
    const [status, setStatus] = useState(false);
    const [key, setKey] = useState();
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const mfgProcess = useSelector((state) => state.mfgProcess.mfgProcess);
    const materialError = useSelector(
        (state) => state.mfgProcess.materialError
    );
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );

    useEffect(() => {
        console.log(currentUserData, "inside useeffect");
        GetMfgProcess(dispatch, currentUserData);
    }, [currentUserData]);

    const onMethodSelect = (method) => {
        formRef.current.setFieldValue("fabricationService", method);
        setSelectedMethod(method);
        const filteredMaterial = materials.filter(
            (material) => material.Service_ID === method.Service_ID
        );
        setFilteredMaterial(filteredMaterial);
        setSelectedMaterial(filteredMaterial[0]);
        formRef.current.setFieldValue("material", filteredMaterial[0]);
        setAcceptedFiles(method.Accepted_Files);
    };

    const onMaterialSelect = (material) => {
        formRef.current.setFieldValue("material", material);
        setSelectedMaterial(material);
    };

    const costUnit = [
        {
            value: 1,
            type: "Gram",
        },
        {
            value: 2,
            type: "Kg",
        },
        {
            value: 3,
            type: "Sq.feet",
        },
        {
            value: 3,
            type: "Minute",
        },
        {
            value: 3,
            type: "Cubic Inch",
        },
    ];

    const handleSubmit = (values) => {
        console.log(mfgProcess, "values");
        setFormikData(values);
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

        var data = {
            fabricationService: {
                Service_ID: fabricationService.Service_ID,
                Name: fabricationService.Name,
            },
            materialDetails: [
                {
                    material: material,
                    thickness,
                    costUnit: costUnit,
                    unitRate,
                    MoQ,
                    leadTime,
                },
            ],
        };
        dispatch(MfgProcess(data));
        setStatus(true);
    };

    const column = [
        {
            field: "selectedMaterial",
            subField: "Material_Name",
            header: "Materials",
        },
        {
            field: "thickness",
            header: "Thickness",
        },
        {
            field: "costUnit",
            subField: "type",
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
        {
            field: "action",
            header: "Action",
        },
    ];

    const onDeleteClick = (materialData) => {
        const tempData = mfgProcess.map((data) => {
            const filteredData = data.materialDetails.filter(
                (mdata) => mdata !== materialData
            );
            data.materialDetails = filteredData;
            return data;
        });

        const newTempData = tempData.filter((data) => {
            if (data.materialDetails.length > 0) {
                return data;
            }
        });

        dispatch(DeleteMfgProcess(newTempData));
    };

    useEffect(() => {
        setStatus(false);
    }, [mfgProcess, status]);

    const TableData = ({ data }) => {
        const [expandToggle, setExpandToggle] = useState(false);
        const onExpandToggleClick = () => {
            setExpandToggle(!expandToggle);
        };
        return (
            <div className="mb-2">
                <div className="">
                    <div
                        className="d-flex justify-content-between align-items-center pl-3 pr-3 "
                        style={{
                            backgroundColor: colors.primary,
                            height: "40px",
                            borderRadius: "3px",
                            position: "relative",
                            color: colors.white,
                            width: "100%",
                        }}
                    >
                        <div style={{ marginLeft: 2, fontWeight: "bold" }}>
                            {`${data.fabricationService.Name}`}
                        </div>

                        <div style={{ marginRight: 3 }}>
                            <FontAwesomeIcon
                                style={{ transition: "all 0.5s ease" }}
                                icon={
                                    expandToggle
                                        ? faChevronCircleUp
                                        : faChevronCircleDown
                                }
                                onClick={() => onExpandToggleClick()}
                            />
                        </div>
                    </div>
                </div>

                {expandToggle && (
                    <TableComponent
                        column={column}
                        data={data.materialDetails}
                        onDeleteClick={onDeleteClick}
                    />
                )}
            </div>
        );
    };

    return (
        <div>
            {mfgProcess.length > 0 &&
                mfgProcess.map((data) => <TableData data={data} />)}

            <div className="heading title">Manufacturing Process:</div>
            <FormikComponent
                initialValues={InitialValues}
                onSubmit={handleSubmit}
                validationSchema={MakersValidationSchema}
                formRef={formRef}
            >
                <div className="d-flex justify-content-end mt-2">
                    <FormikController
                        title="Add New"
                        type="submit"
                        control="submit"
                    />
                </div>
                <div className="row mt-3">
                    <div className="col-lg-3">
                        <FormikController
                            name="fabricationService"
                            control="select"
                            label="Fabrication Service"
                            value={selectedMethod}
                            options={methods}
                            getOptionLabel={(options) => options.Name}
                            getOptionValue={(options) => options.Service_ID}
                            onChange={onMethodSelect}
                        />
                    </div>
                </div>
                <div className="row mt-2">
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
                    <div className="col-lg">
                        <FormikController
                            name="thickness"
                            control="input"
                            label="Thickness"
                            type="number"
                            setInitial=""
                        />
                    </div>
                    <div className="col-lg">
                        <FormikController
                            name="costUnit"
                            control="select"
                            label="Cost Unit"
                            options={costUnit}
                            getOptionLabel={(options) => options.type}
                        />
                    </div>
                    <div className="col-lg">
                        <FormikController
                            name="unitRate"
                            control="input"
                            label="Unit Rate"
                            //type="number"
                            setInitial=""
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
                            value={acceptedFiles}
                        />
                    </div>
                    <div className="col-lg-3">
                        <FormikController
                            name="MoQ"
                            control="input"
                            label="Moq"
                            setInitial=""
                        />
                    </div>
                    <div className="col-lg-3">
                        <FormikController
                            name="leadTime"
                            control="input"
                            label="Lead Time"
                            setInitial=""
                        />
                    </div>
                </div>
            </FormikComponent>
        </div>
    );
}

export default ManufacturingServices;
