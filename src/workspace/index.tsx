import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "@clerk/react";
import { firestoreDB } from "../../config/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function Workspace() {
    const { isSignedIn } = useUser();

    const createNewUser = async () => {
        const usersRef = collection(firestoreDB, "users");
        const newUserRef = await addDoc(usersRef, {
            email: "[EMAIL_ADDRESS]",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    };

    if (!isSignedIn) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <h1>Workspace</h1>
            <Outlet />
        </div>
    );
}

export default Workspace;
