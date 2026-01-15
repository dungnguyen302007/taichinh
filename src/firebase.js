// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzm6_0XDH37uJw7lzLBMN2HsX0kIxVRyY",
    authDomain: "taichinhdemo-52aa0.firebaseapp.com",
    projectId: "taichinhdemo-52aa0",
    storageBucket: "taichinhdemo-52aa0.firebasestorage.app",
    messagingSenderId: "574339774936",
    appId: "1:574339774936:web:04ae2f20a2e91e04571aad",
    measurementId: "G-5X2ST0RP1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
