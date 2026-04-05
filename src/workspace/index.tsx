import { useContext, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/react";
import { firestoreDB } from "../../config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";
import Header from "../components/custom/Header";
import PromptBox from "../components/custom/PromptBox";
import MyProjects from "../components/custom/MyProjects";

function Workspace() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { setUserDetail } = useContext(UserDetailContext);
    const location = useLocation();

    useEffect(() => {
        createNewUser();
    }, [user, isLoaded]);

    const createNewUser = async () => {
        if (user && user.primaryEmailAddress?.emailAddress) {
            try {
                const docRef = doc(firestoreDB, "users", user.primaryEmailAddress.emailAddress);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setUserDetail(docSnap.data());
                } else {
                    const data = {
                        fullName: user?.fullName,
                        email: user.primaryEmailAddress.emailAddress,
                        createdAt: Date.now(),
                        credits: 4,
                    }
                    // Insert new user
                    console.log("Inserting new user...");
                    await setDoc(docRef, data);
                    setUserDetail(data);
                    console.log("User inserted successfully");
                }
            } catch (error) {
                console.error("Error creating new user in Firestore:", error);
            }
        }
    };

    if (!isLoaded) {
        return null;
    }

    if (!isSignedIn) {
        return <Navigate to="/" />;
    }
    return (
        <div className="min-h-screen w-full bg-background relative flex flex-col pt-16 mt-0">
            {/* Purple Radial Glow Background at lowest z-index so content doesn't need z-10 */}
            <div
                className="absolute inset-0 -z-10 pointer-events-none dark:opacity-100 opacity-50"
                style={{
                    backgroundImage: `radial-gradient(circle 800px at 50% 0px, rgba(139,92,246,0.25), transparent)`,
                }}
            />
            <div className="flex flex-col flex-grow w-full">
                <Header />
                {location.pathname == '/workspace' &&
                    <div className="pt-[64px]">
                        <PromptBox />
                        <MyProjects />
                    </div>}
                <Outlet />
            </div>
        </div>
    );
}

export default Workspace;
