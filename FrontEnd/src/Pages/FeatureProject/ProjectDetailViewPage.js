import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogComponent from "../../Components/BlogComponent/BlogComponent";
import { FeatureProjectList } from "../../Components/Redux/Actions/FeatureProjectList";
import { FileDownload, getData } from "../../commonApi/CommonApi";
import { currentUserLink } from "../../commonApi/Link";

function ProjectDetailViewPage() {
    //#region Hooks define
    const params = useParams();
    const dispatch = useDispatch();
    //#endregion

    //#regionGetting data using react-redux
    const projectList = useSelector((state) => state.projectList.projectList);
    //#endregion

    //#region states define
    const [author, setAuthor] = useState();
    const [project, setProject] = useState(null);
    //#endregion

    //#region useeffect call
    useEffect(() => {
        FeatureProjectList(dispatch);
    }, []);

    useEffect(() => {
        if (projectList) {
        }
    }, [projectList]);

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
        async function SetImageData(displaySelectedProject) {
            //coverImage image
            const imageData = JSON.parse(displaySelectedProject.Cover_Image);
            const imageBlob = await FileDownload(imageData.filePath);
            const profileImageUrl = window.URL.createObjectURL(imageBlob);
            displaySelectedProject.Cover_Image = profileImageUrl;

            //gallary image
            let filesUrl = [];
            const gallaryImage = JSON.parse(displaySelectedProject.Gallary);
            for (let i = 0; i < gallaryImage.length; i++) {
                const imageBlob = await FileDownload(
                    gallaryImage[i].filePath,
                    null
                );
                const gallaryImageUrl = window.URL.createObjectURL(imageBlob);
                filesUrl.push({
                    image: gallaryImageUrl,
                });
            }
            displaySelectedProject.Gallary = filesUrl;

            //set content and its images
            const projectContent = JSON.parse(displaySelectedProject.Content);
            for (let i = 0; i < projectContent.length; i++) {
                const imageBlob = await FileDownload(
                    projectContent[i].content_image.filePath,
                    null
                );
                const contentImageUrl = window.URL.createObjectURL(imageBlob);
                projectContent[i].content_image = contentImageUrl;
            }
            displaySelectedProject.Content = projectContent;

            setProject(displaySelectedProject);
        }
        if (projectList) {
            const displaySelectedProject = projectList.filter(
                (project) => project.Project_ID === parseInt(params.id)
            );
            SetImageData(displaySelectedProject[0]);
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
