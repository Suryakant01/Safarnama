import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import GoogleButton from 'react-google-button'
import "../components/CSS/LoginPage.css";
import { useFirebase } from "../context/firebase.context";


const LoginPage = () => {
    
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");


    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate("/")
        }
    }, [firebase.isLoggedIn, navigate])

    const registerAcc = () => {
        navigate("/register");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("signing in");

        const result = await firebase.singInWithEmailLink(email);
    };



    return (
        <div className="page">
            {/* Email */}
            <div className='image-section'>
                <img src={`${process.env.PUBLIC_URL}/images/Loginimg.png`} alt="loginImg" className='login-image' />
            </div>
            <div className="form">
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="formGroup" controlId="formBasicEmail">
                        <Form.Label className="email">Email address</Form.Label>
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter email"
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>

                <div className="mb-3 d-flex flex-column">
                <h2 className="mt-5 mb-2">Other Methods</h2>
                <div className='mx-auto'>
                        <GoogleButton
                            onClick={firebase.signInWithGoogle}
                        />
                    </div>
                    </div>
                <h4 className="mt-5 mb-2">Don't have an Account?</h4>
                <Button onClick={registerAcc} variant="primary" type="submit" style={{ marginBottom: "20px", display: "inline" }}>
                    Register Account
                </Button>
            </div>

        </div>

    );
};

export default LoginPage;
