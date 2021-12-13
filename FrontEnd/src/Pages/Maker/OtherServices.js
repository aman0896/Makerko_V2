import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

import { faTimesCircle, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import InputComponent from "../../Components/input/InputComponent";
import Button from "../../Components/Button";
import ErrorMessage from "../../Components/formik/ErrorMessage";

export default function OtherService({ getData, oldOtherServices }) {
  const [materialTags, setMaterialTags] = useState([]);
  const [newMaterial, setNewMaterial] = useState("");
  const [newFabService, setNewFabService] = useState();
  const [fabData, setFabData] = useState();
  const rowView = "row m-0 mb-2 ";

  const [errorService, SetErrorService] = useState();
  const [errormaterial, SetErrorMaterial] = useState();

  const handleOnChange = (e) => {
    try {
      SetErrorMaterial("");
      if (e.target.value == ",") {
        e.target.value = "";
      }
    } catch {}

    setNewMaterial(e.target.value);
  };

  //#region load otherservices data at first
  useEffect(() => {
    console.log(oldOtherServices, "oldservices");
    if (oldOtherServices) {
      const services = oldOtherServices.filter((services) => services);
      setFabData(services);
      console.log(services, "services");
      getData(services);
    } else setFabData([]);
  }, [oldOtherServices]);
  //#endregion

  const handleKeyDown = (e) => {
    SetErrorMaterial("");
    if ((e.keyCode === 13 || e.keyCode === 188) && e.target.value !== "") {
      let newMaterialTag = newMaterial.trim();
      if (materialTags.indexOf(newMaterialTag) === -1) {
        materialTags.push(newMaterialTag);
        setNewMaterial("");
      }
      e.target.value = "";
    }
  };

  const onRemoveMaterialTag = (tag) => {
    let i = materialTags.indexOf(tag);
    let tempMaterialTag = materialTags.filter((mTag) => mTag);
    tempMaterialTag.splice(i, 1);
    setMaterialTags(tempMaterialTag);
    setNewMaterial("");
  };

  const onhandleFabricationChange = (e) => {
    SetErrorService("");
    setNewFabService(e.target.value);
    console.log("hi", e.target.value);
  };

  const onClickAddBtn = () => {
    if (!newFabService || materialTags.length <= 0) {
      if (!newFabService) SetErrorService("Required Fabrication Services");
      if (materialTags.length <= 0)
        SetErrorMaterial("Required Fabrication Services");
    } else {
      console.log(newFabService, materialTags);
      let data = { serviceName: newFabService, materials: materialTags };
      console.log(fabData, "checkfdata");
      const index = fabData.findIndex(
        (item) => item.serviceName == data.serviceName
      );
      if (index == -1) {
        fabData.push(data);
      }
      console.log("hello", fabData);
      setMaterialTags([]);
      getData(fabData);
      setNewFabService("");
    }
  };

  return (
    <div className="pt-5">
      {console.log(fabData)}
      <div className={rowView}>
        <div className="col-lg  m-0 p-0 font-weight-bold">
          <div className="heading title m-0 p-0">Other Services:</div>
        </div>
        <div className="col-lg d-flex justify-content-end">
          <Button onClick={onClickAddBtn}>Add New</Button>
        </div>
      </div>
      <ViewFabData
        fabData={fabData}
        setFabData={setFabData}
        getData={getData}
      />
      <div className={rowView}>
        <div className="col-lg-2  m-0 p-0  font-weight-bold">
          Fabrication Services
          <span className="col-sm-1  p-0">:</span>
        </div>

        <div className="col-lg-4">
          <InputComponent
            name="fabricationService"
            onChangeText={onhandleFabricationChange}
            value={newFabService}
            //error={errorService}
          />
          <ErrorMessage error={errorService} visible={errorService} />
        </div>
      </div>
      <div className={rowView}>
        <div className="col-lg-2  pr-0 m-0 p-0  font-weight-bold">
          Materials
          <span className="col-sm-1 ml-1 p-0">:</span>
        </div>
        <div className="col-lg-4">
          <div className="tags-input">
            {materialTags.map((tag, index) => {
              return (
                <span key={index} className="tag mb-2">
                  {tag}
                  <FontAwesomeIcon
                    className="ml-1"
                    icon={faTimesCircle}
                    onClick={() => onRemoveMaterialTag(tag, index)}
                  />
                </span>
              );
            })}
            <input
              type="text"
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              placeholder="Press Enter or Comma to add new Material"
              className="form-control"
              style={{ height: "40px", borderRadius: "5px" }}
            />
          </div>
          <ErrorMessage error={errormaterial} visible={errormaterial} />
        </div>
      </div>
    </div>
  );
}

export const ViewFabData = ({ fabData, setFabData, getData }) => {
  const onRemoveService = (item) => {
    const tempFabData = fabData.filter((item) => item);
    const index = tempFabData.indexOf(item);
    tempFabData.splice(index, 1);
    setFabData(tempFabData);
    getData(tempFabData);
    console.log("new", tempFabData);
  };
  var dataList;
  if (fabData) {
    dataList = fabData.map((item, index) => {
      return (
        <div className="row m-1" key={index}>
          <div>
            <div className="font-weight-bold m-1 text-primary">
              {item.serviceName}
              <span>
                <FontAwesomeIcon
                  className="ml-1 text-danger"
                  style={{ cursor: "pointer" }}
                  icon={faTrashAlt}
                  size="sm"
                  onClick={() => onRemoveService(item)}
                />
              </span>
            </div>
            <div className="ml-3">
              <ul className="row m-auto" style={{ listStyle: "inside" }}>
                {item.materials.map((material, index) => {
                  return (
                    <div key={index}>
                      <li className="mr-3">{material}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    });
  }
  return <div className="ml-2 mb-3">{dataList}</div>;
};

export const OtherServices = [
  {
    serviceName: "Fiber Glass Resin Casting",
    materials: ["Silicone Mold", "Resin ", "Fiber Glass"],
  },
  {
    serviceName: "Injection Molding",
    materials: [
      "Polypropylene (PP)",
      "HDPE ",
      "LDPE",
      "PVC",
      "Rubber/flexible",
      "ABS",
      "Nylon",
      "Polycarbonate (PC)",
      "Acryllic",
      "PET",
    ],
  },
  {
    serviceName: "Investment Casting (Lost Wax)",
    materials: ["Copper", "Brass ", "Silver", "Gold", "Wax", "Special Alloys"],
  },
];
