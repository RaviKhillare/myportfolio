// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Git configuration
// See: https://console.firebase.google.com
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
// We wrap this in a try-catch or check checks to avoid crashing if config is invalid
let db = null;
try {
    if (firebaseConfig.apiKey !== "YOUR_API_KEY_HERE") {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log("Firebase initialized successfully");
    } else {
        console.warn("Firebase config missing. Using LocalStorage fallback.");
    }
} catch (e) {
    console.error("Firebase initialization failed:", e);
}

export { db };
