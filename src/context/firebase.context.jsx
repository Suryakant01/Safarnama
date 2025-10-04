import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

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

const FirebaseApp = initializeApp(firebaseConfig);

let authInstance;
const getAuth = async () => {
    if (authInstance) return authInstance;
    const { getAuth } = await import('firebase/auth');
    authInstance = getAuth(FirebaseApp);
    return authInstance;
};

let googleAuthProviderInstance;
const getGoogleAuthProvider = async () => {
    if (googleAuthProviderInstance) return googleAuthProviderInstance;
    const { GoogleAuthProvider } = await import('firebase/auth');
    googleAuthProviderInstance = new GoogleAuthProvider();
    return googleAuthProviderInstance;
};

let firestoreInstance;
const getFirestore = async () => {
    if (firestoreInstance) return firestoreInstance;
    const { getFirestore } = await import('firebase/firestore');
    firestoreInstance = getFirestore(FirebaseApp);
    return firestoreInstance;
};

let storageInstance;
const getStorage = async () => {
    if (storageInstance) return storageInstance;
    const { getStorage } = await import('firebase/storage');
    storageInstance = getStorage(FirebaseApp);
    return storageInstance;
};

export const useFirebase = () => useContext(FirebaseContext);

const actionCodeSettings = {
    url: 'http://localhost:3000/',
    handleCodeInApp: true,
};

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let unsubscribe;
        const initAuthListener = async () => {
            try {
                const FirebaseAuth = await getAuth();
                const { onAuthStateChanged } = await import('firebase/auth');
                unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
                    if (user) {
                        setUser(user);
                        setIsLoggedIn(true);
                    } else {
                        setUser(null);
                        setIsLoggedIn(false);
                    }
                });
            } catch (error) {
                console.error("Error in onAuthStateChanged: ", error);
            }
        };

        initAuthListener();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const signInWithGoogle = async () => {
        try {
            const FirebaseAuth = await getAuth();
            const googleAuth = await getGoogleAuthProvider();
            const { signInWithPopup } = await import('firebase/auth');
            await signInWithPopup(FirebaseAuth, googleAuth);
        } catch (error) {
            console.error("Error in signInWithGoogle: ", error);
        }
    };

    const signUpUserWithEmail = async (email, pass) => {
        try {
            const FirebaseAuth = await getAuth();
            const { createUserWithEmailAndPassword } = await import('firebase/auth');
            await createUserWithEmailAndPassword(FirebaseAuth, email, pass);
        } catch (error) {
            console.error("Error in signUpUserWithEmail: ", error);
        }
    };

    const signInUserWithEmail = async (email, pass) => {
        try {
            const FirebaseAuth = await getAuth();
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            await signInWithEmailAndPassword(FirebaseAuth, email, pass);
            console.log("Success in signing user");
        } catch (error) {
            console.error("Error in signInUserWithEmail: ", error);
        }
    };

    const singInWithEmailLink = async (email) => {
        try {
            const FirebaseAuth = await getAuth();
            const { sendSignInLinkToEmail } = await import('firebase/auth');
            await sendSignInLinkToEmail(FirebaseAuth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            console.log("Mail sent");
            setUser(user);
        } catch (error) {
            console.error("Error in singInWithEmailLink: ", error);
        }
    };

    const logout = async () => {
        try {
            const FirebaseAuth = await getAuth();
            const { signOut } = await import('firebase/auth');
            await signOut(FirebaseAuth);
            setIsLoggedIn(false);
            console.log("Signout success");
        } catch (error) {
            console.error("Error in logout: ", error);
        }
    };

    const setupRecaptcha = async () => {
        try {
            const FirebaseAuth = await getAuth();
            const { RecaptchaVerifier } = await import('firebase/auth');
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(FirebaseAuth, 'recaptcha-container', {
                    'size': 'invisible',
                    'callback': (response) => {
                        console.log('Recaptcha resolved');
                    },
                    'expired-callback': () => {
                        console.log('Recaptcha expired');
                    }
                });
                window.recaptchaVerifier.render();
            }
        } catch (error) {
            console.error("Error in setupRecaptcha: ", error);
        }
    };

    const signInWithMobile = async (mobileNum) => {
        try {
            await setupRecaptcha();
            const FirebaseAuth = await getAuth();
            const { signInWithPhoneNumber } = await import('firebase/auth');
            const appVerifier = window.recaptchaVerifier;
            await signInWithPhoneNumber(FirebaseAuth, mobileNum, appVerifier);
            console.log("OTP sent");
        } catch (error) {
            console.error("Error in signInWithMobile: ", error);
        }
    };

    const verifyOTP = async (otp) => {
        try {
            const result = await window.confirmationResult.confirm(otp);
            const user = result.user;
            setUser(user);
            console.log("User signed in with OTP");
        } catch (error) {
            console.error("Error in verifyOTP: ", error);
        }
    };

    const setArticles = async (name, place, state, article, destPic) => {
        try {
            const storage = await getStorage();
            const FireStore = await getFirestore();
            const { ref, uploadBytes } = await import('firebase/storage');
            const { addDoc, collection } = await import('firebase/firestore');
            const imageRef = ref(storage, `uploads/articles/statePic/${Date.now()}-${destPic.name}`);
            const uploadStatePic = await uploadBytes(imageRef, destPic);
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
                writtenOnDate: new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }),
            });
        } catch (error) {
            console.error("Error in setArticles: ", error);
        }
    };

    const getArticles = async () => {
        try {
            const FireStore = await getFirestore();
            const { getDocs, collection } = await import('firebase/firestore');
            return await getDocs(collection(FireStore, "articles"));
        } catch (error) {
            console.error("Error in getArticles: ", error);
        }
    };

    const getStateBlogs = async (state) => {
        try {
            const FireStore = await getFirestore();
            const { collection, query, where, getDocs } = await import('firebase/firestore');
            const articlesRef = collection(FireStore, 'articles');
            const q = query(articlesRef, where('state', '==', state));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return [];
            }
            return querySnapshot;
        } catch (error) {
            console.error('Error in getStateBlogs: ', error);
        }
    };

    const getPlaceBlogId = async (id) => {
        try {
            const FireStore = await getFirestore();
            const { doc, getDoc } = await import('firebase/firestore');
            const blogRef = doc(FireStore, "articles", id);
            const blogDoc = await getDoc(blogRef);

            if (!blogDoc.exists()) {
                console.log("Blog not found");
                return null;
            }

            return blogDoc.data();
        } catch (error) {
            console.error('Error in getPlaceBlogId: ', error);
        }
    };

    const getImageURL = async (path) => {
        try {
            const storage = await getStorage();
            const { getDownloadURL, ref } = await import('firebase/storage');
            return await getDownloadURL(ref(storage, path));
        } catch (error) {
            console.error('Error in getImageURL: ', error);
        }
    };

    const deleteArticles = async (articleID) => {
        try {
            const FireStore = await getFirestore();
            const { doc, deleteDoc } = await import('firebase/firestore');
            await deleteDoc(doc(FireStore, "articles", articleID));
            console.log(`Article - ${articleID} deleted`);
        } catch (error) {
            console.error('Error in deleteArticles: ', error);
        }
    };

    return (
        <FirebaseContext.Provider
            value={{
                signUpUserWithEmail,
                signInUserWithEmail,
                signInWithGoogle,
                singInWithEmailLink,
                isLoggedIn,
                logout,
                signInWithMobile,
                verifyOTP,
                setupRecaptcha,
                setArticles,
                getArticles,
                getImageURL,
                deleteArticles,
                getStateBlogs,
                getPlaceBlogId,
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};
