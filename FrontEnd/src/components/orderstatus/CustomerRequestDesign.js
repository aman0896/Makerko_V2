import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router";
import { GetUserInfo } from "../common/restApi";
import NotFoundErr from "../global/404Error";
import Sidetab from "../main/sidetab";
import TabBar from "./TabBar";
import "./Table.css";

function CustomerRequestDesign() {
  const [savedItems, setSavedItems] = useState();
  const { id } = useParams();
  const [orderData, setOrderData] = useState();
  const [incorrectUser, setIncorrectUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanyName, setselectedCompanyName] = useState();

  useEffect(() => {
    axios.post(`${window.host}/${id}/requestorder-status`).then((response) => {
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

  let order =
    orderData && orderData.length > 0
      ? orderData.map((data, index) => {
          if (data.Product_Image) {
            var files = JSON.parse(data.Product_Image);
            var ImageName = files.fileName;
          }
          if (data.Product_Sketch) {
            var sketch = JSON.parse(data.Product_Sketch);
            var SketchName = sketch.fileName;
          }
          var style = parseInt(index) % 2 == 0 ? "white" : "#e5e5e5";

          return (
            <tr
              style={{
                backgroundColor: style,
              }}
              key={data.Request_ID}
            >
              <th scope="row">{data.Request_ID}</th>

              <td>{ImageName}</td>
              <td>{SketchName}</td>

              <td>
                <span className="badge badge-warning">{"Pending"}</span>
              </td>
            </tr>
          );
        })
      : "no data";
  return (
    <Fragment>
      {isLoading ? (
        <div></div>
      ) : incorrectUser ? (
        <NotFoundErr />
      ) : (
        <div className="">
          <div
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

                      <th scope="col">Product_Image</th>
                      <th scope="col">Product_Sketch</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>{order}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default CustomerRequestDesign;
