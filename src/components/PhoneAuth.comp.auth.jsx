import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-number-input"
import { useFirebase } from "../context/firebase.context.jsx";

const PhoneAuth = () => {

    const firebase = useFirebase();
    // const recap = firebase.setupRecaptcha();
    const [mobileNum, setMobileNum] = useState("");
    const [OTP, setOTP] = useState("");
    const [result, setResult] = useState("");

    const sendOTP = async (e) => {
        e.preventDefault();
        console.log("phone num entered", mobileNum);

        try {
            const resp = await firebase.setupRecaptcha(mobileNum);
            setResult(resp)
            console.log("resp", resp)
        } catch (error) {
            console.log("cpatch fail")
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        try {

            await result.confirm(OTP)
            console.log("success in otp verification")
        } catch (error) {
            console.log("error in otp verification")
        }
    }

    return (
        <>
            
            {/* OTP Send */}
            <Form onSubmit={sendOTP} >
                <Form.Group className="mb-3" controlId="formPhoneNum">
                    <PhoneInput style={{ height: " 50px", width: "50px" }}
                        defaultCountry="IN"
                        value={mobileNum}
                        onChange={setMobileNum}
                        placeholder="number"
                    />
                    <div id="recaptcha-container" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    send otp
                </Button>
            </Form>

            
            {/* OTP Verify */}
            <Form onSubmit={verifyOTP} >
                <Form.Group className="mb-3" controlId="formOTP">
                    <Form.Control
                        type="otp"
                        placeholder="Enter OTP"
                        onChange={(e) => setOTP(e.target.value)}
                    />
                    
                </Form.Group>

                <Button variant="primary" type="submit">
                    Verify
                </Button>
            </Form>
        </>

    )
}

export default PhoneAuth;
