import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CardViewVerticalComponent from "../../Components/card/CardViewVerticalComponent";

const project = [
    {
        name: "project name",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
        image: "https://thumbs.dreamstime.com/b/projects-concept-black-chalkboard-d-rendering-handwritten-top-view-office-desk-lot-business-office-supplies-79906734.jpg",
    },
    {
        name: "project name",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
        image: "https://thumbs.dreamstime.com/b/projects-concept-black-chalkboard-d-rendering-handwritten-top-view-office-desk-lot-business-office-supplies-79906734.jpg",
    },
    {
        name: "project name",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
        image: "https://thumbs.dreamstime.com/b/projects-concept-black-chalkboard-d-rendering-handwritten-top-view-office-desk-lot-business-office-supplies-79906734.jpg",
    },
    {
        name: "project name",
        description:
            "At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.",
        image: "https://thumbs.dreamstime.com/b/projects-concept-black-chalkboard-d-rendering-handwritten-top-view-office-desk-lot-business-office-supplies-79906734.jpg",
    },
];

function Projects() {
    const history = useHistory();
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        setProjects(project);
    }, []);

    const handleClick = (event) => {
        let clickedHub = event.target.value;
        // history.push({
        //     pathname: "/makers/details",
        //     state: { clickedHub },
        // });
    };
    return (
        <>
            {projects && (
                <CardViewVerticalComponent
                    header="projects hub"
                    data={projects}
                    handleClick={handleClick}
                />
            )}
        </>
    );
}

export default Projects;
