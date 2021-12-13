import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
    const [hubs, setHubs] = useState(null);

    useEffect(() => {
        setHubs(hub);
    }, []);

    const handleClick = (event) => {
        let clickedHub = event.target.value;
        history.push({
            pathname: "/makers/details",
            state: { clickedHub },
        });
    };

    return (
        <>
            {hubs && (
                <CardViewVerticalComponent
                    header="makers hub"
                    data={hubs}
                    handleClick={handleClick}
                    imageFit="contain"
                />
            )}
        </>
    );
}

export default MakersHub;
