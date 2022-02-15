import React, { useEffect, useState } from "react";
import CardViewVerticalComponent from "../../Components/card/CardViewVerticalComponent";
import { useDispatch, useSelector } from "react-redux";
import { FeatureProjectList } from "../../Components/Redux/Actions/FeatureProjectList";
import { FileDownload } from "../../commonApi/CommonApi";

function Projects() {
    const dispatch = useDispatch();
    const projectList = useSelector((state) => state.projectList.projectList);

    const [projects, setProjects] = useState(null);

    useEffect(() => {
        FeatureProjectList(dispatch);
    }, []);

    useEffect(() => {
        if (projectList) {
            SetCoverImage(projectList);
        }
    }, [projectList]);

    async function SetCoverImage(projectList) {
        if (projectList) {
            for (let i = 0; i < projectList.length; i++) {
                const imageData = JSON.parse(projectList[i].Cover_Image);
                const imageBlob = await FileDownload(imageData.filePath);
                const previewUrl = window.URL.createObjectURL(imageBlob);
                projectList[i].Cover_Image = previewUrl;
            }
        }
        setProjects(projectList);
    }

    const onProjectClick = (project) => {
        window.open(
            `/projects/${project.Project_ID}/${project.Title}`,
            "_blank"
        );
    };

    const showProjects =
        projects &&
        projects.map((project, index) => {
            return (
                <CardViewVerticalComponent
                    index={index}
                    name={project.Title}
                    image={project.Cover_Image}
                    data={project}
                    description={project.Description}
                    onPress={onProjectClick}
                />
            );
        });

    return (
        <>
            <div className="mainComponent">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <span
                        className="heading text-uppercase"
                        style={{ fontSize: "2rem" }}
                    >
                        PROJECTS
                    </span>
                    <form>
                        <div class="input-group">
                            <div class="form-outline">
                                <input
                                    type="search"
                                    placeholder="Search by Hubs, Location ,Process ,Material"
                                    class="form-control"
                                    style={{ width: "300px", fontSize: "12px" }}
                                />
                            </div>
                            <button
                                type="button"
                                class="btn btn-white"
                                style={{
                                    position: "absolute",
                                    right: "0",
                                }}
                            >
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="row justify-content-around mt-3">
                    {showProjects}
                </div>
            </div>
        </>
    );
}

export default Projects;
