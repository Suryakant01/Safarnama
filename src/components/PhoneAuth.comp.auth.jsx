import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase.context.jsx";

const PhoneAuth = () => {

    const firebase = useFirebase();
    // const recap = firebase.setupRecaptcha();
    const [mobileNum, setMobileNum] = useState("");
    const [OTP, setOTP] = useState("");

    const sendOTP =  (e) => {
        e.preventDefault();
        console.log("phone num entered");
        firebase.setupRecaptcha();
         firebase.singInWithMobile(mobileNum);
    };

    const verifyOTP =  (e) => {
        e.preventDefault();
        console.log("otp entered");
         firebase.verifyOTP(OTP);
    };

    return (
        <div>
            <input
                type="text"
                value={mobileNum}
                onChange={(e) => setMobileNum(e.target.value)}
                placeholder="Enter mobile number"
            />
            <button onClick={sendOTP}>Send OTP</button>
            <div id="recaptcha-container"></div>
            <input
                type="text"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Enter OTP"
            />
            <button onClick={verifyOTP}>Verify OTP</button>
        </div>
    )
}

export default PhoneAuth;
