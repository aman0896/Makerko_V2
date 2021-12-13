import React from "react";
import ProductionCapabilities from "../config/ProductionCapabilities.json";

const Lists = () => {
  return (
    <>
      <div className="container p-0">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <span
            className="heading"
            style={{ fontSize: "36px", color: "black" }}
          >
            PROJECTS
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
          {ProductionCapabilities.map((data) => (
            <div className="col-xl-6 col-lg-6 col-md-12 p-3 pb-4">
              <div className="row m-auto">
                <img
                  className="col-lg-5 col-md-12  col-sm-12 col-12 p-0"
                  src={data.image}
                  style={{
                    width: "225px",
                    height: "302px",
                    objectFit: "cover",
                  }}
                  alt="project_image"
                />

                <div
                  className="col-lg-7 pr-5 pt-3 rounded-right"
                  style={{ backgroundColor: "#0000FF" }}
                >
                  <span
                    className="text-left text-white sub-heading"
                    style={{ fontSize: "18px"}}
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

export default Lists;
