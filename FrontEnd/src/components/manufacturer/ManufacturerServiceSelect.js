import React, { Component } from "react";
import Select from "react-select";
import DropDown from "../global/DropDown";
import { TextBox } from "../global/TextBox";
import {} from "@fortawesome/free-regular-svg-icons";
import {
    CheckRange,
    GetFabricationServices,
    GetMaterialFromFabrication,
} from "../global/GlobalFunction";
import Button from "../global/Button";
import Alert from "../global/Alert";

var services = [];
class ManufacturerServiceSelect extends Component {
    state = {
        selectedFabrication: "",
        selectedMaterial: "",
        thickness: "-",
        costUnit: "",
        unitRate: "",
        leadTime: "",
        MoQ: "",
        fabricationError: "",
        materialError: "",
        thicknessError: "",
        costUnitError: "",
        unitRateError: "",
        MoQError: "",
        leadTimeError: "",
        fabricationServiceList: [],
        materialList: [],
        minRange: "",
        maxRange: "",
        showThickness: false,
        rangeCheck: false,
        acceptedFiles: "",

        costUnitList: [
            {
                value: 1,
                label: "Gram",
            },
            {
                value: 2,
                label: "Kg",
            },
            {
                value: 3,
                label: "Sq.feet",
            },
            {
                value: 3,
                label: "Minute",
            },
            {
                value: 3,
                label: "Cubic Inch",
            },
        ],
        delivery: [
            {
                value: 1,
                label: "Within 20km^2",
            },
            {
                value: 2,
                label: "All Nepal",
            },
            {
                value: 3,
                label: "Pickup",
            },
        ],
    };

    componentDidMount() {
        GetFabricationServices((err, fabricationServices) => {
            if (!err)
                this.setState({ fabricationServiceList: fabricationServices });
        });
    }

    handleOnFabricationServiceChange = (e) => {
        this.setState({ selectedFabrication: e });
        if (e) {
            const serviceID = e.Service_ID;
            AddThicknessRange(
                serviceID,
                (showThickness, minRange, maxRange) => {
                    this.setState({
                        showThickness: showThickness,
                        minRange: minRange,
                        maxRange: maxRange,
                    });
                }
            );
            GetMaterialFromFabrication(serviceID, (err, materials) => {
                if (!err) {
                    this.setState({
                        materialList: materials,
                        selectedMaterial: materials[0],
                        materialError: "",
                    });
                }
            });
            this.setState({ acceptedFiles: e.Accepted_Files });
        } else {
            this.setState({
                materialList: [],
                selectedMaterial: [],
            });
            this.setState({ acceptedFiles: "", showThickness: false });
        }
        this.setState({ fabricationError: "" });
    };

    handleOnMaterialChange = (e) => {
        this.setState({ selectedMaterial: e, materialError: "" });
    };

    handleOnCostUnitChange = (e) => {
        this.setState({ costUnitError: "" });
        this.setState({ costUnit: e });
    };

    handleOnThicknessChange = (e) => {
        const { minRange, maxRange, showThickness } = this.state;
        const range = CheckRange(e.target.value, minRange, maxRange);
        this.setState({ rangeCheck: range });
        this.setState({ thicknessError: "" });
        this.setState({ thickness: e.target.value });
    };

    handleOnUnitRateChange = (e) => {
        this.setState({ unitRateError: "" });
        this.setState({
            unitRate: e.target.value,
        });
    };

    handleOnMoQChange = (e) => {
        this.setState({ MoQ: e.target.value, MoQError: "" });
    };

    handleOnLeadTimeChange = (e) => {
        this.setState({ leadTime: e.target.value, leadTimeError: "" });
    };

