import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import GoogleButton from 'react-google-button';
import "../components/CSS/LoginPage.css";
import { useFirebase } from "../context/firebase.context";
import Notification from "../components/Notifications.components";
// import Notification from "../components/Notification"; // Import the Notification component

const LoginPage = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate("/");
        }
    }, [firebase.isLoggedIn, navigate]);

    const registerAcc = () => {
        navigate("/register");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.signInUserWithEmail(email, password)
            .then(() => {
                setNotificationMessage("Wrong Email or Password")
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000)
            })


    };

    return (
        <div className="page">
            {/* Notification Component */}
            <Notification
                show={showNotification}
                message={notificationMessage}
                onClose={() => setShowNotification(false)}
                variant="danger"
            />

            {/* Email */}
            <div className="image-section">
                <img src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FLoginimg.png?alt=media&token=ad0351d8-3158-42d8-a436-22c409d9bdcb" alt="loginImg" className="login-image" />
            </div>
            <div className="form">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="formGroup" controlId="formBasicEmail">
                        <Form.Label className="email">Email address</Form.Label>
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Ready to Exchange Emails?"
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="password">Password</Form.Label>
                        <Form.Control
                            className="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="What's the Secret Code?"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>

                <div className="mb-3 d-flex flex-column">
                    <h2 className="mt-5 mb-2">Other Methods</h2>
                    <div className="mx-auto">
                        <GoogleButton onClick={firebase.signInWithGoogle} />
                    </div>
                </div>
                <h4 className="mt-5 mb-2">Don't have an Account?</h4>
                <Button
                    onClick={registerAcc}
                    variant="primary"
                    type="submit"
                    style={{ marginBottom: "20px", display: "inline" }}
                >
                    Register Account
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
