import React, { useEffect, useState } from "react";
import { CgDisplayFlex } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogComponent from "../../Components/BlogComponent/BlogComponent";
import { FeatureProjectList } from "../../Components/Redux/Actions/FeatureProjectList";

function ProjectDetailViewPage() {
    const params = useParams();
    const projectList = useSelector((state) => state.projectList.projectList);
    const dispatch = useDispatch();

    const [projects, setProjects] = useState(null);

    useEffect(() => {
        FeatureProjectList(dispatch);
        // setProjects(project);
    }, []);

    useEffect(() => {
        if (projectList) {
            const displaySelectedProject = projectList.filter(
                (project) => project.Project_ID === params.id
            );
            setProjects(displaySelectedProject);
        }
    }, [projectList]);

    return (
        <div>
            <BlogComponent />
        </div>
    );
}

export default ProjectDetailViewPage;
