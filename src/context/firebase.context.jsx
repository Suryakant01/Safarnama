import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
} from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "safarnama-c075f.firebaseapp.com",
  projectId: "safarnama-c075f",
  storageBucket: "safarnama-c075f.appspot.com",
  messagingSenderId: "813604453737",
  appId: "1:813604453737:web:1feb3dc008d28e52c0d1f8",
  measurementId: "G-Y27FSW4K5D",
};

const FirebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(FirebaseContext);
const FirebaseAuth = getAuth();
const googleAuth = new GoogleAuthProvider();


const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:3000/',
  // This must be true.
  handleCodeInApp: true,
  
};

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

  const signInWithGoogle = () => signInWithPopup(FirebaseAuth, googleAuth);

  const singInWithEmailLink = (email) =>
    sendSignInLinkToEmail(FirebaseAuth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        console.log("mail sent")
      })
      .catch((e) => {
        console.log("error info", e.code, e.message,);
      })


  return (
    <FirebaseContext.Provider
      value={{
        signInWithGoogle,
        singInWithEmailLink,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
