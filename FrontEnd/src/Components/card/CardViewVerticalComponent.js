import React from "react";
import ProductionCapabilities from "../../config/ProductionCapabilities.json";
import { colors } from "../../Values/colors";

const CardViewVerticalComponent = ({ header, data, handleClick, imageFit }) => {
    return (
        <>
            <div className="mainComponent">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <span
                        className="heading text-uppercase"
                        style={{ fontSize: "36px", color: "black" }}
                    >
                        {header}
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
                <div className="row justify-content-around mt-4">
                    {data.map((data) => (
                        <div className="col-xl-6 col-lg-6 col-md-12 p-3 pb-4">
                            <div
                                className="row m-auto rounded overflow-hidden"
                                style={{ backgroundColor: colors.dark }}
                                onClick={handleClick}
                            >
                                <img
                                    className="col-lg-5 col-md-12 col-sm-12 col-12"
                                    src={data.image}
                                    style={{
                                        width: "225px",
                                        height: "302px",
                                        objectFit: imageFit
                                            ? imageFit
                                            : "cover",
                                        padding: imageFit ? 20 : 0,
                                    }}
                                    alt="project_image"
                                />

                                <div
                                    className="col-lg-7 pr-5 pt-3"
                                    style={{ backgroundColor: "#0000FF" }}
                                >
                                    <span
                                        className="text-left text-white sub-heading text-uppercase"
                                        style={{ fontSize: "18px" }}
                                    >
                                        {data.name}
                                    </span>
                                    <p className="text-left text-white mt-2">
                                        {data.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CardViewVerticalComponent;
