// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBBAE8k0c7nScVMzkzsx-v8AgNQbl25TsA",
    authDomain: "my-portfolio-2d377.firebaseapp.com",
    projectId: "my-portfolio-2d377",
    storageBucket: "my-portfolio-2d377.firebasestorage.app",
    messagingSenderId: "726904277634",
    appId: "1:726904277634:web:3297183ca92cbee73c429b",
    measurementId: "G-RRGS1J5R9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);