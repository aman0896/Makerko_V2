import axios from "axios";
import React, { useState, useEffect } from "react";
import { mainHost } from "../commonApi/Link";

function FileUpload() {
  const [file, setFile] = useState([]);
  const [fileLength, setFileLength] = useState();
  const [preview, setPreview] = useState([]);
  //const fileDir = "./public/uploads/customer/profile1638860634269.png";
  const fileDir = [
    { filepath: "./public/uploads/multipleUpload/profile1639111948697.png" },
    { filepath: "./public/uploads/multipleUpload/profile1638936508598.jpg" },
    { filepath: "./public/uploads/multipleUpload/profile1638936508599.png" },
  ];
  const [imageSrc, setImageSrc] = useState([]);

  useEffect(() => {
    async function DownloadFile() {
      let files = [];
      for (let i = 0; i < fileDir.length; i++) {
        const file = await FileDownload(fileDir[i].filepath, null);
        console.log(file, "files");
        const url = window.URL.createObjectURL(new Blob([file]));
        files.push(url);
      }
      setImageSrc(files);
    }

    DownloadFile();
  }, []);

  const onChangeFileUpload = (e) => {
    const files = e.target.files;
    setFile(files);
    let filePreview = [];
    let file = [];
    for (let i = 0; i < files.length; i++) {
      filePreview.push(URL.createObjectURL(files[i]));
      //file.push(files[i]);
    }
    setPreview(filePreview);
  };

  const onFileUpload = () => {
    console.log(file, "file");
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("profile", file[i]);
    }

    axios
      .post(mainHost + "profile/multiple-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className="d-flex flex-column">
      <input
        id="file"
        name="myImage"
        type="file"
        multiple
        onChange={onChangeFileUpload}
      />

      <div className="row m-5">
        {imageSrc.map((src) => (
          <div className="col-3">
            <img
              style={{
                height: "50%",
                width: "50%",

                alignSelf: "center",
              }}
              src={src}
              alt="image"
            />
          </div>
        ))}
      </div>
      <button
        style={{ width: "200px", alignSelf: "center" }}
        onClick={onFileUpload}
      >
        Upload
      </button>
    </div>
  );
}

export default FileUpload;

//#region filedownolad Link Generate
export const FileDownload = async (filePath) => {
  var data = JSON.stringify({
    filedir: filePath,
  });
  console.log(data, "filepath");

  var config = {
    method: "post",
    responseType: "blob",
    url: "http://localhost:3001/profile/download",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const fileData = await axios(config)
    .then(function (response) {
      console.log(response.data, "data");
      return response.data;
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.target = "_blank";
      // link.setAttribute("download", fileName);
      // document.body.appendChild(link);
      // link.click();
    })
    .catch(function (error) {
      console.log(error);
    });

  return fileData;
};
//#endregion
