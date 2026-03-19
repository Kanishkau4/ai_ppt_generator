import React, { useContext, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/react";
import { firestoreDB } from "../../config/FirebaseConfig";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";
import Header from "../components/custom/Header";
import PromptBox from "../components/custom/PromptBox";
import MyProjects from "../components/custom/MyProjects";

function Workspace() {
    const { isSignedIn, user } = useUser();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const location = useLocation();

    useEffect(() => {
        createNewUser();
    }, [user]);

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
                        credits: 5,
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

    if (!isSignedIn) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <Header />
            {location.pathname == '/workspace' &&
                <div>
                    <PromptBox />
                    <MyProjects />
                </div>}
            <Outlet />
        </div>
    );
}

export default Workspace;
