import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "safarnama-c075f.firebaseapp.com",
  projectId: "safarnama-c075f",
  storageBucket: "safarnama-c075f.appspot.com",
  messagingSenderId: "813604453737",
  appId: "1:813604453737:web:1feb3dc008d28e52c0d1f8",
  measurementId: "G-Y27FSW4K5D"
};


const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebaseContext);


export const useFirebase = () => useContext(FirebaseContext);


export const FirebaseProvider = (props) => {


  return (
    <FirebaseContext.Provider
      value={{

      }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}