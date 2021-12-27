import React, { useEffect, useState } from "react";
import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { getData } from "../../commonApi/CommonApi";
import { makerOrderList } from "../../commonApi/Link";
import TableComponent2 from "../../Components/table/TableComponent2";
import { colors } from "../../Values/colors";

function MakerOrderDetails() {
    const params = useParams();
    const { id } = params;
    const [orderList, setOrderList] = useState();
    console.log(id, "id");

    const handleEdit = () => {
        console.log("edit clicked");
    };

    const handleView = () => {
        console.log("view clicked");
    };

    const orderData = [];

    // const orderData =
    //     orderList &&
    //     orderList.map((data) => {
    //         return (
    //             <div className="mb-5">
    //                 {/* <div className="border tableMainHeader">
    //                     <h2 className="mx-5">{method.Name}</h2>
    //                 </div> */}
    //                 <TableComponent2 column={column} data={data} />
    //             </div>
    //         );
    //     });

    useEffect(() => {
        getData(
            makerOrderList,
            id,
            (onSuccess) => {
                if (onSuccess.data) {
                    console.log("checkckckc");
                    console.log(onSuccess.data, "onsuccess");
                    setOrderList(orderList);
                }
            },
            (onFail) => {
                console.log(onFail, "fail");
            }
        );
    }, [id]);

    return (
        <div>
            {orderList && (
                <TableComponent2
                    column={column}
                    data={orderList}
                    actionData={actions}
                    action={true}
                    handleEdit={handleEdit}
                    handleView={handleView}
                />
            )}
        </div>
    );
}

export default MakerOrderDetails;

const statusOption = [
    {
        value: 1,
        label: "Pending",
    },
    {
        value: 2,
        label: "Building",
    },
    {
        value: 3,
        label: "Completed",
    },
    {
        value: 4,
        label: "Delivered",
    },
];

const column = [
    {
        field: "Order_Id",
        header: "Order Id",
    },
    {
        field: "Customer_ID",
        header: "Customer",
    },
    {
        field: "Order_Type",
        header: "Order Type",
    },
    {
        field: "Date",
        header: "Date",
    },
    {
        field: "Status",
        subfield: "label",
        header: "Status",
    },
    {
        field: "Delivery_Address",
        header: "Delivery Address",
    },
    {
        field: "action",
        header: "Action",
    },
];

const actions = [
    {
        icon: (
            <FontAwesomeIcon
                style={{ marginRight: 2, colors: colors.primary }}
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
        type: "edit",
    },
    {
        icon: (
            <FontAwesomeIcon
                style={{ marginRight: 2, colors: colors.danger }}
                icon={faTrashAlt}
                size="sm"
            />
        ),
        type: "delete",
    },
];
