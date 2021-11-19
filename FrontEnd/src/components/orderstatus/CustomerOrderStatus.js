import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router";
import { GetUserInfo } from "../common/restApi";
import NotFoundErr from "../global/404Error";
import Sidetab from "../main/sidetab";
import TabBar from "./TabBar";
import "./Table.css";

function CustomerOrderStatus(props) {
  const [design, setDesign] = useState(true);
  const [savedItems, setSavedItems] = useState();
  const { id } = useParams();
  const [orderData, setOrderData] = useState();
  const [incorrectUser, setIncorrectUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanyName, setselectedCompanyName] = useState();

  useEffect(() => {
    axios.post(`${window.host}/${id}/order-status`).then((response) => {
      if (response) {
        console.log(response);
        if (response.data.wrongUser != undefined) {
          setIncorrectUser(response.data.wrongUser);
          setIsLoading(false);
          return;
        }
        console.log(response.data, "response");
        if (response.data) {
          setIncorrectUser(false);
          setIsLoading(false);
          const data = response.data;
          console.log(data, "check");
          setOrderData(data);
        }
      }
    });
  }, []);

  const GetOrderType = (orderType) => {
    let stringData = JSON.stringify(orderType);
    let data;
    if (stringData) {
      data = stringData.replace(/[\[\\\]"]+/g, "");
    }

    return data;
  };
  const getManufacturerName = async (mid) => {
    GetUserInfo(mid, (err, data) => {
      console.log(data[0].Company_Name, "arr");
      setselectedCompanyName(data[0].Company_Name);
    });
  };

  return (
    <Fragment>
      {isLoading ? (
        <div></div>
      ) : incorrectUser ? (
        <NotFoundErr />
      ) : (
        <div className="">
          <div
            //className="col-lg"
            style={{
              paddingBottom: "80px",
            }}
          >
            <div
              className="m-0 p-0"
              style={{
                width: "90%",
              }}
            >
              {/* <div className="table-heading">
                <span className="m-auto">Order Status</span>
              </div> */}

              <div
                //className="ml-2"
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
                    style={{
                      backgroundColor: "#E5E5E5",
                    }}
                  >
                    <tr>
                      <th scope="col">Order Id</th>
                      <th scope="col">Order Type</th>
                      <th scope="col">Model Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      {/* <th scope="col">Amount</th> */}
                      <th scope="col">Manufacturer Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData
                      ? orderData.map((data, index) => {
                          getManufacturerName(data.Manufacturer_ID);
                          var style =
                            parseInt(index) % 2 == 0 ? "white" : "#e5e5e5";
                          return (
                            <tr
                              style={{
                                backgroundColor: style,
                              }}
                              key={data.Order_ID}
                            >
                              <th scope="row">{data.Order_ID}</th>

                              <td>{design && GetOrderType(data.Order_Type)}</td>
                              <td>{data.Model_Name}</td>
                              <td>{data.Date}</td>
                              <td>
                                <span
                                  className={
                                    data.Status == "Pending"
                                      ? "badge badge-warning"
                                      : data.Status == "Completed"
                                      ? "badge badge-success"
                                      : data.Status == "Building"
                                      ? "badge badge-secondary"
                                      : data.Status == "Delivered"
                                      ? "badge badge-danger"
                                      : ""
                                  }
                                >
                                  {data.Status}
                                </span>
                              </td>
                              {/* <td>{""}</td> */}
                              <td>{selectedCompanyName}</td>
                            </tr>
                          );
                        })
                      : "no data"}
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

export default CustomerOrderStatus;
