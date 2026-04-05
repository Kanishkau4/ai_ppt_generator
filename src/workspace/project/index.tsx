import { useParams } from "react-router-dom";

function Project() {
    const projectId = useParams().projectId;
    return (
        <div>
            <h1>Project: {projectId}</h1>
        </div>
    );
}

export default Project;