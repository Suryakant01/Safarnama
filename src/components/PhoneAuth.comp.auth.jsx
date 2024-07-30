import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-number-input"
import { useFirebase } from "../context/firebase.context.jsx";

const PhoneAuth = () => {
    const firebase = useFirebase();

    const { signInWithMobile, verifyOTP } = useFirebase();
    const [mobileNum, setMobileNum] = useState('');
    const [otp, setOtp] = useState('');

    const handleSendOTP = async () => {
         firebase.signInWithMobile(mobileNum);
    };

    const handleVerifyOTP = async () => {
        await firebase.verifyOTP(otp);
    };

    return (
        <div>
            <input
                type="text"
                value={mobileNum}
                onChange={(e) => setMobileNum(e.target.value)}
                placeholder="Enter mobile number"
            />
            <button id="send-otp-button" onClick={handleSendOTP}>Send OTP</button>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
            />
            <button id="verify-otp-button" onClick={handleVerifyOTP}>Verify OTP</button>
            {/* Placeholder for reCAPTCHA widget */}
            <div id="recaptcha-container"></div>
        </div>
    );

    // const firebase = useFirebase();
    // // const recap = firebase.setupRecaptcha();
    // const [mobileNum, setMobileNum] = useState("");
    // const [OTP, setOTP] = useState("");
    // const [result, setResult] = useState("");

    // const sendOTP = async (e) => {
    //     e.preventDefault();
    //     console.log("phone num entered", mobileNum);

    //     try {
    //         const resp = await firebase.setupRecaptcha(mobileNum);
    //         setResult(resp)
    //         console.log("resp", resp)
    //     } catch (error) {
    //         console.log("cpatch fail")
    //     }
    // };

    // const verifyOTP = async (e) => {
    //     e.preventDefault();
    //     // try {

    //         // await result.confirm(OTP)
    //         await firebase.verifyOTP(OTP)
    //         console.log("success in otp verification")
    //     // } catch (error) {
    //     //     console.log("error in otp verification")
    //     // }
    // }

    // return (
    //     <>
            
    //         {/* OTP Send */}
    //         <Form onSubmit={sendOTP} >
    //             <Form.Group className="mb-3" controlId="formPhoneNum">
    //                 <PhoneInput style={{ height: " 50px", width: "50px" }}
    //                     defaultCountry="IN"
    //                     value={mobileNum}
    //                     onChange={setMobileNum}
    //                     placeholder="number"
    //                 />
    //                 <div id="recaptcha-container" />
    //             </Form.Group>

    //             <Button variant="primary" type="submit">
    //                 send otp
    //             </Button>
    //         </Form>

            
    //         {/* OTP Verify */}
    //         <Form onSubmit={verifyOTP} >
    //             <Form.Group className="mb-3" controlId="formOTP">
    //                 <Form.Control
    //                     type="otp"
    //                     placeholder="Enter OTP"
    //                     onChange={(e) => setOTP(e.target.value)}
    //                 />
                    
    //             </Form.Group>

    //             <Button variant="primary" type="submit">
    //                 Verify
    //             </Button>
    //         </Form>
    //     </>

    // )
}

export default PhoneAuth;
