import React from "react";
import { Data } from "./Data";
import { useState } from "react";
import { FileDownload } from "../../commonApi/CommonApi";
import Axios from "axios";
const New = () => {
  const [photo, setPhoto] = useState();
  const [preview, setPreview] = useState();
  const [view, setview] = useState([]);
  const [file, setfile] = useState(null);
  const [show, setShow] = useState(false);
  const [data, setdata] = useState({
    order: "",
    validation: "",
    suggestion: "",
    review: "",
    email: "",
  });
  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setdata({ ...data, [name]: value });
  };

  const display = () => {
    console.log("data", data);
    let formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", file);

    Axios.post("http://localhost:3001/invalidaction", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      console.log("success");
    });
  };

  const handleFile = (e) => {
    console.log(e.target.files, "file");
    console.log(e.target.files[0].name, "target");

    let name = e.target.name;
    var file = e.target.files[0];
    setfile(file);

    console.log(file, "file");

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState == 2) {
        setPreview(reader.result);
      }
    };
  };

  const getdata = async () => {
    const data = await Axios.get("http://localhost:3001/showdata").then(
      (response) => {
        return response.data;
      }
    );
    console.log("data", data);

    setShow(!show);
    for (var i = 0; i < data.length; i++) {
      if (data[i].Reference) {
        const image = JSON.parse(data[i].Reference);
        let filepath = image.filepath;
        console.log(filepath, "file");
        if (filepath.includes("uploadfile")) {
          const imageBlob = await FileDownload(image.filepath);
          const ImageUrl = window.URL.createObjectURL(new Blob([imageBlob]));
          data[i].Reference = ImageUrl;
        }
      }
    }
    console.log("view", data);
    setview(data);
  };
  return (
    <>
      <div className="container-fluid">
        <span
          className="font-weight-bold mb-0 h1 ps-4"
          style={{ color: "#0000FF" }}
        >
          Invalid Action
        </span>
      </div>

      <div className="container">
        <div className="d-flex w-75 flex-column" style={{ margin: 70 }}>
          <div className="row">
            {Data.map((val, index) => (
              <>
                <div
                  className="col-3 mb-5 mt-2 d-flex fw-bold"
                  style={{ fontWeight: "bolder" }}
                >
                  {val.title}
                </div>
                <div className="col-7">
                  {index === 2 ? (
                    <div className="pb-4 ">
                      <textarea
                        name="suggestion"
                        value={data.suggestion}
                        className="form-control pb-5"
                        rows="12"
                        style={{ height: 300, border: "1px solid grey" }}
                        placeholder="Type invalid reasons and actions for correction"
                        onChange={handleInput}
                      ></textarea>
                    </div>
                  ) : index === 3 ? (
                    <div className="d-flex" style={{ position: "relative" }}>
                      <input
                        type="file"
                        id="file"
                        multiple
                        onChange={handleFile}
                        style={{ display: "none" }}
                      />
                      <label
                        for="file"
                        className="d-flex align-items-center"
                        style={{
                          height: 12,
                          width: "35rem",
                          padding: "1.5rem",
                          border: "1px solid grey",
                          borderRadius: "0.5rem",
                        }}
                      >
                        <span>
                          {file ? (
                            <img
                              src={preview}
                              style={{
                                height: 40,
                                width: 70,
                                margin: 70,
                              }}
                            />
                          ) : (
                            " Upload files : pdf,jpeg,dwg"
                          )}
                        </span>
                        <span
                          style={{
                            position: "absolute",
                            right: 10,
                            top: 6,
                            color: "white",
                            backgroundColor: "#0000FF",
                            height: 35,
                            padding: 6,
                            borderRadius: "0.3rem",
                            cursor: "pointer",
                          }}
                        >
                          Upload
                        </span>
                      </label>
                    </div>
                  ) : index === 5 ? (
                    <>
                      <input
                        name="email"
                        value={data.email}
                        type="email"
                        style={{ height: 50, border: "1px solid grey" }}
                        className="form-control"
                        onChange={handleInput}
                      />

                      <div className="d-flex  mt-4 justify-content-end ">
                        <div className="p-2">
                          <button
                            type="button"
                            className="btn "
                            style={{
                              color: "#0000FF",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                        <div class="p-2 ">
                          <button
                            type="button"
                            className="btn "
                            style={{
                              backgroundColor: "#0000FF",
                              color: "white",
                            }}
                            onClick={display}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  ) : index === 0 ? (
                    <input
                      name="order"
                      value={data.order}
                      type="number"
                      style={{ height: 50, border: "1px solid grey" }}
                      className="form-control"
                      onChange={handleInput}
                    />
                  ) : index === 1 ? (
                    <input
                      type="text"
                      name="validation"
                      value={data.validation}
                      className="form-control"
                      style={{ height: 50, border: "1px solid grey" }}
                      onChange={handleInput}
                    />
                  ) : (
                    <input
                      type="text"
                      name="review"
                      value={data.review}
                      className="form-control"
                      style={{ height: 50, border: "1px solid grey" }}
                      onChange={handleInput}
                    />
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div></div>

      {/* view data */}
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={getdata}>
          Show data
        </button>
      </div>
      {/* code start */}
      {show && (
        <div className="mt-5">
          <table className="table  table-primary">
            <thead>
              <tr>
                <th scope="col">Order Id</th>
                <th scope="col">Validation</th>
                <th scope="col">Suggested Action</th>
                <th scope="col">Reference</th>
                <th scope="col">Review</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {view.map((val, key) => {
                console.log("pic", photo);
                return (
                  <tr>
                    <td>{val.OrderId}</td>
                    <td>{val.Validation}</td>
                    <td>{val.SuggestedAction}</td>

                    <td>
                      <img
                        style={{ height: 50, width: 50 }}
                        src={
                          val.Reference
                            ? val.Reference
                            : "http://localhost:3000/assests/user.png"
                        }
                      />
                    </td>
                    <td>{val.Review}</td>
                    <td>{val.Email}</td>
                  </tr>
                );
              })}
              ;
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default New;
