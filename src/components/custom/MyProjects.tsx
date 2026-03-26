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
        <div className="w-full px-6 py-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight">My Projects</h2>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5">
                    + Create New Project
                </Button>
            </div>
            <div>
                {!projects?.length ? (
                    <Empty>
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
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Create Project</Button>
                        </EmptyContent>
                    </Empty>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.map((project, index) => (
                            <Link key={index} to={`/workspace/project/` + project.projectId + `/editor`}>
                                <div className="group border border-border bg-card hover:bg-accent/50 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                            <img src={icon} alt="icon" className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">{new Date(project.createdAt).toLocaleDateString()}</p>
                                            <p className="text-xs text-purple-500 font-medium">{project.noOfSlides} slides</p>
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-semibold line-clamp-2 text-foreground group-hover:text-purple-500 transition-colors">
                                        {project.prompt}
                                    </h3>
                                    <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground group-hover:text-purple-400 transition-colors">
                                        <span>Open project</span>
                                        <ArrowUpRightIcon className="h-3 w-3" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyProjects;