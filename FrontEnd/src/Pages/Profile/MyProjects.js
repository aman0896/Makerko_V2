import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileDownload } from "../../commonApi/CommonApi";
import CardViewVerticalComponent from "../../Components/card/CardViewVerticalComponent";
import { FeatureProjectList } from "../../Components/Redux/Actions/FeatureProjectList";
import WrapperComponent from "../../Components/WrapperComponent";
import { colors } from "../../Values/colors";
import { AiOutlinePlusCircle } from "react-icons/ai";

function MyProjects() {
    const dispatch = useDispatch();
    const projectList = useSelector((state) => state.projectList.projectList);
    const currentUserData = useSelector(
        (state) => state.currentUserdata.currentUserdata
    );

    const [projects, setProjects] = useState(null);

    useEffect(() => {
        FeatureProjectList(dispatch);
    }, []);

    useEffect(() => {
        if (projectList && currentUserData) {
            SetProjectsData(projectList, currentUserData);
        }
    }, [projectList, currentUserData]);

    async function SetProjectsData(projectList, currentUserData) {
        if (projectList && currentUserData) {
            const filteredProject = projectList.filter(
                (project) =>
                    project.Author_ID == currentUserData.Manufacturer_ID ||
                    project.Author_ID == currentUserData.Customer_ID
            );
            console.log(filteredProject, "projectfilterd");

            for (let i = 0; i < filteredProject.length; i++) {
                const imageData = JSON.parse(filteredProject[i].Cover_Image);
                const imageBlob = await FileDownload(imageData.filePath);
                const previewUrl = window.URL.createObjectURL(imageBlob);
                filteredProject[i].Cover_Image = previewUrl;
            }
            setProjects(filteredProject);
        }
    }

    const onProjectClick = (project) => {
        window.open(
            `/projects/${project.Project_ID}/${project.Title}`,
            "_blank"
        );
    };

    const onClickProjectAddBtn = () => {
        window.location.href = "/create-project";
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
            <WrapperComponent>
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <span
                        className="heading text-uppercase"
                        style={{ fontSize: "36px", color: "black" }}
                    >
                        MY PROJECTS
                    </span>
                    {/* <form>
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
                    </form> */}
                </div>
                <div className="row mt-4">
                    {showProjects}
                    <span className="col-xl-6 col-lg-6 col-md-12 p-3 pb-4">
                        <div
                            className="row m-auto rounded"
                            style={{
                                maxHeight: "300px",
                                height: "300px",
                                backgroundColor: colors.gray,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onClick={onClickProjectAddBtn}
                        >
                            <AiOutlinePlusCircle
                                size="10rem"
                                color={colors.light}
                            />
                        </div>
                    </span>
                </div>
            </WrapperComponent>
        </>
    );
}

export default MyProjects;
