import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestoreDB, GeminiModel } from "../../../../config/FirebaseConfig";
import type { ProjectDetails } from "../outline";
import OutlineSection from "../../../components/custom/OutlineSection";
import SlidesFrame from "../../../components/custom/SlidesFrame";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import * as htmlToImage from "html-to-image";
import PptxGenJS from "pptxgenjs";

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

const DUMMY_SLIDE = ` <!-- Slide Content Wrapper (Fixed 16:9 Aspect Ratio) -->
    <div class="w-[800px] h-[500px] relative bg-[#0D0D0D] text-white overflow-hidden">
        <!-- Background Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] to-[#1F1F1F] opacity-70"></div>

        <!-- Grid Layout for Content -->
        <div class="grid grid-cols-2 grid-rows-2 h-full relative z-10">

            <!-- Left Top - Title & Outline -->
            <div class="col-span-1 row-span-1 p-8 flex flex-col justify-start items-start">
                <h1 class="text-4xl font-serif font-bold text-accent mb-4">
                    Welcome to Kravix Studio: The Future of Film
                </h1>
                <p class="text-sm text-gray-300 leading-relaxed">
                    Welcome to our investor pitch for [App Name], an innovative AI Short Film Generator.<br>
                    We are revolutionizing content creation, making filmmaking accessible to everyone.
                </p>
            </div>

            <!-- Right Top - Image/Visual -->
            <div class="col-span-1 row-span-1 p-4 flex justify-end items-start">
                <img src="https://ik.imagekit.io/ikmedia/ik-genimg-prompt-futuristic%20film%20studio%20interior%20black%20gold%20accents/filmStudioAesthetic.jpg" alt="filmStudioAesthetic" class="rounded-lg shadow-lg w-full h-auto object-cover max-h-[200px]">
            </div>

            <!-- Left Bottom - Call to Action/Key Benefit -->
            <div class="col-span-1 row-span-1 p-8 flex flex-col justify-end items-start">
                <div class="bg-[#1F1F1F] bg-opacity-60 backdrop-blur-md rounded-lg p-6">
                    <h2 class="text-2xl font-serif font-semibold mb-2">
                        Unleash Your Creative Vision
                    </h2>
                    <p class="text-gray-200 text-sm leading-relaxed">
                        Transform ideas into stunning short films with the power of AI. No experience needed.
                    </p>
                </div>
            </div>

            <!-- Right Bottom - Slide Number & Subtle Element -->
            <div class="col-span-1 row-span-1 p-8 flex justify-end items-end">
                 <div class="flex items-center space-x-2">
                        <span class="text-gray-400 text-xs font-medium">Slide</span>
                        <span class="text-accent font-bold text-xl">1</span>
                    </div>
                
            </div>

            <!-- Subtle Lighting Effect (Optional) -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-accent rounded-full blur-3xl opacity-10"></div>
                <div class="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary rounded-full blur-2xl opacity-10"></div>
            </div>
        </div>
    </div>`


