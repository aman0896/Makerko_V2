import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CardViewVerticalComponent from "../../Components/card/CardViewVerticalComponent";
import { useDispatch, useSelector } from "react-redux";
import { FeatureProjectList } from "../../Components/Redux/Actions/FeatureProjectList";
import ReactToHtml from "react-html-parser";
import FeatureProjects from "../../config/Project.json";

function Projects() {
    // const dispatch = useDispatch();
    // const projectList = useSelector((state) => state.projectList.projectList);

    const [projects, setProjects] = useState(null);

    useEffect(() => {
        // FeatureProjectList(dispatch);
        console.log(FeatureProjects, "projects");
        setProjects(FeatureProjects);
    }, []);

    // useEffect(() => {
    //     if (projectList) {
    //         console.log(projectList, "projectList");
    //         setProjects(projectList);
    //     }
    // }, [projectList]);

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
                    // imageFit="contain"
                    // selectedCard={(selectedCard) => {
                    //     // setSelectedHub(selectedCard);
                    // }}
                />
            );
        });

    return (
        <>
            <div className="mainComponent">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <span
                        className="heading text-uppercase"
                        style={{ fontSize: "36px", color: "black" }}
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
                <div className="row justify-content-around mt-4">
                    {showProjects}
                </div>
            </div>
        </>
    );
}

export default Projects;

// function MakersHub() {
//     const history = useHistory();
//     const [selectedHub, setSelectedHub] = useState();
//     const [hubs, setHubs] = useState(null);
//     const makersList = useSelector((state) => state.makersList.makersList);

//     useEffect(() => {
//         if (makersList) setHubs(makersList);
//     }, [makersList]);

//     const handleClick = (data) => {
//         let clickedHub = data;
//         console.log(clickedHub, "Hub");
//         // history.push({
//         //     pathname: "/makers/details",
//         //     state: { clickedHub },
//         // });
//     };

//     const hubList =
//         hubs &&
//         hubs.map((hub, index) => {
//             return (
//                 <CardViewVerticalComponent
//                     index={index}
//                     name={hub.Company_Name}
//                     image={hub.Logo}
//                     data={hub}
//                     description={hub.Brief_Description}
//                     // imageFit="contain"
//                     selectedCard={(selectedCard) => {
//                         setSelectedHub(selectedCard);
//                     }}
//                 />
//             );
//         });

//     return (
//         <>
//             <div className="mainComponent">
//                 <div className="d-flex justify-content-between align-items-center flex-wrap">
//                     <span
//                         className="heading text-uppercase"
//                         style={{ fontSize: "36px", color: "black" }}
//                     >
//                         MAKERS HUB
//                     </span>
//                     <form>
//                         <div class="input-group">
//                             <div class="form-outline">
//                                 <input
//                                     type="search"
//                                     placeholder="Search by Hubs ,Location ,Process ,Material"
//                                     class="form-control"
//                                     style={{ width: "300px", fontSize: "12px" }}
//                                 />
//                             </div>
//                             <button
//                                 type="button"
//                                 class="btn btn-white"
//                                 style={{
//                                     position: "absolute",
//                                     right: "0",
//                                 }}
//                             >
//                                 <i class="fas fa-search"></i>
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="row justify-content-around mt-4">{hubList}</div>
//             </div>
//         </>
//     );
// }

// export default MakersHub;
