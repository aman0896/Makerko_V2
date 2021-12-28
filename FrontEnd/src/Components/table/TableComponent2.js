import React from "react";
import "./TableComponent.css";
import ButtonIconComponent from "../button/ButtonIconComponent";

export default function TableComponent2(props) {
    const { column, data, actionData } = props;
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
                            <th
                                scope="col"
                                style={item.style}
                                // className="px-5"
                                key={index}
                            >
                                {item.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                style={{
                                    backgroundColor: "#FFFFFF",
                                }}
                            >
                                {column.map((item, colIndex) => (
                                    <>
                                        <td
                                            key={colIndex}
                                            // className="px-5"
                                            style={{
                                                borderRight:
                                                    column.length !==
                                                    colIndex + 1
                                                        ? "1px solid #E5E5E5"
                                                        : null,
                                            }}
                                        >
                                            {item.field === "action"
                                                ? actionData &&
                                                  actionData.map((action) => {
                                                      return (
                                                          <ButtonIconComponent
                                                              onPress={() => {
                                                                  action.type ===
                                                                  "delete"
                                                                      ? props.handleDelete(
                                                                            row
                                                                        )
                                                                      : action.type ===
                                                                        "view"
                                                                      ? props.handleView(
                                                                            row
                                                                        )
                                                                      : action.type ===
                                                                        "download"
                                                                      ? props.handleDownload(
                                                                            row,
                                                                            rowIndex
                                                                        )
                                                                      : props.handleEdit(
                                                                            row,
                                                                            rowIndex
                                                                        );
                                                              }}
                                                              icon={action.icon}
                                                              name={action.name}
                                                          />
                                                      );
                                                  })
                                                : item.subField
                                                ? row[item.field][item.subField]
                                                : row[item.field]}
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
