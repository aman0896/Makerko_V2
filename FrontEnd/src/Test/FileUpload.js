import axios from "axios";
import React, { useState } from "react";
import { mainHost } from "../commonApi/Link";

function FileUpload() {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();

    const onChangeFileUpload = (e) => {
        setFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
    };

    const onFileUpload = () => {
        console.log(file, "file");
        const formData = new FormData();
        formData.append("file", file);

        axios
            .post(mainHost + "file", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log(response.data);
            });
    };

    return (
        <div className="d-flex flex-column">
            <input type="file" onChange={onChangeFileUpload} />
            <img
                style={{
                    height: "50%",
                    width: "50%",
                    margin: "20px 0px",
                    alignSelf: "center",
                }}
                src={preview}
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
