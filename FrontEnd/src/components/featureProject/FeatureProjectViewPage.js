import React from "react";
import "./feature.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import Button from "../global/Button";
import { FileDownload } from "../global/GlobalFunction";
import Footer from "../main/footer";
import { File_Server } from "../common/Link";
import Carousel from "../global/Carousel";

function FeatureProjectView(props) {
    const [data, setdata] = useState([]);
    const [filelist, setfilelist] = useState([]);
    const [Image, setImage] = useState();
    const [coverImage, setCoverImage] = useState();
    const [title, setTitle] = useState();
    const [pdfFilePath, setpdfFilePath] = useState();
    const [slides, setSlides] = useState([]);

    var dateObj;
    var dateString;

    useEffect(() => {
        const { id } = props.match.params;
        console.log(id);
        axios.post(`${window.host}/project/${id}`).then((response) => {
            if (response.data) {
                console.log(response.data);
                const project = response.data;
                const title = capitalize(project[0].Title);
                console.log(title, "totle");
                setTitle(title);
                setdata(project[0]);
                console.log(
                    project[0].Files,
                    "aaa",
                    JSON.parse(project[0].Files)
                );
                var files = JSON.parse(project[0].Files);
                setfilelist(files);
                setSlides(files);
                var FileImage = JSON.parse(project[0].Image);
                console.log(FileImage, title, files, "files");
                setImage(FileImage);
                var CoverImage = JSON.parse(project[0].Cover_Image);

                setCoverImage(CoverImage);
                if (project[0].PDF_Document) {
                    const { fileName, filePath } = JSON.parse(
                        project[0].PDF_Document
                    );
                    setpdfFilePath(`${filePath}`);
                }
            }
        });
    }, []);

    const styles = {
        borderWidth: "5px",
        borderRadius: "5px",
        // objectFit: "cover",
        width: "100%",
        height: "350px",
    };
    const capitalize = (title) => {
        const str = title;

        //split the above string into an array of strings whenever a blank space is encountered

        const arr = str.split(" ");

        //loop through each element of the array and capitalize the first letter.

        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        //Join all the elements of the array back into a string using a blankspace as a separator
        const str2 = arr.join(" ");
        console.log(str2);
        return str2;
    };

    return (
        <div>
            <div className="pt-3 mt-1  mb-4">
                {coverImage && (
                    <div
                        className="pb-3 mb-4 coverPhoto"
                        style={{
                            backgroundImage: `url(${File_Server}${coverImage.filePath})`,
                            width: "100%",
                            // height: 450,
                            //paddingTop: "35%",
                            //backgroundPosition: "center",
                            backgroundSize: "100%",
                            //objectFit: "cover",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        {/* <img
              src={Image.filePath}
              alt=""
              style={{
                // backgroundImage: `url(${Image.filePath})`,
                width: "100%",
                // Without height undefined it won't work
                height: "30%",
                // figure out your image aspect ratio
                // backgroundPosition: "center",
                // backgroundSize: "100%",

                // backgroundRepeat: "no-repeat",
                //aspectRatio: "25%",
              }}
            /> */}
                    </div>
                )}
            </div>
            <div
                className="container"
                style={{ paddingLeft: "60px", paddingRight: "60px" }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                >
                    <span
                        className="text-dark pl-2 pt-3 mt-1"
                        style={{
                            fontWeight: "800",
                            fontSize: "40px",
                            textOverflow: "-moz-initial",
                        }}
                    >
                        {title}
                    </span>
                    <div
                        className="text-dark pl-3 pt-3 mt-1"
                        style={{ fontWeight: "700", fontSize: "20px" }}
                    >
                        Summary
                    </div>
                    <p
                        className="pl-3 pr-3 pb-3 pt-3"
                        style={{
                            fontSize: 16,
                            textAlign: "justify",
                        }}
                    >
                        {ReactHtmlParser(data.Summary)}
                    </p>
                </div>
            </div>
            <div className="container-fluid" style={{ width: "95%" }}></div>
            <div
                className="p-5 d-flex justify-content-center flex-column"
                style={{ backgroundColor: "#5044fd" }}
            >
                <div
                    style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: "28px",
                    }}
                >
                    Gallery
                </div>
                <div>
                    <div>{slides && <Carousel slides={slides} />}</div>
                </div>
            </div>
            <div className="container">
                <div className="row pt-5 mt-5  h-100 w-100">
                    <div className="col-sm">
                        {Image && (
                            <img
                                src={`${File_Server}${Image.filePath}`}
                                className="mainPhoto"
                                style={{
                                    //   height: "450px",
                                    //   width: "600px",
                                    border: "5px",
                                    borderRadius: "5px",
                                    //objectFit: "cover",
                                }}
                                alt=""
                            />
                        )}
                    </div>
                    <div className="col-sm  " style={{ marginBottom: "150px" }}>
                        <div className="d-flex justify-content-center  flex-column pl-3  h-100 w-100">
                            <div
                                className="mt-3"
                                style={{
                                    color: "#5044fd",
                                    fontWeight: "700",
                                    fontSize: "18px",
                                }}
                            >
                                Manufacturing Process:
                            </div>
                            <div>
                                {data.Fabrication_Process}
                                <div
                                    className="mt-5"
                                    style={{
                                        color: "#5044fd",
                                        fontWeight: "700",
                                        fontSize: "18px",
                                    }}
                                >
                                    Material:
                                </div>
                                {data.Material}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="pr-3 mt-4"
                    style={{
                        fontWeight: 700,
                        fontSize: "24px",
                    }}
                >
                    Details
                </div>
                <p
                    className=" pr-3 pb-3 pt-3"
                    style={{
                        fontSize: 16,
                        textAlign: "justify",
                    }}
                >
                    {ReactHtmlParser(data.Description)}
                </p>
            </div>
            {pdfFilePath && (
                <div
                    className="d-flex justify-content-center align-item-center"
                    style={{
                        backgroundColor: "black",
                        marginTop: "50px",
                        paddingTop: "50px",
                        paddingBottom: "50px",
                    }}
                >
                    <span
                        style={{
                            color: "white",
                            fontWeight: "700",
                            fontSize: "24px",
                        }}
                    >
                        Download the PDF here
                    </span>
                    {console.log(pdfFilePath, "filepath")}
                    <button
                        className="btn ml-5"
                        style={{ color: "#5044FD", backgroundColor: "white" }}
                        onClick={() =>
                            FileDownload(pdfFilePath, `${title}.pdf`)
                        }
                    >
                        <i className="fa fa-download mr-2"></i> Download PDF
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default FeatureProjectView;