    onClickAdd = () => {
        var {
            selectedFabrication,
            selectedMaterial,
            thickness,
            costUnit,
            unitRate,
            MoQ,
            leadTime,
            error,
        } = this.state;
        if (
            !selectedFabrication ||
            !selectedMaterial ||
            !thickness ||
            !costUnit ||
            !unitRate ||
            !MoQ ||
            !leadTime
        ) {
            if (!selectedFabrication) {
                this.setState({ fabricationError: "Required!!!" });
            }
            if (!selectedMaterial) {
                this.setState({ materialError: "Required!!!" });
            }
            if (!thickness) {
                this.setState({ thicknessError: "Required!!!" });
            }
            if (!unitRate) {
                this.setState({ unitRateError: "Required!!!" });
            }
            if (!costUnit) {
                this.setState({ costUnitError: "Required!!!" });
            }
            if (!MoQ) {
                this.setState({ MoQError: "Required!!!" });
            }
            if (!leadTime) {
                this.setState({ leadTimeError: "Required!!!" });
            }
        } else {
            var data = {
                selectedFabrication,
                materialDetails: [
                    {
                        selectedMaterial,
                        thickness,
                        costUnit,
                        unitRate,
                        MoQ,
                        leadTime,
                    },
                ],
            };
            var mateiralExist = false;
            var serviceExist = false;
            if (services.length > 0) {
                services.map((service, index) => {
                    if (
                        data.selectedFabrication === service.selectedFabrication
                    ) {
                        serviceExist = true;
                        service.materialDetails.map((materialDetail) => {
                            if (
                                data.materialDetails[0].selectedMaterial ===
                                materialDetail.selectedMaterial
                            ) {
                                this.props.isExist(true);
                                return (mateiralExist = true);
                            }
                        });
                        if (!mateiralExist) {
                            return (service.materialDetails =
                                service.materialDetails.concat(
                                    data.materialDetails[0]
                                ));
                        }
                    }
                });
                if (!serviceExist) {
                    services = services.concat(data);
                }
            } else {
                services = services.concat(data);
            }

            if (this.props.profileEdit) {
                this.props.getAddedService(data);
            } else {
                this.props.getService(services);
            }

            this.setState({
                selectedFabrication: "",
                selectedMaterial: "",
                thickness: "-",
                costUnit: "",
                unitRate: "",
                error: "",
                MoQ: "",
                leadTime: "",
            });
        }
        this.props.setShowAlert(false);
    };

