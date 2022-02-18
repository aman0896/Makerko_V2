import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FileDownload } from "../../commonApi/CommonApi";
import { webDomain } from "../../commonApi/Link";
import CardViewVerticalComponent from "../../Components/card/CardViewVerticalComponent";

function MakersHub() {
    const [hubs, setHubs] = useState(null);
    const [methods, setMethods] = useState();

    //#region redux-hooks
    const makersList = useSelector((state) => state.makersList.makersList);
    const makersServices = useSelector(
        (state) => state.makersServices.services
    );
    const process = useSelector((state) => state.method.method);
    //#endregion

    useEffect(() => {
        if (makersList && makersServices)
            UpdateMakerList(makersList, makersServices);
    }, [makersList, makersServices]);

    const onHubClick = (hub) => {
        window.open(
            `/makers/${hub.Manufacturer_ID}/${hub.Company_Name}`,
            "_blank"
        );
    };

    useEffect(() => {
        if (process) {
            setMethods(process);
        }
    }, [process]);

    async function UpdateMakerList(makersList, makersServices) {
        if (makersList && makersServices) {
            for (let i = 0; i < makersList.length; i++) {
                try {
                    if (makersList[i].Logo) {
                        const imageData = JSON.parse(makersList[i].Logo);
                        const imageBlob = await FileDownload(
                            imageData.filePath
                        );
                        const previewUrl =
                            window.URL.createObjectURL(imageBlob);
                        makersList[i].Logo = previewUrl;
                    } else {
                        makersList[
                            i
                        ].Logo = `${webDomain}assests/makerlogo.jpg`;
                    }
                } catch {}

                const services = makersServices.filter(
                    (service) =>
                        service.Manufacturer_ID ===
                        makersList[i].Manufacturer_ID
                );

                if (services && services.length > 0) {
                    console.log(methods, services, "services");
                    for (let i = 0; i < services.length; i++) {
                        if (methods && methods.length > 0) {
                            for (let j = 0; j < methods.length; j++) {
                                if (
                                    methods[j].Service_ID ===
                                    services[i].Service_ID
                                ) {
                                    services[i].Service_Name = methods[j].Name;
                                }
                            }
                        }
                    }
                }
                makersList[i].services = services;
            }
        }
        setHubs(makersList);
    }

    const getServiceName = (services) => {
        let makerServices = "";
        if (services) {
            for (let i = 0; i < services.length; i++) {
                if (services[i].Service_Name)
                    makerServices +=
                        "Servicess: " + services[i].Service_Name + ", ";
            }
            var sn = makerServices.lastIndexOf(",");
            makerServices = makerServices.substring(0, sn);
            console.log(makerServices, "services");
            return makerServices;
        }
    };

    const getMaterials = (services) => {
        let materialList = [];
        let stringData = "";
        for (let i = 0; i < services.length; i++) {
            const materials = JSON.parse(services[i].Material_Name);
            for (let j = 0; j < materials.length; j++) {
                materialList.push(materials[j].material);
            }
        }

        for (let i = 0; i < materialList.length; i++) {
            stringData += "Materials: " + materialList[i].Material_Name + ", ";
        }

        var mn = stringData.lastIndexOf(",");
        stringData = stringData.substring(0, mn);
        return stringData;
    };

    const hubList =
        hubs &&
        hubs.map((hub, index) => {
            return (
                <CardViewVerticalComponent
                    type="hub"
                    index={index}
                    name={hub.Company_Name}
                    image={hub.Logo}
                    data={hub}
                    description={hub.Brief_Description}
                    serviceName={getServiceName(hub.services)}
                    materials={getMaterials(hub.services)}
                    onPress={onHubClick}
                />
            );
        });

    return (
        <>
            <div className="mainComponent">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <span
                        className="heading text-uppercase"
                        style={{ fontSize: "36px", color: "black" }}
                    >
                        MAKERS HUB
                    </span>
                    <form>
                        <div class="input-group">
                            <div class="form-outline">
                                <input
                                    type="search"
                                    placeholder="Search by Hubs ,Location ,Process ,Material"
                                    class="form-control"
                                    style={{ width: "300px", fontSize: "12px" }}
                                />
                            </div>
                            <button
                                type="button"
                                class="btn btn-white"
                                style={{
                                    position: "absolute",
                                    right: "0",
                                }}
                            >
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="row justify-content-around mt-4">{hubList}</div>
            </div>
        </>
    );
}

export default MakersHub;
