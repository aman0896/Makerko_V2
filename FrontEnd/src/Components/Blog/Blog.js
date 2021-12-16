import React from "react";
import Blogs from "../../config/Blogs.json";
import { useWindowDimensions } from "../../functions/Functions";
import Button from "../Button";
import "./Blog.css";

const fontWeignt = { fontWeight: "lighter" };
const imgWidth = { maxWidth: "400px", maxHeight: "400px" };
const Blog = () => {
  const { width, height } = useWindowDimensions();
  return (
    <div>
      <img
        src={Blogs[0].cover}
        style={{ width: "100%", height: "370px", objectFit: "cover" }}
        alt=""
      />
      <div className="contain--80">
        <span
          className="heading"
          style={{ fontSize: "36px", color: "#000000" }}
        >
          Blog Title
        </span>
        <p className="pt-3 text_align sub-heading" style={fontWeignt}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, hic
          dignissimos, deserunt asperiores neque laboriosam alias quibusdam
          ipsam provident, officiis excepturi cumque omnis delectus libero
          ratione autem sequi quae perferendis cum! Ratione sed eum sint debitis
          delectus, tempore minima quasi eligendi veritatis corporis cumque
          facere nihil provident distinctio ea optio numquam rerum ab odio.
          Numquam, in eligendi dolorum rem natus totam eos possimus. Quas
          doloribus ducimus deserunt architecto beatae impedit, nulla
          exercitationem neque, sit totam voluptatum nam illo perspiciatis
          similique nisi. Dolor rem distinctio voluptatem nemo eos magnam ipsa
          reiciendis impedit error officiis eaque, voluptate facilis sunt nam et
          maiores.
        </p>
      </div>
      {/* <div style={{ background: "#C4C4C4", marginTop: "150px" }}>
        <div className="contain--80">
          <div className="p-4 d-flex justify-content-center align-items-center">
            <img src={Blogs[1].img1} style={imgWidth} alt="" />
            <img
              src={Blogs[1].img2}
              style={{ maxWidth: "458px", maxHeight: "458px" }}
              alt=""
            />
            <img src={Blogs[1].img3} style={imgWidth} alt="" />
          </div>
        </div>
      </div> */}
      {Blogs[2].map((data, index) => (
        <div className="contain--80 row">
          <div
            className={
              index % 2 === 0
                ? "col-xl-6 col-lg-6 col-md-6"
                : "col-xl-6 col-lg-6 col-md-6 position_img d-flex justify-content-end"
            }
          >
            <img
              style={{
                width: width < 768 ? "100%" : "80%",
                height: "100%",
              }}
              src={data.image}
              alt=""
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <span className="heading" style={{ fontSize: "24px" }}>
              Sub-title
            </span>
            <p className="text_align pt-3 sub-heading" style={fontWeignt}>
              {data.descriptionOne}
            </p>
            <p className="text_align sub-heading" style={fontWeignt}>
              {data.descriptionTwo}
            </p>
          </div>
        </div>
      ))}
      <div
        className="mb-5 sub-heading d-flex justify-content-around align-items-center"
        style={{ background: "#000000", height: "170px" }}
      >
        <div style={{ fontSize: "24px", color: "white" }}>
          Download the pdf here
        </div>
        <div className="d-flex align-items-center h-100">
          <Button
            buttonStyle="button--white--solid"
            buttonSize="button--large--nomargin"
            style={{
              fontSize: "18px",
              padding: "6px 19px",
            }}
          >
            Download
          </Button>
        </div>
      </div>
      <div className="contain--80 mt-3 d-flex flex--colm">
        <img style={{ width: "256px" }} src={Blogs[1].dp} alt="" />
        <div className="d-flex flex-column justify-content-between pad-mar">
          <span className="heading mt-3" style={{ fontSize: "36px" }}>
            Maker Name
          </span>
          <div className="pb-5">
            <span className="download_text_size sub-heading ">Location</span>
            <br />
            <span className="sub-heading download_text_size">Phone number</span>
          </div>

          <div>
            <Button
              buttonStyle="button--primary--solid"
              buttonSize="button--large--nomargin"
              style={{
                fontSize: "18px",
                padding: "6px 19px",
              }}
            >
              Check their profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
