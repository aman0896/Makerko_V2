import React from "react";
import "./blog.css";

import { useWindowDimensions } from "../../functions/Functions";
function BlogTemplate() {
  const { width, height } = useWindowDimensions();
  return (
    <div className="main">
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="row">
          <div className=" col-xl-6 col-lg-6 col-md-6 ">
            <img
              src="./images/nails.jpg"
              style={{
                height: "100vh",
                width: "100%",
              }}
            />
          </div>
          <div
            className=" col-xl-6 col-lg-6 col-md-6 "
            style={{
              width: 500,
              marginTop: "150px",
            }}
          >
            <h3
              className=" heading"
              style={{
                fontSize: 30,
                fontWeight: "bold",
                paddingLeft: 12,
              }}
            >
              Blog title
            </h3>
            <p
              className="mt-3"
              style={{
                textAlign: "justify",
                fontFamily: "Syne",
                letterSpacing: "0.1px",
                paddingLeft: 12,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>

      <div
        className="d-flex  flex-wrap align-items-center text-white justify-content-center "
        style={{ backgroundColor: "black", height: 150 }}
      >
        <span className="advice" style={{ fontSize: 20 }}>
          Advice from maker while making this product
        </span>
      </div>
      {/* content1 */}
      <div
        className="container my-5  "
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="row ">
          <div className="col-xl-5 col-lg-5 col-md-5  worker">
            <img
              src="./images/worker.jpg"
              style={{
                height: "100%",
                // width: "10%",
                borderRadius: "25px",
                width: width < 768 ? "80%" : "100%",
              }}
            />
          </div>
          <div
            className="col-xl-6 col-lg-6 col-md-6 "
            style={{ marginLeft: width < 768 ? 25 : 70 }}
          >
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
                  src="./images/house.jpg"
                  style={{
                    height: 300,
                    //width: 250,
                    width: width < 768 ? "30%" : "25%",
                  }}
                />
                <img
                  src="./images/boxes.jpg"
                  style={{ height: 350, width: width < 768 ? "40%" : "30%" }}
                />
                <img
                  src="./images/road.jpg"
                  style={{ height: 300, width: width < 768 ? "30%" : "25%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* content2 */}

      <div class="container ">
        <div class="row content">
          <div
            class="col-xl-6 col-lg-6 col-md-6 "
            style={{ marginLeft: width < 768 ? 25 : 0 }}
          >
            <h3 className="font-weight-bold mt-4 heading">Sub-title</h3>
            <p
              className="mt-2"
              style={{
                textAlign: "justify",
                fontFamily: "Syne",
                letterSpacing: "0.1px",
                width: 500,
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
          <div class="col-xl-6 col-lg-6 col-md-6 ">
            <img
              className="worker2"
              src="./images/worker.jpg"
              style={{
                height: "100%",
                borderRadius: "25px",
                marginLeft: 50,
                width: width < 768 ? "90%" : "100%",
              }}
            />
          </div>
        </div>
      </div>

      {/* starting block2 */}
      <div className="block">
        <div className="mx-5 ">
          <div className="row" style={{ marginTop: "80px" }}>
            <div className="col" style={{ margin: "0px 40px" }}>
              <div
                className="title pt-5 pb-3 font-weight-bold "
                style={{ color: "white", fontSize: 28, fontWeight: "bold" }}
              >
                About the Technology
              </div>

              <div
                className="tabul"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <table
                  className="table table-striped "
                  style={{ backgroundColor: "white" }}
                >
                  <thead style={{ backgroundColor: "black", color: "white" }}>
                    <tr>
                      <th scope="col"> 3D Printing technology</th>
                      <th scope="col">Materials</th>
                      <th scope="col">Applications</th>
                      <th scope="col">Pros</th>
                      <th scope="col">Cons</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label="3D Printing Technnology">FDM</td>

                      <td data-label="Materials">
                        ABS,PLA,TPU,rubber,PET,PETG,Nylon,PC
                      </td>
                      <td data-label="Applications">
                        Engineering and industrial prototypes, presentation
                        models,architectural models
                      </td>
                      <td data-label="Pros">
                        Low cost technology,Easy operation;Strong parts
                      </td>
                      <td data-label="Cons">
                        Rough surface,Slow printing speed
                      </td>
                    </tr>
                    <tr>
                      <td data-label="3D Printing Technnology">SLA/DLP</td>

                      <td data-label="Materials">
                        Standard Resin,castable/wax resin,dental resin
                      </td>
                      <td data-label="Applications">
                        Jwellery,art and craft,dental and medical sector
                      </td>
                      <td data-label="Pros">
                        High Details in printing;Smooth surface finish;Medical
                        grade printing
                      </td>
                      <td data-label="Cons">
                        Material limitations;Post-processing required after
                        prints
                      </td>
                    </tr>
                    <tr>
                      <td data-label="3D Printing Technnology">SLS</td>
                      <td data-label="Materials">Nylon,Flexible rubber</td>
                      <td data-label="Applications">
                        Complex parts like automotive parts,prosthetic,etc
                      </td>
                      <td data-label="Pros">
                        Supportless printing;High chemical and heating resistant
                      </td>
                      <td data-label="Cons">
                        Expensive technology;High operational cost
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogTemplate;
