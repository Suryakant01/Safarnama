// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: "safarnama-c075f.firebaseapp.com",
        projectId: "safarnama-c075f",
        storageBucket: "safarnama-c075f.appspot.com",
        messagingSenderId: "813604453737",
        appId: "1:813604453737:web:1feb3dc008d28e52c0d1f8",
        measurementId: "G-Y27FSW4K5D"
    };

const FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebaseApp);
const FirebaseAuth = getAuth(FirebaseApp);
const googleAuth = new GoogleAuthProvider();
const FireStore = getFirestore(FirebaseApp);
const storage = getStorage(FirebaseApp);

export { FirebaseApp, FirebaseAuth, googleAuth, FireStore, storage };
