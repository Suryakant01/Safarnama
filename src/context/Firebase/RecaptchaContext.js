// RecaptchaContext.js
import React, { createContext, useState } from "react";
import { FirebaseAuth } from "./FirebaseConfig";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";

const RecaptchaContext = createContext(null);

export const RecaptchaProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        console.log("Recaptcha resolved");
                    },
                    "expired-callback": () => {
                        console.log("Recaptcha expired");
                    },
                },
                FirebaseAuth
            );
            window.recaptchaVerifier.render();
        }
    };

    const signInWithMobile = async (mobileNum) => {
        setupRecaptcha();
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

    const verifyOTP = (otp) => {
        window.confirmationResult.confirm(otp)
            .then((result) => {
                const user = result.user;
                setUser(user);
                console.log("User signed in with OTP");
            })
            .catch((error) => {
                console.log("OTP verification failed", error);
            });
    };

    return (
        <RecaptchaContext.Provider
            value={{ signInWithMobile, verifyOTP, setupRecaptcha }}
        >
            {children}
        </RecaptchaContext.Provider>
    );
};

export const useRecaptcha = () => React.useContext(RecaptchaContext);
