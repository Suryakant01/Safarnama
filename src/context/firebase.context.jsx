import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendSignInLinkToEmail,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, getDocs, addDoc, collection, query, where, deleteDoc, Firestore, updateDoc, arrayUnion, arrayRemove, increment, onSnapshot, setDoc, serverTimestamp  } from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const FirebaseAuth = getAuth(FirebaseApp);
const googleAuth = new GoogleAuthProvider();
const FireStore = getFirestore(FirebaseApp);
const storage = getStorage(FirebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

const actionCodeSettings = {
    url: 'http://localhost:3000/',
    handleCodeInApp: true,
};

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        try {
            onAuthStateChanged(FirebaseAuth, (user) => {
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
    }, []);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(FirebaseAuth, googleAuth);
        } catch (error) {
            console.error("Error in signInWithGoogle: ", error);
        }
    };

    const signUpUserWithEmail = async (email, pass) => {
        try {
            await createUserWithEmailAndPassword(FirebaseAuth, email, pass);
        } catch (error) {
            console.error("Error in signUpUserWithEmail: ", error);
        }
    };

    const signInUserWithEmail = async (email, pass) => {
        try {
            await signInWithEmailAndPassword(FirebaseAuth, email, pass);
            console.log("Success in signing user");
        } catch (error) {
            console.error("Error in signInUserWithEmail: ", error);
        }
    };

    const singInWithEmailLink = async (email) => {
        try {
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
            await signOut(FirebaseAuth);
            setIsLoggedIn(false);
            console.log("Signout success");
        } catch (error) {
            console.error("Error in logout: ", error);
        }
    };

    const setupRecaptcha = () => {
        try {
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
            setupRecaptcha(); // Setup recaptcha before sign-in
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
                likes: 0, // Initialize likes count
                likedBy: [], // Array to store user IDs of who liked the article
                savedBy: [], // Array to store user IDs of who saved the article
            });
        } catch (error) {
            console.error("Error in setArticles: ", error);
        }
    };

    const getArticles = async () => {
        try {
            return await getDocs(collection(FireStore, "articles"));
        } catch (error) {
            console.error("Error in getArticles: ", error);
        }
    };

    const getStateBlogs = async (state) => {
        try {
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
            return await getDownloadURL(ref(storage, path));
        } catch (error) {
            console.error('Error in getImageURL: ', error);
        }
    };

    const deleteArticles = async (articleID) => {
        try {
            await deleteDoc(doc(FireStore, "articles", articleID));
            console.log(`Article - ${articleID} deleted`);
        } catch (error) {
            console.error('Error in deleteArticles: ', error);
        }
    };

    const likeArticle = async (articleID) => {
        try {
            const articleRef = doc(FireStore, "articles", articleID);
            const articleDoc = await getDoc(articleRef);
    
            if (articleDoc.exists()) {
                const currentLikes = articleDoc.data().likes || 0;
                await updateDoc(articleRef, { likes: currentLikes + 1 });
            }
        } catch (error) {
            console.error("Error in likeArticle: ", error);
        }
    };

    
    const getArticleLikes = (articleID, callback) => {
        try {
            const articleRef = doc(FireStore, "articles", articleID);
            return onSnapshot(articleRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const articleData = docSnapshot.data();
                    callback(articleData.likes || 0);
                } else {
                    callback(0); // If the document doesn't exist, assume 0 likes
                }
            });
        } catch (error) {
            console.error("Error in getArticleLikes: ", error);
            callback(0);
        }
    };
    
    const saveArticle = async (articleID) => {
        try {
            if (!user) {
                console.error("User not logged in");
                return;
            }
    
            const userSavedRef = doc(FireStore, "users", user.uid, "savedArticles", articleID);
            await setDoc(userSavedRef, {
                articleID: articleID,
                savedOn: serverTimestamp(),
            });
    
            console.log(`Article ${articleID} saved for user ${user.uid}`);
        } catch (error) {
            console.error("Error in saveArticle: ", error);


        }
    };

    const getSavedArticles = async (userID, callback) => {
        try {
            const savedArticlesRef = collection(FireStore, "users", userID, "savedArticles");
            const q = query(savedArticlesRef);
            return onSnapshot(q, (snapshot) => {
                const savedArticles = [];
                snapshot.forEach((doc) => {
                    savedArticles.push(doc.data().articleID);
                });
                callback(savedArticles);
            });
        } catch (error) {
            console.error("Error in getSavedArticles: ", error);
        }
    };

    const unlikeArticle = async (articleID) => {
        try {
            const articleRef = doc(FireStore, "articles", articleID);
            await updateDoc(articleRef, {
                likes: arrayRemove(user.uid),
                likedBy: arrayRemove(user.uid) // remove user ID from the likedBy array
            });
            console.log(`Article ${articleID} unliked by ${user.uid}`);
        } catch (error) {
            console.error('Error in unlikeArticle: ', error);
        }
    };

    const unsaveArticle = async (articleID) => {
        try {
            const articleRef = doc(FireStore, "articles", articleID);
            await updateDoc(articleRef, {
                savedBy: arrayRemove(user.uid) // remove user ID from the savedBy array
            });
            console.log(`Article ${articleID} unsaved by ${user.uid}`);
        } catch (error) {
            console.error('Error in unsaveArticle: ', error);
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
                likeArticle,
                unlikeArticle,
                saveArticle,
                unsaveArticle,
                getArticleLikes,
                getSavedArticles,

            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};
