import React, { useState, useEffect } from "react";
import axios from "axios";

import OrderSpecView from "./OrderSpecView";
import OrderStatusEdit from "./OrderStatusEdit";
import "./Table.css";
import { useParams } from "react-router";
import Sidetab from "../main/sidetab";
import { Fragment } from "react";
import NotFoundErr from "../global/404Error";
import Button from "../global/Button";
import CustomerDetails from "./CustomerDetails";

function ManufacturerOrderStatus(props) {
    const [data, setData] = useState();
    const [orderData, setOrderData] = useState();
    const { id } = useParams();
    const [innerWidth, setInnerWidth] = useState();
    const [incorrectUser, setIncorrectUser] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.post(`${window.host}/${id}/order-status`).then((response) => {
            if (response) {
                setIsLoading(false);
                if (
                    response.data.wrongUser &&
                    response.data.wrongUser != undefined
                ) {
                    setIncorrectUser(response.data.wrongUser);
                    return;
                }
                if (response.data) {
                    const data = response.data;
                    setIncorrectUser(false);
                    console.log(data, "..");
                    if (data.orderList) {
                        const reqQuotationData = data.orderList.filter((item) =>
                            JSON.parse(item.Order_Type).includes(
                                "Request Quotation"
                            )
                        );

                        if (data.wrongUser == undefined)
                            setOrderData(reqQuotationData);
                    }
                }
            }
        });
        // const json = localStorage.getItem("items");
        // setSavedItems(JSON.parse(json));
        // const savedItems = JSON.parse(json);
    }, [id]);
    //#region adding listner for window resize
    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });
    //#endregion

    const GetOrderType = (orderType) => {
        var stringData = JSON.stringify(orderType);
        var data = stringData.replace(/[\[\\\]"]+/g, "");
        return data;
    };

    return (
        <Fragment>
            {isLoading ? (
                <div></div>
            ) : incorrectUser ? (
                <NotFoundErr />
            ) : (
                <div className="row container-fluid m-auto">
                    <div className="col-lg-2">
                        <Sidetab />
                    </div>
                    <div
                        className="col-lg px-0 d-flex justify-content-start align-items-start flex-column"
                        style={{
                            paddingBottom: "80px",
                            paddingTop: "80px",
                        }}
                    >
                        {console.log(innerWidth)}
                        <div
                            className="m-0 p-0"
                            style={{
                                width: "90%",
                            }}
                        >
                            <div className="table-heading">
                                <span className="m-auto">Order status</span>
                            </div>

                            <div
                                className="ml-2"
                                style={{
                                    overflowX: "auto",
                                }}
                            >
                                <table
                                    className="table"
                                    style={{
                                        fontSize: "12px",
                                        width: "100%",
                                    }}
                                >
                                    <thead
                                        style={{ backgroundColor: "#A0A0A0" }}
                                    >
                                        <tr>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Order Type</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderData
                                            ? orderData.map((item, index) => {
                                                  //Destructing
                                                  var {
                                                      Customer_ID,
                                                      Order_ID,
                                                      Order_Type,
                                                      Date,
                                                      Status,
                                                      Delivery_Address,
                                                  } = item;
                                                  statusOption.map((option) => {
                                                      if (
                                                          option.label == Status
                                                      ) {
                                                          Status = option;
                                                      }
                                                  });

                                                  var style =
                                                      parseInt(index) % 2 == 0
                                                          ? "white"
                                                          : "#e5e5e5";
                                                  return (
                                                      <tr
                                                          style={{
                                                              backgroundColor:
                                                                  style,
                                                          }}
                                                          key={index}
                                                      >
                                                          <th scope="row">
                                                              {Order_ID}
                                                          </th>
                                                          <td>
                                                              <CustomerDetails
                                                                  index={index}
                                                                  customerID={
                                                                      Customer_ID
                                                                  }
                                                              />
                                                          </td>
                                                          <td>
                                                              {/* {GetOrderType(
                                                                  Order_Type
                                                              )} */}{" "}
                                                              Quotation Request
                                                          </td>
                                                          <td>{Date}</td>
                                                          <td>
                                                              <span
                                                                  className={
                                                                      Status.label ==
                                                                      "Pending"
                                                                          ? "badge badge-warning"
                                                                          : Status.label ==
                                                                            "Completed"
                                                                          ? "badge badge-success"
                                                                          : Status.label ==
                                                                            "Building"
                                                                          ? "badge badge-secondary"
                                                                          : Status.label ==
                                                                            "Delivered"
                                                                          ? "badge badge-danger"
                                                                          : ""
                                                                  }
                                                              >
                                                                  {Status.label}
                                                              </span>
                                                          </td>

                                                          <td className="d-flex">
                                                              <OrderStatusEdit
                                                                  data={
                                                                      orderData
                                                                  }
                                                                  Status={
                                                                      Status
                                                                  }
                                                                  index={index}
                                                                  orderID={
                                                                      Order_ID
                                                                  }
                                                                  statusOption={
                                                                      statusOption
                                                                  }
                                                                  setJsonData={(
                                                                      jsonData
                                                                  ) =>
                                                                      setOrderData(
                                                                          jsonData
                                                                      )
                                                                  }
                                                              />
                                                              <OrderSpecView
                                                                  orderData={
                                                                      item
                                                                  }
                                                                  index={index}
                                                              />
                                                          </td>
                                                      </tr>
                                                  );
                                              })
                                            : "no order"}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default ManufacturerOrderStatus;

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
