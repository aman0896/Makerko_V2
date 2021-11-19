import React, { useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileDownload } from "../global/GlobalFunction";

const OrderSpecView = ({ orderData, index }) => {
  const [show, showModal] = useState(false);

  let iconStyles = { marginRight: "0.5rem" };

  //Destructing order_details
  const {
    Model_Name,
    Fabrication_Service,
    Material,
    Thickness,
    Quantity,
    Amount,
    Model_Path,
  } = orderData;

  const closeButtonStyle = { fontSize: "2rem", marginRight: "1rem" };

  return (
    <>
      <div>
        <span
          //type="button"
          // className="btn btn-primary m-1"
          style={{
            fontSize: "12px",
            cursor: "pointer",
            color: "#000Aff",
            marginLeft: 3,
          }}
          data-toggle="modal"
          data-target={`#OrderSpecModal${index}`}
        >
          <FontAwesomeIcon icon={faEye} style={{ marginRight: 2 }} />
          View
        </span>
      </div>

      <div
        className="modal fade"
        id={`OrderSpecModal${index}`}
        tabIndex="-1"
        aria-labelledby="showViewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered  d-flex justify-content-center">
          <div className="d-flex justify-content-center">
            <div className="modal-content" style={{ fontSize: "14px" }}>
              <div className="modal-header m-0 p-0">
                <h5
                  className="modal-title"
                  id="showViewModalLabel"
                  style={{
                    fontWeight: "bold",
                    marginLeft: "1rem",
                    padding: 0,
                    alignSelf: "center",
                  }}
                >
                  Order Specification
                </h5>
                <span
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                  aria-hidden="true"
                  style={closeButtonStyle}
                >
                  &times;
                </span>
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead
                    className=""
                    style={{
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    <tr>
                      <th scope="col">Model Name</th>
                      <th scope="col" style={{ whiteSpace: "nowrap" }}>
                        Fabrication Process
                      </th>
                      <th scope="col">Material</th>
                      <th scope="col">Thickness</th>
                      <th scope="col">Quantity</th>
                      {/* <th scope="col">Amount</th> */}
                      <th scope="col">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: "21%" }} className="align-middle">
                        {Model_Name}
                      </td>
                      <td style={{ width: "21%" }} className="align-middle">
                        {Fabrication_Service}
                      </td>
                      <td style={{ width: "21%" }} className="align-middle">
                        {Material}
                      </td>
                      <td style={{ width: "7%" }} className="align-middle">
                        {Thickness}
                      </td>
                      <td style={{ width: "3%" }} className="align-middle">
                        {Quantity}
                      </td>
                      {/* <td className="align-middle" style={{ width: "7%" }}>
                        {Amount}
                      </td> */}
                      <td style={{ width: "7%" }} className="align-middle">
                        <button
                          type="button"
                          className="btn"
                          style={{
                            fontSize: "12px",
                            backgroundColor: "#5044fd",
                            color: "white",
                          }}
                          onClick={() => FileDownload(Model_Path, Model_Name)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSpecView;
