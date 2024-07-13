// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "safarnama-c075f.firebaseapp.com",
  projectId: "safarnama-c075f",
  storageBucket: "safarnama-c075f.appspot.com",
  messagingSenderId: "813604453737",
  appId: "1:813604453737:web:1feb3dc008d28e52c0d1f8",
  measurementId: "G-Y27FSW4K5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);