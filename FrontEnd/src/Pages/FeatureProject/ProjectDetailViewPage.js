import React, { useEffect, useState } from "react";
import { CgDisplayFlex } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogComponent from "../../Components/BlogComponent/BlogComponent";
import { FeatureProjectList } from "../../Components/Redux/Actions/FeatureProjectList";
import ReactToHtml from "react-html-parser";
import FeatureProjects from "../../config/Project.json";
import { CurrentUserdata } from "../../Components/Redux/Actions/CurrentUserdata";
import { FileDownload, getData } from "../../commonApi/CommonApi";
import { currentUserLink } from "../../commonApi/Link";

function ProjectDetailViewPage() {
    //#region Hooks define
    const params = useParams();
    const dispatch = useDispatch();
    //#endregion

    //#regionGetting data using react-redux
    // const projectList = useSelector((state) => state.projectList.projectList);
    const userData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );
    //#endregion

    //#region states define
    const [author, setAuthor] = useState();
    const [project, setProject] = useState(null);
    const [projectList, setProjectList] = useState(null);
    //#endregion

    //#region useeffect call
    useEffect(() => {
        // FeatureProjectList(dispatch);
        setProjectList(FeatureProjects);
    }, []);

    useEffect(() => {
        // FeatureProjectList(dispatch);
        if (project) {
            getData(
                currentUserLink,
                { uid: project.Author_ID },
                async (onSuccess) => {
                    let { currentUserData } = onSuccess.data;
                    if (
                        Object.keys(currentUserData[0]).includes("Customer_ID")
                    ) {
                        if (
                            currentUserData[0] &&
                            currentUserData[0].Profile_Image
                        ) {
                            const imageData = JSON.parse(
                                currentUserData[0].Profile_Image
                            );
                            const imageBlob = await FileDownload(
                                imageData.filePath
                            );
                            const profileImageUrl = window.URL.createObjectURL(
                                new Blob([imageBlob])
                            );
                            currentUserData[0].Profile_Image = profileImageUrl;
                        }
                    } else {
                        if (currentUserData[0] && currentUserData[0].Logo) {
                            const imageData = JSON.parse(
                                currentUserData[0].Logo
                            );
                            const imageBlob = await FileDownload(
                                imageData.filePath
                            );
                            const profileImageUrl = window.URL.createObjectURL(
                                new Blob([imageBlob])
                            );
                            currentUserData[0].Logo = profileImageUrl;
                        }
                    }

                    setAuthor(currentUserData[0]);
                },
                (onFail) => {
                    return console.log(onFail, "function GetCurrentUserdata");
                }
            );
        }
    }, [project]);

    useEffect(() => {
        if (projectList) {
            console.log(projectList, params.id, "id");
            const displaySelectedProject = projectList.filter(
                (project) => project.Project_ID === parseInt(params.id)
            );
            console.log(displaySelectedProject, "checkproject");

            setProject(displaySelectedProject[0]);
        }
    }, [projectList, params.id]);
    //#endregion

    return (
        <div>
            {project && (
                <BlogComponent
                    title={project.Title}
                    description={project.Description}
                    contents={project.Content}
                    gallary={project.Gallary}
                    coverImage={project.Cover_Image}
                    publishDate={project.Publish_Date}
                    productionDetails={project.Production_Details}
                    author={author ? author : ""}
                    pdfFile={project.PdfFile}
                />
            )}
        </div>
    );
}

export default ProjectDetailViewPage;
