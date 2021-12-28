import React, { useEffect, useState } from "react";
import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { getData, postData } from "../../commonApi/CommonApi";
import { makerOrderList, updateOrderStatus } from "../../commonApi/Link";
import TableComponent2 from "../../Components/table/TableComponent2";
import TableComponent from "../../Components/table/TableComponent";
import { colors } from "../../Values/colors";
import WrapperComponent from "../../Components/WrapperComponent";
import SimpleModal from "../../Components/modal/SimpleModal";
import Select from "react-select";
import { Toast } from "../../Components/ReactToastify";

function MakerOrderDetails() {
    const params = useParams();
    const [showModal, setShowModal] = useState(false);
    const { id } = params;
    const [orderList, setOrderList] = useState();
    const [statusValue, setStatusValue] = useState();
    const [rowIndex, setRowIndex] = useState();
    const [edit, setEdit] = useState(false);
    const [view, setView] = useState(false);
    console.log(id, "id");

    const handleEdit = (row, index) => {
        setEdit(true);
        setView(false);
        console.log(row.Status.props.children, index, "row index");
        setShowModal(true);
        setRowIndex(index);
        status.map(
            (item) =>
                item.label === row.Status.props.children && setStatusValue(item)
        );
    };

    const handleView = (obj) => {
        setEdit(false);
        setView(true);
        setShowModal(true);
    };

    useEffect(() => {
        getData(
            makerOrderList,
            id,
            (onSuccess) => {
                if (onSuccess.data) {
                    const orderList = onSuccess.data.result;

                    for (let i = 0; i < orderList.length; i++) {
                        const date = new Date(parseInt(orderList[i].Date));
                        orderList[i].Date = date.toLocaleString();
                        orderList[i].Status =
                            orderList[i].Status === "pending" ? (
                                <span className=" badge badge-warning">
                                    {orderList[i].Status}
                                </span>
                            ) : orderList[i].Status === "completed" ? (
                                <span className=" badge badge-success">
                                    {orderList[i].Status}
                                </span>
                            ) : orderList[i].Status === "building" ? (
                                <span className=" badge badge-secondary">
                                    {orderList[i].Status}
                                </span>
                            ) : (
                                <span className=" badge badge-danger">
                                    {orderList[i].Status}
                                </span>
                            );
                    }

                    setOrderList(orderList);
                }
            },
            (onFail) => {
                console.log(onFail, "fail");
            }
        );
    }, [id]);

    const handleClose = () => {
        setShowModal(false);
    };

    const onUpdateBtnClick = () => {
        console.log(statusValue, rowIndex, "value");
        //#region update staus in ui
        if (statusValue) {
            var tempData = orderList.filter((data) => data);
            tempData[rowIndex].Status = statusValue.label;
            tempData[rowIndex].Status =
                tempData[rowIndex].Status === "pending" ? (
                    <span className=" badge badge-warning">
                        {tempData[rowIndex].Status}
                    </span>
                ) : tempData[rowIndex].Status === "completed" ? (
                    <span className=" badge badge-success">
                        {tempData[rowIndex].Status}
                    </span>
                ) : tempData[rowIndex].Status === "building" ? (
                    <span className=" badge badge-secondary">
                        {tempData[rowIndex].Status}
                    </span>
                ) : (
                    <span className=" badge badge-danger">
                        {tempData[rowIndex].Status}
                    </span>
                );
            setOrderList(tempData);
            //#endregion update staus in ui

            //#region update status in db
            const data = {
                orderId: tempData[rowIndex].Order_ID,
                updatedStatus: statusValue.label,
            };

            postData(
                updateOrderStatus,
                data,
                (onSuccess) => {
                    if (onSuccess.data) {
                        const { update } = onSuccess.data;
                        if (update === "success") {
                            setShowModal(false);
                            Toast("Status Updated", "success");
                        }
                    }
                },
                (onFail) => {
                    console.log(onFail, "update-order-status");
                }
            );
            //#endregion
        }
    };

    const onStatusSelect = (e) => {
        setStatusValue(e);
    };

    const handleDownload = (row, index) => {
        console.log(row, "row");
    };

    return (
        <WrapperComponent>
            <div className="border">
                {orderList && (
                    <TableComponent2
                        column={column}
                        data={orderList}
                        actionData={actions}
                        action={true}
                        handleEdit={handleEdit}
                        setShowModal={setShowModal}
                        handleView={handleView}
                    />
                )}
            </div>
            {edit ? (
                <SimpleModal
                    show={showModal}
                    handleClose={handleClose}
                    onClickButton={onUpdateBtnClick}
                    title="Update Status"
                    buttonName="Update"
                    body={
                        <Select
                            value={statusValue}
                            options={status}
                            onChange={onStatusSelect}
                        />
                    }
                    index={rowIndex}
                />
            ) : view ? (
                <SimpleModal
                    show={showModal}
                    size="xl"
                    handleClose={handleClose}
                    onClickButton={onUpdateBtnClick}
                    title="Details"
                    // buttonName="Update"
                    body={
                        <div className="border">
                            <TableComponent2
                                column={specViewcolumn}
                                data={orderList}
                                actionData={viewActions}
                                action={true}
                                handleDownload={handleDownload}
                            />
                        </div>
                    }
                    index={rowIndex}
                />
            ) : null}
        </WrapperComponent>
    );
}

