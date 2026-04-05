import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "../ui/input-group";
import { ArrowRight, Loader2Icon } from "lucide-react";
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
    const [noOfSlides, setNoOfSlides] = useState<string>("4-6");
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
        <div className="flex flex-col items-center justify-center w-full px-6 py-16 space-y-6 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Describe your topic, and we'll generate a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400">
                    presentation
                </span>{" "}
                for you.
            </h1>
            <p className="text-base text-muted-foreground">
                Example: Generate a presentation on the history of artificial intelligence.
            </p>
            <div className="w-full">
                <InputGroup className="h-[110px]">
                    <InputGroupTextarea
                        placeholder="Enter what kind of presentation you want to generate"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="resize-none"
                    />
                    <InputGroupAddon align="block-end">
                        <Select onValueChange={(value) => setNoOfSlides(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="No of Slides" />
                            </SelectTrigger>
                            <SelectContent className="w-[180px]">
                                <SelectGroup>
                                    <SelectLabel>No of Slides</SelectLabel>
                                    <SelectItem value="4-6">4-6 Slides</SelectItem>
                                    <SelectItem value="7-9">7-9 Slides</SelectItem>
                                    <SelectItem value="10-12">10-12 Slides</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputGroupButton
                            variant="default"
                            className="rounded-full ml-auto bg-purple-600 hover:bg-purple-700"
                            size="icon-sm"
                            onClick={() => { CreateAndSaveProject() }}
                            disabled={!prompt}
                        >
                            {loading ? <Loader2Icon className="animate-spin" /> : <ArrowRight />}
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    );
}

export default PromptBox;