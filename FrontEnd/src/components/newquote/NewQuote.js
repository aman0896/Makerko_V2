import React, { Component, createRef, useContext } from "react";
import Dropzone from "../global/Dropzone";
import HubListArea from "./HubListArea";
import "../global/dropZone.css";
import axios from "axios";
import { GetCookiesInfo } from "../global/GlobalFunction";
import FabricationProcessSelect from "./FabricationProcessSelect";
import Alert from "../global/Alert";
import "./NewQuote.css";
import Footer from "../main/footer";
import CancelButton from "../global/CancelButton";
import { GetUserInfo } from "../common/restApi";
import ReactToastify from "../global/ReactToastify";
import { toast } from "react-toastify";
import TermsAndPolicy from "../main/Terms&Policy";

class NewQuote extends Component {
    constructor() {
        super();
        this.state = {
            categories: [
                { id: 1, name: "Request for Prototype" },
                { id: 2, name: "Check Design" },
                { id: 3, name: "Request Quotation" },
            ],
            checkedItems: new Map(),
            items: "",

            filename: "",
            filepath: "",
            email: "",
            dropDownData: null,
            message: "",
            fileData: null,
            user: "",
            errMsg: undefined,
            fileUpload: false,
            acceptedFiles: "",
            selectedHub: "",
            isChecked: false,
            error: "",
            itemChecked: false,
            errorID: "",
            userEmail: "",
            userId: "",
            username: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChecked() {
        console.log("check", this.state.isChecked);
        this.setState({ isChecked: !this.state.isChecked });

        this.setState({
            error: "",
        });
    }

    handleChange(event) {
        var isChecked = event.target.checked;
        var item = event.target.value;
        this.setState({ itemChecked: "" });
        this.setState((prevState) => ({
            checkedItems: prevState.checkedItems.set(item, isChecked),
        }));
    }
    handleSubmit(event) {
        console.log(this.state.checkedItems, "-----------");
        this.setState({ errMsg: "" });
        event.preventDefault();
    }
    async componentDidMount() {
        const userInfo = await GetCookiesInfo().then((response) => {
            return response.data;
        });
        console.log(userInfo);
        const { uid } = userInfo;
        this.setState({ userId: uid });
        //var userEmail = '';
        var userEmail = GetUserInfo(uid, (err, userInfo) => {
            if (err) {
                return console.log(err, "getuserinfoerr");
            }
            userEmail = userInfo[0].Email;
            return this.setState({
                userEmail: userInfo[0].Email,
                username: userInfo[0].First_Name,
            });
        });
    }

    onClickValidate = async () => {
        const {
            dropDownData,
            fileData,
            checkedItems,
            isChecked,
            userEmail,
            userId,
            username,
        } = this.state;
        let orderTypes;
        if (
            !dropDownData.selectedFabrication ||
            !dropDownData.selectedMaterial ||
            // !dropDownData.selectedThickness ||
            !dropDownData.selectedQuantity
        ) {
            return this.setState({
                errMsg: "All Fields are required",
            });
        } else if (!fileData) {
            return this.setState({
                errMsg: "File not Selected",
            });
        }

        const { Manufacturer_ID, Email } = this.state.selectedHub;
        var errors;
        if (!Manufacturer_ID) {
            return this.setState({
                errorID: "Select Your Hubs",
            });
        }
        GetOrderType(checkedItems, async (err, orderType) => {
            if (err) {
                console.log(err);
                errors = err;
                return this.setState({ itemChecked: err });
            }
            orderTypes = orderType;
        });

        if (errors) {
            return;
        } else if (!isChecked) {
            return this.setState({
                error: "Please accept the terms and conditions to continue.",
            });
        }
        console.log("order", orderTypes);
        const fabricationProcess = dropDownData.selectedFabrication.Name;
        const material = dropDownData.selectedMaterial.Material_Name;
        const thickness = dropDownData.selectedThickness;
        const quantity = dropDownData.selectedQuantity;
        const { fileName, filePath } = fileData;
        const validationPageUrl = `${window.hostAddress}/validation-page`;
        const orderStatusPageUrl = `${window.hostAddress}/maker/${Manufacturer_ID}/order-status`;

        const fileURL = `${filePath}`;

        axios
            .post(`${window.host}/order-specification`, {
                modelName: fileName,
                fabricationService: fabricationProcess,
                material: material,
                thickness: thickness,
                quantity: quantity,
                modelPath: fileURL,
                userId: userId,
                username: username,
                userEmail: userEmail,
                manufacturerID: Manufacturer_ID,
                manufacturerEmail: Email,
                validationPagePath: validationPageUrl,
                orderStatusPagePath: orderStatusPageUrl,
                orderType: orderTypes,

                //validationPagePath: validationPageUrl,
            })
            .then((response) => {
                if (response.data) {
                    const data = response.data;

                    data.map((element) => {
                        if (element.checkDesign) {
                            toast.success(
                                "A request for design check has been submitted"
                            );
                        } else if (
                            !element.checkDesign &&
                            element.checkDesign !== undefined
                        ) {
                            toast.error("A request for design submit fail");
                        }
                        if (element.requestPrototpe) {
                            toast.success(
                                "A request for prototype has been submitted"
                            );
                        } else if (
                            !element.requestPrototpe &&
                            element.requestPrototpe !== undefined
                        ) {
                            toast.error("A request for quotation submit fail");
                        }
                        if (element.requestQuotation) {
                            toast.success(
                                "A request for quotation has been submitted"
                            );
                        } else if (
                            !element.requestQuotation &&
                            element.requestQuotation !== undefined
                        ) {
                            toast.error("A request for quotation submit fail");
                        }
                    });
                    this.setState({
                        //message: response.data.message,
                        isSuccess: false,
                    });
                }
            });
    };

    handleCallback = (childData) => {
        this.setState({ errMsg: "" });
        console.log(childData);
        this.setState({ dropDownData: childData });
        if (childData.selectedFabrication) {
            this.setState({
                acceptedFiles: childData.selectedFabrication.Accepted_Files,
            });
        } else {
            this.setState({ acceptedFiles: "" });
        }
    };

    dropzoneHandleCallback = (childData) => {
        this.setState({ errMsg: "" });
        this.setState({ fileData: childData });
    };

    render() {
        const { dropDownData, errMsg, error, itemChecked, errorID } =
            this.state;
        return (
            <div className="p-3">
                <div
                    className="container mt-5 mb-5"
                    style={
                        {
                            //borderRadius: '5px',
                            //borderColor: 'lightgray',
                            // borderStyle: 'solid',
                            //borderWidth: '1px',
                        }
                    }
                >
                    <div className="titlequote  pl-3">Have a Design </div>
                    <div className="pl-3" style={{ fontSize: "14px" }}>
                        All fields with <span style={{ color: "red" }}>*</span>{" "}
                        are required
                    </div>
                    {errMsg && (
                        <div className="mt-4">
                            <Alert
                                onClick={() => {
                                    this.setState({ errMsg: "" });
                                }}
                                alertType="alert-warning"
                                alertMessage={errMsg}
                            />
                        </div>
                    )}
                    <div className="p-3">
                        <FabricationProcessSelect
                            title="Fabrication Process"
                            parentCallback={this.handleCallback}
                        />
                    </div>
                    <div className="p-3">
                        {console.log(this.state.acceptedFiles)}
                        <Dropzone
                            title="Upload File"
                            accept={this.state.acceptedFiles}
                            requirementNote="File size < 15 MB"
                            parentCallback={this.dropzoneHandleCallback}
                            user={this.state.user}
                            error={this.state.errMsg}
                            fileUpload={this.state.fileUpload}
                            path="models"
                        />
                    </div>
                    <div className="p-3 mt-5 ml-5">
                        <div className="col-sm mb-4">
                            <div className="title">Select Your Hubs</div>
                        </div>
                        {errorID && (
                            <div className="mt-4">
                                <Alert
                                    onClick={() => {
                                        this.setState({ errorID: "" });
                                    }}
                                    alertType="alert-warning"
                                    alertMessage={errorID}
                                />
                            </div>
                        )}
                        <HubListArea
                            title="Select Your Hubs"
                            HubList={dropDownData}
                            getSelectedHub={(selectedHub) =>
                                this.setState({
                                    selectedHub: selectedHub,
                                    errorID: "",
                                })
                            }
                        />
                    </div>
                    <div
                        className="row mt-5 d-flex justify-content-end"
                        style={{
                            backgroundColor: "white",
                            paddingLeft: "100px",
                            paddingRight: "45px",
                        }}
                    >
                        {this.state.categories.map((item) => (
                            <div
                                className="col-3-md"
                                style={{ fontSize: "15px" }}
                            >
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    name={item.name}
                                    onChange={this.handleChange}
                                    style={{
                                        marginRight: "10px",
                                        marginLeft: "10px",
                                    }}
                                />
                                {item.name}
                            </div>
                        ))}
                    </div>
                    {itemChecked && (
                        <span className="text-danger d-flex justify-content-end m-3">
                            {itemChecked}
                        </span>
                    )}
                    <div
                        className="row mt-5 mr-2 d-flex justify-content-end"
                        style={{
                            backgroundColor: "white",

                            fontWeight: "bold",
                            fontSize: "14px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <input
                            type="checkbox"
                            value="terms"
                            name="terms"
                            onChange={this.handleChecked}
                            style={{
                                marginRight: "10px",
                                marginLeft: "10px",
                                marginTop: "3px",
                            }}
                        />
                        I agree with&nbsp;
                        {/* <span
                            style={{
                                textDecoration: "underline",
                                color: "#5044fd",
                            }}
                        >
                            {" "}
                            Terms and Conditions{" "}
                        </span> */}
                        <TermsAndPolicy
                            subject="Terms and Conditions"
                            file="/terms&policy/T&C.pdf"
                            type="pdf"
                            style={{
                                color: "#5044fd",
                                textDecoration: "underline",
                            }}
                        />
                        &nbsp; before submission of Project details and files.
                    </div>
                    {error && (
                        <span className="text-danger d-flex justify-content-end m-3">
                            {error}
                        </span>
                    )}
                    <div
                        className="p-3 d-flex justify-content-end labeltext"
                        style={{ marginLeft: "150px", marginTop: "50px" }}
                    >
                        <button
                            type="button"
                            className="btn text-white"
                            style={{ backgroundColor: "#5044FD" }}
                            onClick={this.onClickValidate}
                            disabled={
                                dropDownData
                                    ? dropDownData.showThickness
                                        ? !dropDownData.rangeCheck
                                        : false
                                    : false
                            }
                        >
                            Submit
                        </button>
                        <CancelButton styleClass="btn ml-3" />
                    </div>
                </div>
                <Footer />
                <ReactToastify closeTime={5000} color="white" />
            </div>
        );
    }
}

export default NewQuote;

function GetOrderType(checkedItems, orderType) {
    let checkedList;
    let checkDesign = checkedItems.get("2");
    let requestPrototype = checkedItems.get("1");
    let requestQuotation = checkedItems.get("3");

    if (checkDesign && requestPrototype && requestQuotation) {
        checkedList = [
            "Check Design",
            "Request Prototype",
            "Request Quotation",
        ];
    } else if (checkDesign && requestPrototype) {
        checkedList = ["Check Design", "Request Prototype"];
    } else if (checkDesign && requestQuotation) {
        checkedList = ["Check Design", "Request Quotation"];
    } else if (requestPrototype && requestQuotation) {
        checkedList = ["Request Prototype", "Request Quotation"];
    } else if (checkDesign) {
        checkedList = ["Check Design"];
    } else if (requestPrototype) {
        checkedList = ["Request Prototype"];
    } else if (requestQuotation) {
        checkedList = ["Request Quotation"];
    }
    console.log(checkedList, "logerror");
    if (checkedList) {
        orderType(null, checkedList);
    } else {
        console.log("error");
        orderType("At least one option must be selected", null);
    }
}