function Editor() {
    const { projectId } = useParams();
    const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [slides, setSlides] = useState<{ code: string }[]>([{ code: DUMMY_SLIDE }]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [downloadLoading, setDownloadLoading] = useState(false);

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
        setProjectDetails(docSnap.data());
        setLoading(false);
    }

    useEffect(() => {
        if (!projectDetails) return;

        if (!projectDetails?.slides || projectDetails.slides.length === 0) {
            generateSlides();
        } else {
            setSlides(projectDetails.slides);
        }
    }, [projectDetails]);

    const generateSlides = async () => {
        if (!projectDetails?.outline || projectDetails.outline.length === 0) return;

        console.log("🚀 Starting slide generation...");

        const generated: { code: string }[] = [];

        for (let index = 0; index < projectDetails.outline.length && index < 5; index++) {
            const metaData = projectDetails.outline[index];
            const prompt = SLIDE_PROMPT
                .replace("{DESIGN_STYLE}", projectDetails?.designStyle?.designGuide ?? "")
                .replace("{COLORS_CODE}", JSON.stringify(projectDetails?.designStyle?.colors))
                .replace("{METADATA}", JSON.stringify(metaData));

            console.log("🧠 Generating slide", index + 1);
            const slideCode = await GeminiSlideCall(prompt, index);
            if (slideCode) {
                generated[index] = { code: slideCode };
                // Live preview: update state incrementally
                setSlides(prev => {
                    const updated = [...prev];
                    updated[index] = { code: slideCode };
                    return updated;
                });
            }
            console.log("✅ Finished slide", index + 1);
        }

        console.log("🎉 All slides generated!");
        await saveAllSlidesData(generated);
    };

    // Accepts the final slides array directly to avoid stale closure
    const saveAllSlidesData = async (finalSlides: { code: string }[]) => {
        if (!projectId) return;
        console.log("💾 Saving all slides to Firestore...");
        await setDoc(doc(firestoreDB, "projects", projectId), {
            slides: finalSlides,
        }, { merge: true });
        console.log("✅ Slides saved to Firestore!");
    };

    // Save current slides state when triggered by edit
    const saveCurrentSlides = async (currentSlides: { code: string }[]) => {
        if (!projectId) return;
        await setDoc(doc(firestoreDB, "projects", projectId), {
            slides: currentSlides,
        }, { merge: true });
        console.log("✅ Updated slide saved to Firestore!");
    };

    const GeminiSlideCall = async (prompt: string, index: number): Promise<string> => {
        try {
            const result = await GeminiModel.generateContent(prompt);
            const raw = (await result.response.text()).trim();
            const finalText = raw
                .replace(/```html/g, "")
                .replace(/```/g, "")
                .trim();
            console.log("✅ Slide", index + 1, "complete");
            return finalText;
        } catch (err) {
            console.error("❌ Error generating slide", index + 1, err);
            return "";
        }
    };

    const updateSlide = (updateSlideCode: string, index: number) => {
        setSlides(prev => {
            const updated = prev ? [...prev] : [];
            updated[index] = { code: updateSlideCode };
            // Save the updated slides to Firestore immediately
            saveCurrentSlides(updated);
            return updated;
        });
    }

    const exportAllIframesToPPT = async () => {
        if (!containerRef.current) return;
        setDownloadLoading(true);
        try {
            const pptx = new PptxGenJS();
            const iframes = containerRef.current.querySelectorAll("iframe");

            for (let i = 0; i < iframes.length; i++) {
                const iframe = iframes[i] as HTMLIFrameElement;
                const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                if (!iframeDoc) continue;

                const slideNode = iframeDoc.querySelector("body > div") as HTMLElement || iframeDoc.body as HTMLElement;
                if (!slideNode) continue;

                console.log(`Exporting slide ${i + 1}...`);
                try {
                    const dataUrl = await htmlToImage.toPng(slideNode, {
                        quality: 1,
                        width: 800,
                        height: 500,
                        style: { transform: 'scale(1)', transformOrigin: 'top left' },
                    });
                    const slide = pptx.addSlide();
                    slide.addImage({ data: dataUrl, x: 0, y: 0, w: 10, h: 5.625 });
                } catch (imgErr) {
                    console.warn(`Slide ${i + 1} image capture failed, adding blank slide:`, imgErr);
                    pptx.addSlide();
                }
            }
            pptx.writeFile({ fileName: "MyProjectSlides.pptx" });
        } catch (err) {
            console.error("Export failed:", err);
            alert("Export failed. Please try again.");
        } finally {
            setDownloadLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-5" style={{ height: 'calc(100vh - 64px)' }}>
            {/* Outline Sidebar */}
            <div className="col-span-2 h-full overflow-y-auto border-r bg-gray-50">
                <OutlineSection
                    loading={loading}
                    outline={projectDetails?.outline ?? []}
                    handleUpdate={(slideNo: string, slidePoint: string, outline: string) => {
                        console.log(slideNo, slidePoint, outline);
                    }}
                />
            </div>

            {/* Slides Area */}
            <div className="col-span-3 h-full overflow-y-auto overflow-x-auto p-8" ref={containerRef}>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold">Presentation Slides</h2>
                    <Button onClick={exportAllIframesToPPT} disabled={downloadLoading}>
                        {downloadLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <FileDown className="mr-2 h-4 w-4" />}
                        Export PPT
                    </Button>
                </div>

                {loading && (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
                        <span className="ml-2 text-gray-500">Loading project...</span>
                    </div>
                )}

                {!loading && slides?.map((slide, index) => (
                    <SlidesFrame
                        key={index}
                        slide={slide}
                        colors={projectDetails?.designStyle?.colors}
                        setUpdateSlider={(updateSlideCode: string) => {
                            updateSlide(updateSlideCode, index);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Editor;