export default MakerOrderDetails;

const status = [
    {
        value: 1,
        label: "pending",
    },
    {
        value: 2,
        label: "building",
    },
    {
        value: 3,
        label: "completed",
    },
    {
        value: 4,
        label: "delivered",
    },
];

const column = [
    {
        field: "Order_ID",
        header: "Order Id",
        style: { width: "10%", textAlign: "center" },
    },
    {
        field: "Customer_ID",
        header: "Customer",
        style: { width: "10%", textAlign: "center" },
        type: "link",
        link: "",
    },
    {
        field: "Order_Type",
        header: "Order Type",
        style: { width: "40%", textAlign: "center" },
    },
    {
        field: "Date",
        header: "Date",
        style: { width: "20%", textAlign: "center" },
    },
    {
        field: "Status",
        header: "Status",
        style: { width: "10%", textAlign: "center" },
        className: "badge",
    },
    // {
    //     field: "Delivery_Address",
    //     header: "Delivery Address",
    // },
    {
        field: "action",
        header: "Action",
        style: { width: "10%", textAlign: "center" },
    },
];

const specViewcolumn = [
    {
        field: "Model_Name",
        header: "Model Name",
        style: { width: "25%", textAlign: "center" },
    },
    {
        field: "Fabrication_Service",
        header: "Fabrication Process",
        style: { width: "25%", textAlign: "center" },
    },
    {
        field: "Material",
        header: "Material",
        style: { width: "15%", textAlign: "center" },
    },
    {
        field: "Thickness",
        header: "Thickness",
        style: { width: "10%", textAlign: "center" },
    },
    {
        field: "Quantity",
        header: "Quantity",
        style: { width: "10%", textAlign: "center" },
    },
    {
        field: "action",
        header: "Action",
        style: { width: "15%", textAlign: "center" },
    },
];

const actions = [
    {
        icon: (
            <FontAwesomeIcon
                style={{ marginRight: 2, color: colors.primary }}
                icon={faEye}
                size="sm"
            />
        ),
        type: "view",
    },
    {
        icon: (
            <FontAwesomeIcon
                style={{ marginRight: 2, color: colors.success }}
                icon={faEdit}
                size="sm"
            />
        ),
    },
];

const viewActions = [
    {
        icon: (
            <FontAwesomeIcon
                style={{ marginRight: 2, color: colors.primary }}
                icon={faDownload}
                size="sm"
            />
        ),
        type: "download",
        name: "Download",
    },
];
