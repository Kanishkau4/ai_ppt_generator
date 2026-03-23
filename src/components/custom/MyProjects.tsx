import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "../ui/empty"
import { ArrowUpRightIcon, FolderIcon } from "lucide-react";
import type { ProjectDetails } from "../../workspace/project/outline";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestoreDB } from "../../../config/FirebaseConfig";
import { useUser } from "@clerk/react";
import icon from "../../assets/icon.png"
import { Link } from "react-router-dom";

function MyProjects() {

    const [projects, setProjects] = useState<ProjectDetails[]>([]);
    const { user } = useUser();

    useEffect(() => {
        user && getProjects();
    }, [user]);

    const getProjects = async () => {
        const q = query(collection(firestoreDB, "projects"), where("createdBy", "==", user?.primaryEmailAddress?.emailAddress || ""));
        const querySnapshot = await getDocs(q);
        const fetchedProjects: ProjectDetails[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data() as ProjectDetails;
            // Inject the doc.id as projectId in case it was not explicitly saved inside the document
            fetchedProjects.push({ ...data, projectId: data.projectId || doc.id });
        });
        setProjects(fetchedProjects);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full px-6 py-3 bg-white mt-28 space-y-4 ">
            <div className="flex justify-between items-center w-full px-6 py-3">
                <h2 className="text-2xl font-bold">My Projects</h2>
                <Button>+ Create New Project</Button>
            </div>
            <div>
                {!projects?.length ? <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <FolderIcon />
                        </EmptyMedia>
                        <EmptyTitle>No Projects Yet</EmptyTitle>
                        <EmptyDescription>
                            You haven&apos;t created any projects yet. Get started by creating
                            your first project.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent className="flex-row justify-center gap-2">
                        <Button>Create Project</Button>
                    </EmptyContent>
                </Empty> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                        <Link key={index} to={`/workspace/project/` + project.projectId + `/editor`}>
                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <img src={icon} alt="icon" className="w-12 h-12" />
                                <h3 className="text-lg font-medium">{project.prompt}</h3>
                                <p className="text-sm text-muted-foreground">{project.noOfSlides} slides</p>
                                <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                            </div>
                        </Link>
                    ))}
                </div>}
            </div>
        </div>
    );
}

export default MyProjects;