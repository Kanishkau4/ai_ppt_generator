import React, { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "../ui/input-group";
import { ArrowRight, Loader2Icon, PlusIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { v4 as uuidv4 } from 'uuid';
import { firestoreDB } from "../../../config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";

function PromptBox() {

    const [prompt, setPrompt] = useState<string>("");
    const [noOfSlides, setNoOfSlides] = useState<string>("6-8");
    const { user } = useUser();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const CreateAndSaveProject = async () => {
        setLoading(true);
        const ProjectId = uuidv4();
        console.log(ProjectId);
        //Save to Firestore
        await setDoc(doc(firestoreDB, "projects", ProjectId), {
            ProjectId: ProjectId,
            prompt: prompt,
            noOfSlides: noOfSlides,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: Date.now(),
        });
        setLoading(false);
        navigate(`/workspace/project/` + ProjectId + `/outline`);
    }
    return (
        <div className="flex flex-col items-center justify-center w-full px-6 py-3 bg-white mt-28 space-y-4 ">
            <h1 className="text-3xl font-bold">Describe your topic, and we'll generate a <span className="text-blue-500">presentation</span> for you.</h1>
            <p className="text-lg text-gray-500">Example: Generate a presentation on the history of artificial intelligence.</p>
            <InputGroup className="h-[100px]">
                <InputGroupTextarea placeholder="Enter what kind of presentation you want to generate"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <InputGroupAddon align="block-end">
                    {/* <InputGroupButton>
                        <PlusIcon />
                    </InputGroupButton> */}
                    <Select onValueChange={(value) => setNoOfSlides(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="No of Slides" />
                        </SelectTrigger>
                        <SelectContent className="w-[180px]">
                            <SelectGroup>
                                <SelectLabel>No of Slides</SelectLabel>
                                <SelectItem value="6-8">6-8 Slides</SelectItem>
                                <SelectItem value="9-12">9-12 Slides</SelectItem>
                                <SelectItem value="13-16">13-16 Slides</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputGroupButton variant="default" className="rounded-full ml-auto" size="icon-sm"
                        onClick={() => {
                            CreateAndSaveProject()
                        }}
                        disabled={!prompt && !noOfSlides}
                    >
                        {loading ? <Loader2Icon className="animate-spin" /> : <ArrowRight />}
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}

export default PromptBox;