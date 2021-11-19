import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropDown from '../global/DropDown';
import { TextBox } from '../global/TextBox';
import { CheckRange } from '../global/GlobalFunction';

function FabricationProcessSelect({ title, parentCallback }) {
    const thickness = [
        {
            value: 1,
            label: '5 mm',
        },
        {
            value: 2,
            label: '10 mm',
        },
        {
            value: 3,
            label: '15 mm',
        },
    ];

    const quantity = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
    ];

    const [selectedFabrication, setfabricationlabel] = useState();
    const [selectedMaterial, setSelectedMaterial] = useState();
    const [fabricationService, setFabricationService] = useState();
    const [materials, setMaterials] = useState();
    const [selectedThickness, setSelectedThickness] = useState();
    const [selectedQuantity, setSelectedQuantity] = useState();
    const [hublist, setHubList] = useState();
    const [showThickness, setShowThickness] = useState(false);
    const [minRange, setMinRange] = useState();
    const [maxRange, setMaxRange] = useState();
    const [rangeCheck, setRangeCheck] = useState(false);

    const onFabricationServiceChange = (obj) => {
        setfabricationlabel(obj);
        console.log(obj);

        if (obj != null) {
            const fabricationServiceID = obj.Service_ID;
            AddThicknessRange(
                fabricationServiceID,
                setShowThickness,
                setMinRange,
                setMaxRange
            );
            axios
                .post(`${window.host}/materials`, {
                    fabricationID: obj.Service_ID,
                })
                .then((response) => {
                    if (response.data) {
                        setSelectedMaterial(response.data[0]);
                        setMaterials(response.data);
                    }
                });
        } else {
            setSelectedMaterial(null);
            setMaterials();
        }

        if (obj != null) {
            console.log(obj);
            axios
                .post(`${window.host}/hublist`, {
                    fabricationService: obj.Name,
                })
                .then((response) => {
                    if (response.data.length > 0) {
                        setHubList(response.data);
                    } else {
                        setHubList([]);
                    }
                });
        }
    };

    const onMaterialChange = (obj) => {
        setSelectedMaterial(obj);
    };

    const onthicknessChange = (e) => {
        setSelectedThickness(e.target.value);
        const range = CheckRange(e.target.value, minRange, maxRange);
        setRangeCheck(range);
    };

    const onQuantityChange = (e) => {
        setSelectedQuantity(e.target.value);
    };

    useEffect(() => {
        parentCallback({
            selectedFabrication,
            selectedMaterial,
            selectedThickness,
            selectedQuantity,
            hublist,
            rangeCheck,
            showThickness,
        });
    }, [
        selectedFabrication,
        selectedMaterial,
        selectedQuantity,
        selectedThickness,
        hublist,
        rangeCheck,
        showThickness,
    ]);

    useEffect(() => {
        axios.post(`${window.host}/fabricationservice`).then((response) => {
            if (response.data) {
                setFabricationService(response.data);
            }
        });
    }, []);

    return (
        <div className=" mt-1 text-nowrap pl-5">
            <div className="col-md">
                <h5 className="title">
                    {title}
                    <span style={{ color: 'red' }}>*</span>
                </h5>
            </div>
            <div className="row mt-3 ml-auto">
                <div className="col-lg mb-1">
                    <div
                        className="mb-2 labeltext"
                        style={{ fontsize: '16px' }}
                    >
                        Method
                    </div>
                    <DropDown
                        placeholder="Select Method"
                        selectedValue={selectedFabrication}
                        ID="fabricationService"
                        options={fabricationService}
                        onChange={onFabricationServiceChange}
                        getOptionLabel={(options) => options.Name}
                        getOptionValue={(options) => options.Service_ID}
                    />
                </div>
                <div className="col-lg mb-1">
                    <div
                        className="mb-2 labeltext"
                        style={{ fontsize: '16px' }}
                    >
                        Material
                    </div>

                    <DropDown
                        placeholder="Select Material"
                        selectedValue={selectedMaterial}
                        ID="materials"
                        options={materials}
                        onChange={onMaterialChange}
                        getOptionLabel={(options) => options.Material_Name}
                        getOptionValue={(options) => options.Material_ID}
                    />
                </div>
                {/* <div className="col-lg mb-1">
                    <div
                        className="mb-2 labeltext"
                        style={{ fontsize: '16px' }}
                    >
                        Thickness
                    </div>

                    <DropDown
                        placeholder="Select Thickness"
                        selectedValue={selectedThickness}
                        ID="thickness"
                        options={thickness}
                        onChange={onthicknessChange}
                    />
                </div>
                <div className="col-md">
                    <div className="labeltext mb-3">
                        <br />
                    </div>

                    <span
                        className="d-flex justify-content-center"
                        style={{ fontsize: '10px' }}
                    >
                        (20mm-30mm)
                    </span>
                </div> */}

                {showThickness && (
                    <div className="col-md-4 mb-1">
                        <div
                            className="mb-2 labeltext"
                            style={{ fontsize: '16px' }}
                        >
                            Thickness
                        </div>
                        <div className="row d-flex align-items-center m-0 p-0 ">
                            <div className="col-lg-8 m-0 p-0">
                                <TextBox
                                    type="number"
                                    name="thickness"
                                    style={{
                                        borderColor:
                                            rangeCheck || !selectedThickness
                                                ? 'lightGray'
                                                : 'red',
                                        height: '50px',
                                    }}
                                    placeholder="Select Thickness"
                                    value={selectedThickness}
                                    //ID="thickness"
                                    //options={thickness}
                                    onChange={onthicknessChange}
                                />
                            </div>
                            <div className="col-lg pl-3 d-flex justify-content-center">
                                ({minRange}-{maxRange}mm)
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-lg mb-1">
                    <div
                        className="mb-2 labeltext"
                        style={{ fontsize: '16px' }}
                    >
                        Quantity
                    </div>

                    <TextBox
                        name="quantity"
                        placeholder="Enter Quantity..."
                        value={selectedQuantity}
                        //ID="quantity"
                        //options={quantity}
                        onChange={onQuantityChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default FabricationProcessSelect;

function AddThicknessRange(
    fabricationServiceID,
    setShowThickness,
    setMinRange,
    setMaxRange
) {
    setShowThickness(true);
    if (fabricationServiceID === 2) {
        setMinRange(0);
        setMaxRange(20);
    } else if (fabricationServiceID === 3) {
        setMinRange(2);
        setMaxRange(30);
    } else if (fabricationServiceID === 5) {
        setMinRange(1);
        setMaxRange(30);
    } else if (fabricationServiceID === 6) {
        setMinRange(0.2);
        setMaxRange(2);
    } else if (fabricationServiceID === 12) {
        setMinRange(0.5);
        setMaxRange(3);
    } else {
        setShowThickness(false);
    }
}
