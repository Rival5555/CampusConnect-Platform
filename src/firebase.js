import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGQOUf79d8aH_uDnR6hMMXTDqK-Q2JYKQ",
    authDomain: "unievent-84e46.firebaseapp.com",
    projectId: "unievent-84e46",
    storageBucket: "unievent-84e46.firebasestorage.app",
    messagingSenderId: "373352233712",
    appId: "1:373352233712:web:96497e90d9680a89526035"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Connect to emulators in development
if (location.hostname === "localhost") {
    console.log("Using Firebase Emulators");
    const { connectAuthEmulator } = await import("firebase/auth");
    const { connectFirestoreEmulator } = await import("firebase/firestore");

    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);
}

export default app;
