import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB, GeminiLiveModel } from "../../../../config/FirebaseConfig";
import type { ProjectDetails } from "../outline";
import OutlineSection from "../../../components/custom/OutlineSection";

const SLIDE_PROMPT = `
Generate HTML (TailwindCSS + Flowbite UI + Lucide Icons) 
code for a 16:9 ppt slider in Modern Dark style.
{DESIGN_STYLE}. No responsive design; use a fixed 16:9 layout for slides.
Use Flowbite component structure. Use different layouts depending on content and style.
Use TailwindCSS colors like primary, accent, gradients, background, etc., and include colors from {COLORS_CODE}.
MetaData for Slider: {METADATA}

- Ensure images are optimized to fit within their container div and do not overflow.
- Use proper width/height constraints on images so they scale down if needed to remain inside the slide.
- Maintain 16:9 aspect ratio for all slides and all media.
- Use CSS classes like 'object-cover' or 'object-contain' for images to prevent stretching or overflow.
- Use grid or flex layouts to properly divide the slide so elements do not overlap.

Generate Image if needed using:
'https://ik.imagekit.io/ikmedia/ik-genimg-prompt-{imagePrompt}/{altImageName}.jpg'
Replace {imagePrompt} with relevant image prompt and altImageName with a random image name.  

<!-- Slide Content Wrapper (Fixed 16:9 Aspect Ratio) -->
<div class="w-[800px] h-[500px] relative overflow-hidden">
  <!-- Slide content here -->
</div>
Also do not add any overlay : Avoid this :
    <div class="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20"></div>


Just provide body content for 1 slider. Make sure all content, including images, stays within the main slide div and preserves the 16:9 ratio.`



function Editor() {
    const { projectId } = useParams();
    const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProjectDetails();
    }, [projectId]);

    const getProjectDetails = async () => {
        setLoading(true);
        const docRef = doc(firestoreDB, "projects", projectId ?? "");
        const docSnap: any = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
        console.log(docSnap.data());
        setProjectDetails(docSnap.data());
        setLoading(false);
    }

    useEffect(() => {
        if (projectDetails && (!projectDetails?.slides || projectDetails?.slides?.length === 0)) {
            generateSlides();
        }
    }, [projectDetails]);

    const generateSlides = async () => {
        setLoading(true);
        try {
            // Provide a prompt that contains text
            const prompt = SLIDE_PROMPT.replace("{DESIGN_STYLE}", projectDetails?.designStyle?.designGuide ?? "").replace("{noOfSlides}", projectDetails?.noOfSlides ?? "").replace("{METADATA}", JSON.stringify(projectDetails?.outline?.[0] ?? {})).replace("{COLORS_CODE}", projectDetails?.designStyle?.colors ?? "");

            const session = await GeminiLiveModel.connect();

            session.send(prompt);

            // Handle the model's text output
            let text = "";
            const messages = session.receive();
            for await (const message of messages) {
                switch (message.type) {
                    case "serverContent":
                        if (message.turnComplete) {
                            // TODO(developer): Handle turn completion
                        } else if (message.interrupted) {
                            // TODO(developer): Handle the interruption
                            break;
                        } else if (message.modelTurn) {
                            const parts = message.modelTurn?.parts;
                            parts?.forEach((part: any) => {
                                if (part.text) {
                                    // TODO(developer): Play the text chunk
                                    text += part.text;
                                }
                            });
                        }
                        break;
                    case "toolCall":
                    // Ignore
                    case "toolCallCancellation":
                    // Ignore
                }
            }
        } catch (error) {
            console.error("Error generating outline:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-5">
            <div className="col-span-2 h-screen overflow-y-auto">
                {/*Outline*/}
                <OutlineSection loading={loading} outline={projectDetails?.outline ?? []}
                    handleUpdate={(slideNo: string, slidePoint: string, outline: string) => {
                        console.log(slideNo, slidePoint, outline);
                    }} />
            </div>
            <div className="col-span-3 h-screen overflow-y-auto">
                Slides
            </div>
        </div>
    );
}

export default Editor;
