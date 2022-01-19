import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BlogComponent from "../../Components/BlogComponent/BlogComponent";
import { FeatureProjectList } from "../../Components/Redux/Actions/FeatureProjectList";
import { deleteData, FileDownload, getData } from "../../commonApi/CommonApi";
import { currentUserLink, deleteProject } from "../../commonApi/Link";
import SimpleModal from "../../Components/modal/SimpleModal";
import { Toast } from "../../Components/ReactToastify";
import CreateProjectForm from "./CreatureProjectForm";
import ProjectEditModal from "./ProjectEditModal";

function ProjectDetailViewPage() {
    //#region Hooks define
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    //#endregion

    //#regionGetting data using react-redux
    const projectList = useSelector((state) => state.projectList.projectList);
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );
    //#endregion

    //#region states define
    const [author, setAuthor] = useState();
    const [project, setProject] = useState(null);
    const [editable, setEditable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showProjectEditModal, setProjectEditModal] = useState(false);
    //#endregion

    //#region useeffect call
    useEffect(() => {
        FeatureProjectList(dispatch);
    }, []);

    // useEffect(() => {
    //     if (projectList) {
    //     }
    // }, [projectList]);

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
            console.log(displaySelectedProject, "display project");
            //coverImage image
            const imageData = JSON.parse(displaySelectedProject.Cover_Image);
            const imageBlob = await FileDownload(imageData.filePath);
            const profileImageUrl = window.URL.createObjectURL(imageBlob);
            displaySelectedProject.Cover_Image = {
                url: profileImageUrl,
                filePath: imageData.filePath,
                fileName: imageData.filename,
            };

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
            console.log(projectContent, "content");
            setProject(displaySelectedProject);
        }
        if (projectList) {
            const displaySelectedProject = projectList.filter(
                (project) => project.Project_ID == params.id
            );
            console.log(displaySelectedProject, "project");
            SetImageData(displaySelectedProject[0]);
        }
    }, [projectList, params.id]);
    //#endregion

    useEffect(() => {
        if (currentUserData && project) {
            if (
                (Object.keys(currentUserData).includes("Customer_ID") &&
                    currentUserData.Customer_ID == project.Author_ID) ||
                (Object.keys(currentUserData).includes("Manufacturer_ID") &&
                    currentUserData.Manufacturer_ID == project.Author_ID)
            ) {
                console.log("true");
                setEditable(true);
            } else {
                setEditable(false);
            }
        }
    }, [currentUserData, project]);

    const onDeleteBtnClick = () => {
        setShowModal(true);
    };

    const onEditBtnClick = () => {
        setProjectEditModal(true);
        console.log("edit key press");
    };

    const handleProjectEditModalClose = () => {
        setProjectEditModal(false);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const projectDelete = () => {
        const projectId = params.id;
        const authorId = project.Author_ID;
        deleteData(
            deleteProject,
            { projectId, authorId },
            (onSuccess) => {
                if (onSuccess.data.delete === "success") {
                    setShowModal(false);
                    history.push({
                        pathname: "/profile/myprojects",
                        state: onSuccess.data,
                    });
                    console.log(onSuccess, "on delete project success");
                } else {
                    setShowModal(false);
                    Toast("Project Delete Fail", "error");
                }
            },
            (onFail) => {
                setShowModal(false);
                Toast("Project Delete Fail", "error");
                console.log(onFail, "on delete project fail");
            }
        );
        console.log("delete clicked", projectId);
    };

    return (
        <div>
            {project && (
                <BlogComponent
                    title={project.Title}
                    description={project.Description}
                    contents={project.Content}
                    gallary={project.Gallary}
                    coverImage={project.Cover_Image.url}
                    publishDate={project.Publish_Date}
                    productionDetails={project.Production_Details}
                    author={author ? author : ""}
                    pdfFile={project.PdfFile}
                    editable={editable}
                    onEditBtnClick={onEditBtnClick}
                    onDeleteBtnClick={onDeleteBtnClick}
                />
            )}

            <div>
                {project && (
                    <ProjectEditModal
                        show={showProjectEditModal}
                        handleClose={handleProjectEditModalClose}
                        title="Edit Project"
                        size="lg"
                        data={project}
                    />
                )}

                <SimpleModal
                    show={showModal}
                    handleClose={handleModalClose}
                    title={<span className="text-danger">Delete ? </span>}
                    body={
                        <div style={{ fontSize: "1rem" }} className="">
                            Are you sure you want to delete this project ?
                        </div>
                    }
                    buttonName="Delete"
                    buttonStyle="button--danger--solid"
                    onClickButton={projectDelete}
                />
            </div>
        </div>
    );
}

export default ProjectDetailViewPage;
