// AuthContext.js
import React, { useEffect, useState, createContext } from "react";
import { FirebaseAuth, googleAuth } from "./FirebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, (user) => {
            setUser(user ? user : null);
        });
    }, []);

    const signInWithGoogle = () => signInWithPopup(FirebaseAuth, googleAuth);

    const signUpUserWithEmail = (email, pass) =>
        createUserWithEmailAndPassword(FirebaseAuth, email, pass);

    const signInUserWithEmail = (email, pass) =>
        signInWithEmailAndPassword(FirebaseAuth, email, pass);

    const logout = () => signOut(FirebaseAuth);

    var isLoggedIn = user ? true : false

    return (
        <AuthContext.Provider
            value={{
                user,
                signUpUserWithEmail,
                signInUserWithEmail,
                signInWithGoogle,
                isLoggedIn,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
