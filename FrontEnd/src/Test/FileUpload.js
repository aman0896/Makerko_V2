import axios from "axios";
import React, { useState, useEffect } from "react";
import { mainHost } from "../commonApi/Link";

function FileUpload() {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const fileDir = "./public/uploads/customer/profile1638530203322.jpg";
    const [imageSrc, setImageSrc] = useState();

    useEffect(() => {
        async function DownloadFile() {
            const file = await FileDownload(fileDir, null);
            console.log(file, "filedownload");
            const url = window.URL.createObjectURL(new Blob([file]));
            setImageSrc(url);
        }

        DownloadFile();
    }, []);

    const onChangeFileUpload = (e) => {
        setFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
    };

    const onFileUpload = () => {
        console.log(file, "file");
        const formData = new FormData();
        formData.append("profile", file);

        axios
            .post(mainHost + "profile/customer", formData, {
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
                onChange={onChangeFileUpload}
            />

            <img
                style={{
                    height: "50%",
                    width: "50%",
                    margin: "20px 0px",
                    alignSelf: "center",
                }}
                src={preview ? preview : imageSrc}
                alt="image"
            />
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
