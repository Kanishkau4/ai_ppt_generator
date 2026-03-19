import React from "react";
import { Button } from "@base-ui/react";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "../ui/empty"
import { ArrowUpRightIcon, FolderIcon } from "lucide-react";
function MyProjects() {
    return (
        <div className="flex flex-col items-center justify-center w-full px-6 py-3 bg-white mt-28 space-y-4 ">
            <div className="flex justify-between items-center w-full px-6 py-3">
                <h2 className="text-2xl font-bold">My Projects</h2>
                <Button>+ Create New Project</Button>
            </div>
            <div>
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
                        <Button>Create Project</Button>
                    </EmptyContent>
                </Empty>
            </div>
        </div>
    );
}

export default MyProjects;