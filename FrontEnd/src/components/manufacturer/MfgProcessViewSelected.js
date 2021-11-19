import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
    faChevronCircleUp,
    faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import '../orderstatus/Table.css';
import './MakerTable.css';

var list = null;
export default function MfgProcessViewSelected({
    viewsData,
    updateviewsData,
    deleteicon = true,
    profileEdit,
    showProfile,
}) {
    const col = 'col-lg d-flex justify-content-center p-2 truncate';
    if (viewsData !== null) {
        list = viewsData.map((item, index) => {
            return (
                <div key={index}>
                    <ServiceList
                        item={item}
                        updateviewsData={updateviewsData}
                        viewsData={viewsData}
                        deleteicon={deleteicon}
                        profileEdit={profileEdit}
                        showProfile={showProfile}
                    />
                </div>
            );
        });
    }
    return <div>{list}</div>;
}

const ServiceList = ({
    item,
    updateviewsData,
    viewsData,
    deleteicon,
    profileEdit,
    showProfile,
}) => {
    const [expandToggle, setExpandToggle] = useState(false);
    const onExpandToggleClick = () => {
        setExpandToggle(!expandToggle);
    };
    return (
        <div className="m-1">
            <div
                className="d-flex justify-content-between align-items-center pl-3 pr-3 "
                style={{
                    backgroundColor: '#A0A0A0',
                    height: '40px',
                    borderRadius: '3px',
                    position: 'relative',
                    color: 'black',
                    width: '100%',
                }}
            >
                {
                    <div style={{ marginLeft: 2, fontWeight: 'bold' }}>
                        {`${item.selectedFabrication.Name}`}
                    </div>
                }
                {deleteicon && (
                    <div style={{ marginRight: 3 }}>
                        <FontAwesomeIcon
                            style={{ transition: 'all 0.5s ease' }}
                            icon={
                                expandToggle
                                    ? faChevronCircleUp
                                    : faChevronCircleDown
                            }
                            onClick={() => onExpandToggleClick()}
                        />
                    </div>
                )}
            </div>
            {expandToggle && (
                <div>
                    <MaterialDetailView
                        materialDetails={item.materialDetails}
                        updateviewsData={updateviewsData}
                        viewsData={viewsData}
                        deleteicon={deleteicon}
                        profileEdit={profileEdit}
                        showProfile={showProfile}
                    />
                </div>
            )}
            {!deleteicon && (
                <div>
                    <MaterialDetailView
                        materialDetails={item.materialDetails}
                        updateviewsData={updateviewsData}
                        viewsData={viewsData}
                        deleteicon={deleteicon}
                        profileEdit={profileEdit}
                        showProfile={showProfile}
                    />
                </div>
            )}
        </div>
    );
};

const MaterialDetailView = ({
    materialDetails,
    updateviewsData,
    viewsData,
    deleteicon,
    profileEdit,
    showProfile,
}) => {
    const onDeleteClick = (materialDetail) => {
        const tempData = viewsData.map((data) => {
            const filteredData = data.materialDetails.filter((mdata) => {
                if (mdata !== materialDetail) {
                    return mdata;
                }
            });
            data.materialDetails = filteredData;
            return data;
        });
        const newTempData = tempData.filter((data) => {
            if (data.materialDetails.length > 0) {
                return data;
            }
        });
        updateviewsData(newTempData);
    };
    const materialDetailList = materialDetails.map((materialDetail, index) => {
        return (
            <tr key={index} style={{ fontSize: '14px' }} className="border-td">
                {showProfile ? (
                    <td className="align-middle">
                        {materialDetail.selectedMaterial.Material_Name}
                    </td>
                ) : (
                    <td className="align-middle">
                        {materialDetail.selectedMaterial.Material_Name}
                    </td>
                )}
                {materialDetail.thickness === '-' ? (
                    <td className="align-middle">{materialDetail.thickness}</td>
                ) : (
                    <td className="align-middle">
                        {materialDetail.thickness}mm
                    </td>
                )}
                <td className="align-middle">
                    {materialDetail.costUnit.label}
                </td>{' '}
                <td className="align-middle">{materialDetail.unitRate}</td>{' '}
                <td className="align-middle">{materialDetail.leadTime} days</td>
                {deleteicon && (
                    <td className="align-middle">
                        <span
                            className="text-danger"
                            style={{ cursor: 'pointer' }}
                            onClick={() => onDeleteClick(materialDetail)}
                        >
                            <FontAwesomeIcon
                                style={{ marginRight: 2 }}
                                icon={faTrashAlt}
                                size="sm"
                            />
                            Delete
                        </span>
                    </td>
                )}
            </tr>
        );
    });
    return (
        <div className="table-overflow">
            <table
                className="table table-sm table-striped"
            >
                <thead className="thead" style={{ backgroundColor: '#C4C4C4' }}>
                    <tr>
                        <th
                            scope="col"
                            style={{ width: '220px', paddingLeft: '20px' }}
                        >
                            Materials
                        </th>
                        <th
                            scope="col"
                            style={{ width: '150px', paddingLeft: '20px' }}
                        >
                            Thickness
                        </th>
                        <th
                            scope="col"
                            style={{ width: '150px', paddingLeft: '20px' }}
                        >
                            Cost Unit
                        </th>
                        <th
                            scope="col"
                            style={{ width: '150px', paddingLeft: '20px' }}
                        >
                            Unit Rate
                        </th>
                        <th
                            scope="col"
                            style={{ width: '150px', paddingLeft: '20px' }}
                        >
                            Lead Time
                        </th>
                        {deleteicon && (
                            <th
                                scope="col"
                                style={{ width: '150px', paddingLeft: '20px' }}
                            >
                                Action
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>{materialDetailList}</tbody>
            </table>
        </div>
    );
};
