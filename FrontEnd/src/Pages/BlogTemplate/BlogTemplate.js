import React from "react";
import "./blog.css";
import { useWindowDimensions } from "../../functions/Functions";
import { Table } from "react-bootstrap";

function BlogTemplate() {
  const { width, height } = useWindowDimensions();
  return (
    <div className="main">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
        className={width < 992 && "justify-content-center"}
      >
        <div className="row w-100">
          <div
            style={{ marginRight: width < 992 ? 0 : 70 }}
            className=" col-xl-5 col-lg-5 col-md-12"
          >
            <img
              alt=""
              src="./images/nails.jpg"
              style={{
                height: "100vh",
                width: "100%",
              }}
            />
          </div>
          <div
            className=" col-xl-6 col-lg-6 col-md-12"
            style={{
              marginTop: width > 992 ? 150 : 20,
            }}
          >
            <h3
              className=" heading"
              style={{
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              3D Printing
            </h3>
            <p className="mt-3">
              3D Printing: 3D Printing, also termed as an additive manufacturing
              is the process of making physical objects/products through layer
              wise addition of melted material directly from the computer aided
              3D designs.
            </p>
            <p className="mt-3">
              There is no necessity of investing in additional tools or die/mold
              in the 3D printing manufacturing process. A desired product is
              first modeled in a 3D CAD software, exported in acceptable file
              formats (usually .obj, .stl) and sent to a 3D printing slicer
              software which converts design into machine supported codes and a
              3D printer makes the product in real physical form.
            </p>
            <p className="mt-3">
              Most popular 3D printing technologies are the FDM 3D printers
              (Plastic/rubber filament as raw material), SLA/DLP 3D printers
              (liquid resins as raw material and laser/light source for binding
              layers) and SLS 3D Printer technologies (polymer or metal power as
              raw material and laser source).
            </p>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-wrap align-items-center text-white text-center justify-content-center"
        style={{ backgroundColor: "black", height: 150 }}
      >
        <span className="advice" style={{ fontSize: 20 }}>
          Advice from maker while making this product
        </span>
      </div>
      {/* content1 */}
      <div
        className=" my-5"
        style={{
          display: "flex",
          alignItems: "center",
          width: "90%",
          margin: "0 5%",
        }}
      >
        <div className="row m-0">
          <div
            className="col-xl-5 col-lg-5 col-md-12 "
            style={{ marginRight: width < 768 ? 25 : 70 }}
          >
            <img
              alt=""
              src="./images/worker.jpg"
              style={{
                height: "100%",
                // width: "10%",
                borderRadius: "25px",
                width: width < 768 ? "80%" : "100%",
              }}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 ">
            <h3 className="font-weight-bold mt-4 heading">Sub-title</h3>
            <p
              className="mt-2 "
              style={{
                textAlign: "justify",
                fontFamily: "Syne",
                letterSpacing: "0.1px",
                width: width < 768 ? "100%" : "100%",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              feugiat metus, consequat vestibulum. Ultrices cum elementum
              tincidunt condimentum mattis pellentesque diam non in. Ornare
              lorem vehicula placerat et ac, nec. Id non vulputate tellus, sit.
              Eu ut adipiscing eget viverra lacus sem risus in. Eget ut volutpat
              eget gravida semper ipsum eros. Vestibulum aliquet neque magna
              adipiscing ipsum vitae. Amet amet, diam fringilla ac nibh aenean
              nec est. Porta amet, lobortis tortor dignissim consequat et.
              Adipiscing fermentum odio convallis aenean sagittis. Ut nisi
              posuere aliquam habitant sit quam. Nunc mattis sed tristique vitae
              diam curabitur lacinia enim proin. Ullamcorper gravida tortor
              montes, tristique. Lorem lobortis purus nunc, arcu cursus. Amet
              vehicula massa eget at cursus. Feugiat eget sagittis eu vel odio
              est. Velit massa vitae a sed imperdiet duis rhoncus vulputate. Sed
              auctor pulvinar aliquam et, sed tempor vitae. Volutpat blandit
              montes, commodo vestibulum. Sapien neque nunc, tincidunt sit
              imperdiet. Eget malesuada mauris fringilla mi. Vitae sit sagittis
              gravida dui enim ipsum. Diam habitant.
            </p>
          </div>
        </div>
      </div>
      {/* starting block1 */}
      <div
        className="mb-5"
        style={{ backgroundColor: "black", height: "550px" }}
      >
        <div className="" style={{ width: "75%", margin: "0 10%" }}>
          <div className="row" style={{ marginTop: "10px" }}>
            <div className="col pt-5 pb-5 " style={{ marginTop: "50px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt=""
                  src="./images/house.jpg"
                  style={{
                    height: 300,
                    //width: 250,
                    width: width < 768 ? "30%" : "25%",
                  }}
                />
                <img
                  alt=""
                  src="./images/boxes.jpg"
                  style={{ height: 350, width: width < 768 ? "40%" : "30%" }}
                />
                <img
                  alt=""
                  src="./images/road.jpg"
                  style={{ height: 300, width: width < 768 ? "30%" : "25%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* content2 */}

      <div
        className=" my-5"
        style={{
          display: "flex",
          alignItems: "center",
          width: "90%",
          margin: "0 5%",
        }}
      >
        <div className="row content">
          <div
            class="col-xl-6 col-lg-6 col-md-12 "
            style={{ marginRight: width < 768 ? 25 : 70 }}
          >
            <h3 className="font-weight-bold mt-4 heading">Sub-title</h3>
            <p
              className="mt-2"
              style={{
                textAlign: "justify",
                fontFamily: "Syne",
                letterSpacing: "0.1px",
                width: width < 768 ? "100%" : "100%",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              feugiat metus, consequat vestibulum. Ultrices cum elementum
              tincidunt condimentum mattis pellentesque diam non in. Ornare
              lorem vehicula placerat et ac, nec. Id non vulputate tellus, sit.
              Eu ut adipiscing eget viverra lacus sem risus in. Eget ut volutpat
              eget gravida semper ipsum eros. Vestibulum aliquet neque magna
              adipiscing ipsum vitae. Amet amet, diam fringilla ac nibh aenean
              nec est. Porta amet, lobortis tortor dignissim consequat et.
              Adipiscing fermentum odio convallis aenean sagittis. Ut nisi
              posuere aliquam habitant sit quam. Nunc mattis sed tristique vitae
              diam curabitur lacinia enim proin. Ullamcorper gravida tortor
              montes, tristique. Lorem lobortis purus nunc, arcu cursus. Amet
              vehicula massa eget at cursus. Feugiat eget sagittis eu vel odio
              est. Velit massa vitae a sed imperdiet duis rhoncus vulputate. Sed
              auctor pulvinar aliquam et, sed tempor vitae. Volutpat blandit
              montes, commodo vestibulum. Sapien neque nunc, tincidunt sit
              imperdiet. Eget malesuada mauris fringilla mi. Vitae sit sagittis
              gravida dui enim ipsum. Diam habitant.
            </p>
          </div>
          <div class="col-xl-5 col-lg-5 col-md-12">
            <img
              alt=""
              className="worker2 d-flex justify-content-end"
              src="./images/worker.jpg"
              style={{
                height: "100%",
                // width: "10%",
                borderRadius: "25px",
                width: width < 768 ? "80%" : "100%",
              }}
            />
          </div>
        </div>
      </div>

      {/* starting block2 */}
      <div className="block">
        <div className="mx-5">
          <div className="row align-items-center justify-content-center lastBlock">
            <div
              className="col-lg-12 col-md-12 pt-5 pb-4 title"
              style={{ color: "white", fontSize: 28, fontWeight: "bold" }}
            >
              About the Technology
            </div>
            <div className="col-lg-12 col-md-12">
              <Table className="text-center bg-white" responsive striped>
                <thead className="text-white" style={{ background: "#000000" }}>
                  <tr>
                    <th>3D Printing Technology</th>
                    <th>Materials</th>
                    <th>Applications</th>
                    <th>Pros</th>
                    <th>Cons</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td>FDM</td>
                    <td>FABS, PLA, TPU rubber, PET, PETG, Nylon, PCDM</td>
                    <td>
                      Engineering and industrial prototypes, presentation
                      models, architectural models
                    </td>
                    <td>Low cost technology; Easy operation; Strong parts</td>
                    <td>Rough surface finish; Slow printing speed;</td>
                  </tr>
                  <tr>
                    <td>SLA/DLP</td>
                    <td>Standard Resin, castable/wax resin, dental resin</td>
                    <td>Jewellery, art and craft, dental and medical sector</td>
                    <td>
                      High Details in printing; Smooth surface finish; Medical
                      grade printing
                    </td>
                    <td>
                      Material limitations; Post-processing required after
                      prints
                    </td>
                  </tr>
                  <tr>
                    <td>SLS</td>
                    <td>Nylon, Flexible rubber</td>
                    <td>
                      Complex parts like automotive parts, prosthetic, etc
                    </td>
                    <td>
                      Supportless printing; High chemical and heat resistant
                    </td>
                    <td>Expensive technology; High operational cost</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogTemplate;
