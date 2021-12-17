import React from "react";
import "./TableComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export default function TableComponent({ column, data, onDeleteClick }) {
  return (
    <div className="table-responsive">
      <table className="table p-0 m-0">
        <thead
          // class="thead-dark"
          style={{
            backgroundColor: "#C4C4C4",
            borderRight: "1px solid #E5E5E5",
          }}
        >
          <tr>
            {column.map((item, index) => (
              <th scope="col" className="px-5" key={index}>
                {item.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            
            <tr
              key={index}
              style={{
                backgroundColor: "#FFFFFF",
              }}
            >
              {column.map((item, index) => (
                <>
                  <td
                    key={index}
                    className="px-5"
                    style={{
                      borderRight:
                        column.length !== index + 1
                          ? "1px solid #E5E5E5"
                          : null,
                    }}
                  >
                    {item.field === "action" ? (
                      <span
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => onDeleteClick(row)}
                      >
                        <FontAwesomeIcon
                          style={{ marginRight: 2 }}
                          icon={faTrashAlt}
                          size="sm"
                        />
                        Delete
                      </span>
                    ) : item.subField ? (
                      row[item.field][item.subField]
                    ) : (
                      row[item.field]
                    )}
                  </td>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
