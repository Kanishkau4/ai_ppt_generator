import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestoreDB, GeminiModel } from "../../../../config/FirebaseConfig";
import { useState, useEffect, useContext } from "react";
import SlidesStyles from "../../../components/custom/SlidesStyles";
import OutlineSection from "../../../components/custom/OutlineSection";
import { UserDetailContext } from "../../../../context/UserDetailContext";
import { Button } from "../../../components/ui/button";
import { Loader2, Sparkle } from "lucide-react";
import CreditLimitDialog from "@/components/custom/CreditLimitDialog";
import { useAuth } from "@clerk/react";

type designStyle = {
    styleName: string;
    colors: any;
    designGuide: string;
    icon: string;
    bannerImage: string;
}


const OUTLINE_PROMPT = `
Generate a PowerPoint slide outline for the topic {userInput}. Create {noOfSlides} slides in total. Each slide should include a topic name and a 2-line descriptive outline that clearly explains what content the slide will cover.
Include the following structure:
The first slide should be a Welcome screen.
The second slide should be an Agenda screen.
The final slide should be a Thank You screen.
Return the response only in JSON format, following this schema:
[
 {
 "slideNo": "",
 "slidePoint": "",
 "outline": ""
 }
]
`

const DUMMY_OUTLINE = [

    {
        "slideNo": "1",
        "slidePoint": "Welcome to the World of Pizza!",
        "outline": "An exciting journey into one of the world's most beloved and versatile foods.\nGet ready to explore the history, types, and cultural impact of pizza."
    },
    {
        "slideNo": "2",
        "slidePoint": "Our Pizza Journey: What We'll Explore",
        "outline": "We'll cover pizza's fascinating origins, diverse types, and the basics of making it.\nDiscover its global reach and incredible impact on food culture worldwide."
    },
    {
        "slideNo": "3",
        "slidePoint": "The Humble Beginnings: A Slice of History",
        "outline": "Trace the roots of pizza from simple ancient flatbreads to its birth in Naples, Italy.\nLearn about key milestones and how it evolved into the iconic dish we know today."
    },
    {
        "slideNo": "4",
        "slidePoint": "A World of Flavors: Types & Regional Variations",
        "outline": "Dive into popular styles like Neapolitan, New York, Chicago deep-dish, and Roman pizza.\nDiscover unique regional toppings, crusts, and preparation methods from around the globe."
    },
    {
        "slideNo": "5",
        "slidePoint": "Crafting the Perfect Pie: The Art of Pizza Making",
        "outline": "Understand the fundamental components: quality dough, flavorful sauce, and perfect cheese.\nExplore basic techniques for assembling and baking a delicious homemade pizza."
    },
    {
        "slideNo": "6",
        "slidePoint": "Pizza's Global Conquest & Cultural Impact",
        "outline": "Examine how pizza became a worldwide sensation, adapting to local tastes and ingredients.\nDiscuss its role in pop culture, celebrations, and as a symbol of comfort and togetherness."
    },
    {
        "slideNo": "7",
        "slidePoint": "Thank You for Joining Our Pizza Tour!",
        "outline": "We hope you enjoyed this delicious exploration of pizza's incredible journey and influence.\nGrab a slice and continue savoring the world's favorite comfort food!"
    }

]

export type ProjectDetails = {
    projectId: string;
    prompt: string;
    noOfSlides: string;
    createdBy: string;
    createdAt: number;
    outline: Outline[];
    slides: any[];
    designStyle: designStyle;
}

export type Outline = {
    slideNo: string;
    slidePoint: string;
    outline: string;
}




function Outline() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);
    const [updateDbLoading, setUpdateDbLoading] = useState(false);
    const [outline, setOutline] = useState<Outline[]>(DUMMY_OUTLINE);
    const [selectedStyle, setSelectedStyle] = useState<designStyle>();
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const { has } = useAuth();
    const hasEliteAccess = has({ plan: 'visionary_elite_' });

    useEffect(() => {
        getProjectDetails();
    }, [projectId]);

    const getProjectDetails = async () => {
        const docRef = doc(firestoreDB, "projects", projectId ?? "");
        const docSnap: any = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
        console.log(docSnap.data());
        if (!docSnap.data().outline) {
            generateOutline(docSnap.data());
        }
    }

    const generateOutline = async (projectDetails: ProjectDetails) => {
        setLoading(true);
        try {
            // Provide a prompt that contains text
            const prompt = OUTLINE_PROMPT.replace("{userInput}", projectDetails?.prompt ?? "").replace("{noOfSlides}", projectDetails?.noOfSlides ?? "");

            // To generate text output, call generateContent with the text input
            const result = await GeminiModel.generateContent(prompt);

            const response = result.response;
            const text = response.text();
            console.log(text);
            const rawJson = text.replace(/```json/gi, "").replace(/```/gi, "").trim();
            setOutline(JSON.parse(rawJson));
        } catch (error) {
            console.error("Error generating outline:", error);
        } finally {
            setLoading(false);
        }
    }
    const handleUpdate = (index: string, value: Outline) => {
        console.log(index, value);
        setOutline((prevOutline) => prevOutline.map((item) => (
            item.slideNo === index ? { ...item, ...value } : item
        )));
    }

    const onGenerateSlides = async () => {
        setUpdateDbLoading(true);
        //update outline in firestore
        await setDoc(doc(firestoreDB, "projects", projectId ?? ""), {
            outline: outline,
            designStyle: selectedStyle
        }, {
            merge: true
        });

        // Check credits & Deduct
        if (!hasEliteAccess) {
            if (userDetail && userDetail.credits > 0) {
                // Deduct 1 credit
                const updatedCredits = userDetail.credits - 1;
                const userRef = doc(firestoreDB, "users", userDetail.email);
                await setDoc(userRef, { credits: updatedCredits }, { merge: true });
                setUserDetail((prev: any) => ({ ...prev, credits: updatedCredits }));
            } else {
                // Out of credits! Block navigation and show dialog
                setUpdateDbLoading(false);
                setOpenAlertDialog(true);
                return;
            }
        }

        setUpdateDbLoading(false);

        //navigate to slide generation page
        navigate(`/workspace/project/${projectId}/editor`);
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Purple Radial Glow */}
            <div
                className="absolute inset-0 z-0 pointer-events-none dark:opacity-100 opacity-40"
                style={{ backgroundImage: `radial-gradient(circle 600px at 50% 0px, rgba(139,92,246,0.2), transparent)` }}
            />
            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-32 space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-extrabold tracking-tight">Settings & Presentation Outline</h2>
                    <p className="text-muted-foreground">Customize the design and review your slide outline before generating.</p>
                </div>
                <SlidesStyles selectStyle={(value: designStyle) => setSelectedStyle(value)} />
                <OutlineSection
                    loading={loading}
                    outline={outline}
                    handleUpdate={(slideNo: string, slidePoint: string, outlineText: string) => handleUpdate(slideNo, { slideNo, slidePoint, outline: outlineText })}
                />
            </div>

            {/* Fixed bottom bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-4 border-t border-border bg-background/80 backdrop-blur-lg">
                <Button
                    size="lg"
                    onClick={onGenerateSlides}
                    disabled={updateDbLoading || loading}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-10 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                >
                    {updateDbLoading && <Loader2 className="animate-spin mr-2" />}
                    Generate Slides
                    <Sparkle className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <CreditLimitDialog openAlertDialog={openAlertDialog} setOpenAlertDialog={setOpenAlertDialog} />
        </div>
    );
}

export default Outline;
