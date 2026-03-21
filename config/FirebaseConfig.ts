// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAI, getGenerativeModel, getLiveGenerativeModel, GoogleAIBackend, ResponseModality } from "firebase/ai";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY!,
    authDomain: "ai-ppt-generator-5519d.firebaseapp.com",
    projectId: "ai-ppt-generator-5519d",
    storageBucket: "ai-ppt-generator-5519d.firebasestorage.app",
    messagingSenderId: "1013324891420",
    appId: "1:1013324891420:web:07998cf1c97ef8524766d9",
    measurementId: "G-8MS5JLPK1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firestoreDB = getFirestore(app);

// Initialize the Gemini Developer API backend service
const ai = getAI(app, { backend: new GoogleAIBackend() });

// Create a `GenerativeModel` instance with a model that supports your use case
export const GeminiModel = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

// Create a `LiveGenerativeModel` instance with a model that supports the Live API
export const GeminiLiveModel = getLiveGenerativeModel(ai, {
    model: "gemini-2.5-flash-live-preview-09-2025",
    // Configure the model to respond with text
    generationConfig: {
        responseModalities: [ResponseModality.TEXT],
    },
});
