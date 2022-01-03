import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../../commonApi/CommonApi";
import { customerOrderList, customerRequestDesign } from "../../commonApi/Link";
import { SET_SIDEBAR } from "../../Components/Redux/Actions/Types";
import TableComponent from "../../Components/table/TableComponent";
import WrapperComponent from "../../Components/WrapperComponent";

function DesignRequest() {
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );
    const [orderList, setOrderList] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: SET_SIDEBAR, isSidebar: true });
    }, []);

    useEffect(() => {
        if (currentUserData) {
            getData(
                customerRequestDesign,
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

export default DesignRequest;

const column = [
    {
        field: "Request_ID",
        header: "Order Id",
        style: { width: "10%", textAlign: "center" },
    },
    {
        field: "Product_Image",
        header: "Product Image",
        style: { width: "20%", textAlign: "center" },
    },
    {
        field: "Product_Sketch",
        header: "Product Sketch",
        style: { width: "15%", textAlign: "center" },
    },
    {
        field: "Product_Description",
        header: "Description",
    },
];
