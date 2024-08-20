// FirebaseProvider.js
import React from "react";
import { AuthProvider } from "./AuthContext";
import { FirestoreProvider } from "./FirestoreContext";
import { StorageProvider } from "./StorageContext";
import { RecaptchaProvider } from "./RecaptchaContext";

const FirebaseProvider = ({ children }) => {
    return (
        <AuthProvider>
            <FirestoreProvider>
                <StorageProvider>
                    <RecaptchaProvider>{children}</RecaptchaProvider>
                </StorageProvider>
            </FirestoreProvider>
        </AuthProvider>
    );
};

export default FirebaseProvider;
