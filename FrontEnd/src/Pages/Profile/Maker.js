import React from "react";
import { useWindowDimensions } from "../../functions/Functions";
import { MyImages } from "../Values/Images";
import "./Profile.css";
import { useHistory } from "react-router-dom";

function Maker() {
    const history = useHistory();
    const { height, width } = useWindowDimensions();

    const styles = {
        responsiveHeight: {
            height: width > 540 ? width / 4.5 : "150px",
        },
    };

    const handleClick = (redirect) => {
        if (redirect === "hub") {
            // console.log(event.target.dataset.name);
            history.push({ pathname: "/makers/hub" });
        } else {
            history.push({ pathname: "/makers/map" });
        }
    };

    return (
        <>
            <div className="mainComponent">
                <label
                    className="heading text-uppercase"
                    style={{ fontSize: "2rem" }}
                >
                    Makers
                </label>
                <div className="image-overlay-block mt-3">
                    <div className="image-overlay">
                        <div
                            className="label-overlay"
                            style={styles.responsiveHeight}
                            data-name="hub"
                            onClick={() => handleClick("hub")}
                        >
                            <label>Makers Hub</label>
                        </div>
                        <img
                            src={MyImages.HubImage}
                            className="image-block"
                            style={styles.responsiveHeight}
                            alt=""
                        />
                    </div>
                    <div className="image-overlay">
                        <div
                            className="label-overlay"
                            style={styles.responsiveHeight}
                            data-name="map"
                            onClick={() => handleClick("map")}
                        >
                            <label>Makers map</label>
                        </div>
                        <img
                            src={MyImages.MapImage}
                            className="image-block"
                            style={styles.responsiveHeight}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Maker;