    render() {
        const {
            fabricationServiceList,
            materialList,
            costUnitList,
            acceptedFiles,
            selectedFabrication,
            selectedMaterial,
            costUnit,
            unitRate,
            thickness,
        } = this.state;
        const style = {
            width: "100px",
        };

        const rowView = "row m-1";
        const colView1 = "col-lg m-2 no-gap";
        const colView2 = "col-lg m-2 no-gap";

        const customStyles = {
            control: (base) => ({
                ...base,
                height: "50px",
                minHeight: "50px",
            }),
            indicatorSeparator: () => {},
            dropdownIndicator: (defaultStyles) => ({
                ...defaultStyles,
                color: "#5044fd", // your changes to the arrow
                "&:hover": {
                    color: "#5044fd",
                },
            }),
        };

        const { showAlert, setShowAlert, alertMessage } = this.props;
        return (
            <div className="column-gap">
                <div className={rowView}>
                    <div className="col-lg  m-0 p-0 font-weight-bold">
                        <span
                            className="font-weight-bold m-0 p-0"
                            style={{
                                fontSize: "24px",
                                color: "#5044fd",
                                fontWeight: "bold",
                            }}
                        >
                            MANUFACTURING PROCESS
                        </span>
                    </div>

                    <div className="col-lg d-flex justify-content-end">
                        <Button
                            btnName="Add New"
                            type="Button"
                            styleClass="btn btn-small"
                            onClick={this.onClickAdd}
                            disabled={
                                this.state.showThickness
                                    ? !this.state.rangeCheck
                                    : false
                            }
                        />
                    </div>
                </div>

                {showAlert && (
                    <div className="mt-4">
                        <Alert
                            setShowAlert={setShowAlert}
                            alertType="alert-warning"
                            alertMessage={alertMessage}
                        />
                    </div>
                )}

                <div className={rowView}>
                    <div className={colView1}>
                        <div className="row d-flex flex-column no-gap">
                            <span className="font-weight-bold mb-2">
                                Fabrication Service
                            </span>

                            <Select
                                isClearable="true"
                                name="fabricationService"
                                id="fabricationService"
                                options={fabricationServiceList}
                                onChange={this.handleOnFabricationServiceChange}
                                value={selectedFabrication}
                                getOptionLabel={(options) => options.Name}
                                getOptionValue={(options) => options.Service_ID}
                                styles={customStyles}
                            />
                            <span
                                className="text-danger"
                                style={{
                                    fontSize: "10pt",
                                }}
                            >
                                {this.state.fabricationError}
                            </span>
                        </div>
                    </div>{" "}
                    <div className={colView2}></div>
                    <div className={colView2}></div>
                    <div className={colView2}></div>
                </div>
                <div className={rowView}>
                    <div className={colView1}>
                        <ServiceSelectView
                            label="Material"
                            options={materialList}
                            selectedValue={selectedMaterial}
                            onChange={this.handleOnMaterialChange}
                            getOptionLabel={(options) => options.Material_Name}
                            getOptionValue={(options) => options.Material_ID}
                            error={this.state.materialError}
                        />
                    </div>{" "}
                    <div className={colView2}>
                        <TextBox
                            type="number"
                            label="Thickness"
                            style={{
                                borderColor:
                                    (this.state.rangeCheck && thickness) ||
                                    !thickness ||
                                    thickness === "-"
                                        ? "lightGray"
                                        : "red",
                                height: "50px",
                                borderRadius: "5px",
                            }}
                            name="thickness"
                            onChange={this.handleOnThicknessChange}
                            value={this.state.showThickness ? thickness : ""}
                            error={this.state.thicknessError}
                            readOnly={this.state.showThickness ? false : true}
                        />
                        {this.state.showThickness && (
                            <div className="">
                                {this.state.minRange}-{this.state.maxRange}
                                mm
                            </div>
                        )}
                    </div>
                    <div className={colView2}>
                        <ServiceSelectView
                            label="Cost Unit"
                            options={costUnitList}
                            onChange={this.handleOnCostUnitChange}
                            selectedValue={costUnit}
                            error={this.state.costUnitError}
                        />
                    </div>{" "}
                    <div className={colView2}>
                        <TextBox
                            label="Unit Rate"
                            name="unitRate"
                            onChange={this.handleOnUnitRateChange}
                            value={unitRate}
                            error={this.state.unitRateError}
                        />
                    </div>
                </div>
                <div className={rowView}>
                    <div className={colView1}>
                        <TextBox
                            label="Accepted Files"
                            name="acceptedFiles"
                            value={acceptedFiles ? acceptedFiles : ""}
                            readOnly={true}
                        />
                    </div>
                    <div className={colView2}>
                        <TextBox
                            label="MoQ"
                            name="moq"
                            value={this.state.MoQ}
                            onChange={this.handleOnMoQChange}
                            error={this.state.MoQError}
                        />
                    </div>
                    <div className={colView2}>
                        <TextBox
                            label="Lead Time"
                            name="leadTime"
                            value={this.state.leadTime}
                            onChange={this.handleOnLeadTimeChange}
                            error={this.state.leadTimeError}
                        />
                    </div>{" "}
                    <div className={colView2}></div>
                </div>
                <div className={rowView}></div>
            </div>
        );
    }
}

export default ManufacturerServiceSelect;

export const ServiceSelectView = (props) => {
    return (
        <div className="row d-flex flex-column no-gap">
            <span
                className={
                    props.styleClass
                        ? props.styleClass
                        : "font-weight-bold mb-2"
                }
            >
                {props.label}
            </span>

            <DropDown {...props} />
            <span
                className="text-danger"
                style={{
                    fontSize: "10pt",
                }}
            >
                {props.error}
            </span>
        </div>
    );
};

function AddThicknessRange(fabricationServiceID, ThicknessAndRange) {
    if (fabricationServiceID === 2) {
        ThicknessAndRange(true, 0, 20);
    } else if (fabricationServiceID === 3) {
        ThicknessAndRange(true, 2, 30);
    } else if (fabricationServiceID === 5) {
        ThicknessAndRange(true, 1, 30);
    } else if (fabricationServiceID === 6) {
        ThicknessAndRange(true, 0.2, 2);
    } else if (fabricationServiceID === 12) {
        ThicknessAndRange(true, 0.5, 3);
    } else {
        ThicknessAndRange(false, null, null);
    }
}
