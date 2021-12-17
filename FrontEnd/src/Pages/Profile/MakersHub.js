import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FileDownload } from "../../commonApi/CommonApi";
import CardViewVerticalComponent from "../../Components/card/CardViewVerticalComponent";

const hub = [
    {
        name: "zener technologies",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
        image: "https://www.zenertech.com/wp-content/themes/zener/img/logo.png",
    },
    {
        name: "maker name",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
        image: "https://www.freepnglogos.com/uploads/youtube-logo-hd-8.png",
    },
    {
        name: "maker name",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
        image: "https://3dinsider.com/wp-content/uploads/2021/03/How-to-Estimate-3D-Printing-Time-1280x720.png",
    },
    {
        name: "maker name",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
        image: "https://www.saf-fro.com/sites/saffro/files/styles/retina_cover_page/public/2016/09/26/plasma_cutting_automation_air_liquide_welding_2015-632_2_1.jpg?itok=Y8feKn-q",
    },
];

function MakersHub() {
    const history = useHistory();
    const [selectedHub, setSelectedHub] = useState();
    const [hubs, setHubs] = useState(null);
    const makersList = useSelector((state) => state.makersList.makersList);

    useEffect(() => {
        if (makersList) setHubs(makersList);
    }, [makersList]);

    const handleClick = (data) => {
        let clickedHub = data;
        console.log(clickedHub, "Hub");
        // history.push({
        //     pathname: "/makers/details",
        //     state: { clickedHub },
        // });
    };

    const hubList =
        hubs &&
        hubs.map((hub, index) => {
            return (
                <CardViewVerticalComponent
                    index={index}
                    name={hub.Company_Name}
                    image={hub.Logo}
                    data={hub}
                    description={hub.Brief_Description}
                    // imageFit="contain"
                    selectedCard={(selectedCard) => {
                        setSelectedHub(selectedCard);
                    }}
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
