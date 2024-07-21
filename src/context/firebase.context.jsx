import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  signOut,
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

  url: 'http://localhost:3000/',
  // This must be true.
  handleCodeInApp: true,

};

export const useFirebase = () => useContext(FirebaseContext);



export const FirebaseProvider = (props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  const signInWithGoogle = () => signInWithPopup(FirebaseAuth, googleAuth);

  const singInWithEmailLink = (email) =>
    sendSignInLinkToEmail(FirebaseAuth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        console.log("mail sent")
        setUser(user)
      })
      .catch((e) => {
        console.log("error info", e.code, e.message,);
      })

  var isLoggedIn = user ? true : false
  const logout = () => {
    signOut(FirebaseAuth).then(() => {
      isLoggedIn = false
      console.log("signout success")
    }).catch((error) => {
      console.log("signout fail")
    });
  }


  return (
    <FirebaseContext.Provider
      value={{
        signInWithGoogle,
        singInWithEmailLink,
        isLoggedIn,
        logout,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
