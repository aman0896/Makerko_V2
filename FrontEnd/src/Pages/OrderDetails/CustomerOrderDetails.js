import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../../commonApi/CommonApi";
import { customerOrderList } from "../../commonApi/Link";
import { SET_SIDEBAR } from "../../Components/Redux/Actions/Types";
import TableComponent from "../../Components/table/TableComponent";
import WrapperComponent from "../../Components/WrapperComponent";

function CustomerOrderDetails() {
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );
    const [orderList, setOrderList] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUserData) {
            getData(
                customerOrderList,
                currentUserData.Customer_ID,
                (onSuccess) => {
                    if (onSuccess.data) {
                        const orderList = onSuccess.data.result;
                        console.log(orderList, "orderList");

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
        }
    }, [currentUserData]);

    useEffect(() => {
        dispatch({ type: SET_SIDEBAR, isSidebar: true });
    }, []);

    return (
        <WrapperComponent>
            <div className="border">
                {orderList && (
                    <TableComponent column={column} data={orderList} />
                )}
            </div>
        </WrapperComponent>
    );
}

export default CustomerOrderDetails;

const column = [
    {
        field: "Order_ID",
        header: "Order Id",
        style: { width: "10%", textAlign: "center" },
    },
    {
        field: "Order_Type",
        header: "Order Type",
        style: { width: "20%", textAlign: "center" },
    },
    {
        field: "Model_Name",
        header: "ModelName",
        style: { width: "15%", textAlign: "center" },
    },
    {
        field: "Date",
        header: "Date",
        style: { width: "15%", textAlign: "center" },
    },
    {
        field: "Status",
        header: "Status",
        style: { width: "10%", textAlign: "center" },
        className: "badge",
    },
    {
        field: "Manufacturer_ID",
        header: "Manufacturer",
        style: { width: "25%", textAlign: "center" },
        type: "link",
        link: "",
    },
];
