import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
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

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebaseContext);
const FirebaseAuth = getAuth();
const googleAuth = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

const appVerifier = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
          size: "invisible",
          callback: (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              handleSignIn();
          }
      }
  );
};

const handleSignIn = (phoneNumber,) => {
  setupRecaptcha();
  const appVerifier = window.recaptchaVerifier;

  signUpWithMobileNumber(phoneNumber, appVerifier)
      .then((result) => {
          setConfirmationResult(result);
      })
      .catch((error) => {
          console.error("SMS not sent", error);
      });
};
const verifyOtp = () => {
  confirmationResult.confirm(otp)
      .then((result) => {
          console.log("User signed in successfully.", result.user);
      })
      .catch((error) => {
          console.error("Incorrect OTP", error);
      });
};

export const FirebaseProvider = (props) => {
  const signInWithGoogle = () => signInWithPopup(FirebaseAuth, googleAuth);

  const signUpWithEmail = (email, password) =>
    createUserWithEmailAndPassword(FirebaseAuth, email, password);

  const logInWithEmail = (email, password) =>
    signInWithEmailAndPassword(FirebaseAuth, email, password);

  const signUpWithMobileNumber = (mobileNumber) =>
    signInWithPhoneNumber(FirebaseAuth, mobileNumber, appVerifier);

  return (
    <FirebaseContext.Provider
      value={{
        signInWithGoogle,
        signUpWithEmail,
        logInWithEmail,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
