import React from "react";
import Blogs from "../../config/Blogs.json";
import "./Blog.css";

const style = { maxWidth: "400px", maxHeight: "400px" };
const Blog = () => {
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
        <p className="pt-3 text_align">
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
      <div style={{ background: "#C4C4C4", marginTop: "150px" }}>
        <div className="contain--80">
          <div className="p-4 d-flex justify-content-center align-items-center">
            <img src={Blogs[1].img1} style={style} alt="" />
            <img
              src={Blogs[1].img2}
              style={{ maxWidth: "458px", maxHeight: "458px" }}
              alt=""
            />
            <img src={Blogs[1].img3} style={style} alt="" />
          </div>
        </div>
      </div>
      {Blogs[2].map((data, index) => (
        <div className="contain--80 row">
          <div
            className={
              index % 2 === 0
                ? "col-lg-6"
                : "col-lg-6 order-1 d-flex justify-content-end"
            }
          >
            <img
              style={{ width: "80%", height: "100%" }}
              src={data.image}
              alt=""
            />
          </div>
          <div className="col-lg-6">
            <span
              className="sub-heading"
              style={{ fontSize: "24px"}}
            >
              Sub-title
            </span>
            <p className="text_align pt-3">{data.descriptionOne}</p>
            <p className="text_align">{data.descriptionTwo}</p>
          </div>
        </div>
      ))}
      <div style={{background:"#000000"}}>
        
      </div>
    </div>
  );
};

export default Blog;
