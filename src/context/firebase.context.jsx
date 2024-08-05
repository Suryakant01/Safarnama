import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendSignInLinkToEmail,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, getDocs, addDoc, deleteDoc, collection, querywhere, } from "firebase/firestore"

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

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
const analytics = getAnalytics(FirebaseApp);
const FirebaseAuth = getAuth(FirebaseApp);
const googleAuth = new GoogleAuthProvider();
const FireStore = getFirestore(FirebaseApp)
const storage = getStorage(FirebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

const actionCodeSettings = {
    url: 'http://localhost:3000/',
    // This must be true.
    handleCodeInApp: true,
};


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

    //Captcha 
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(FirebaseAuth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    console.log('Recaptcha resolved');
                },
                'expired-callback': () => {
                    console.log('Recaptcha expired');
                }
            },);
            window.recaptchaVerifier.render();
        }
    };

    // Function to sign in with mobile number
    const signInWithMobile = async (mobileNum) => {
        setupRecaptcha(); // Setup recaptcha before sign-in
        const appVerifier = window.recaptchaVerifier;
        await signInWithPhoneNumber(FirebaseAuth, mobileNum, appVerifier)
            .then((confirmationResult) => {
                console.log("OTP sent");
                window.confirmationResult = confirmationResult;
            })
            .catch((error) => {
                console.log("OTP sending failed", error);
            });
    };

    // Function to verify OTP
    const verifyOTP = (otp) => {
        window.confirmationResult.confirm(otp).then((result) => {
            const user = result.user;
            setUser(user);
            console.log("User signed in with OTP");
        }).catch((error) => {
            console.log("OTP verification failed", error);
        });
    };

    
    const setArticles =  async (name, place, state, article, destPic) => {
    
        const imageRef = ref(storage, `uploads/articles/statePic/${Date.now()}-${destPic.name}`)
        console.log("iamgeREf", imageRef);

        const uploadStatePic = await uploadBytes(imageRef, destPic)
        console.log("uploadStatePic", uploadStatePic);

        return await addDoc(collection(FireStore, "articles"), {
            name,
            place,
            state,
            article,
            imageURL: uploadStatePic.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            profilPic: user.photoURL,
            writtenOn: Date.now(),

        })
    }
    
    const getArticles = async () => {
        return getDocs(collection(FireStore, "articles"))
    }


    return (

        <FirebaseContext.Provider
            value={{
                signInWithGoogle,
                singInWithEmailLink,
                isLoggedIn,
                logout,
                signInWithMobile,
                verifyOTP,
                setupRecaptcha,
                setArticles,
                getArticles,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};
