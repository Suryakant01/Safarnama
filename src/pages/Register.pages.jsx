import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button'
import Form from "react-bootstrap/Form";
import { useFirebase } from '../context/firebase.context';
import GoogleButton from 'react-google-button'

const RegisterPage = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("registraion success")
        const result = await firebase.signUpUserWithEmail(email, password);
        // console.log(result);
    }

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate("/")
        }
    }, [firebase.isLoggedIn, navigate])


    return (
        <div className='page'>
            <div className='image-section'>
                <img src={`${process.env.PUBLIC_URL}/images/Loginimg.png`} alt="loginImg" className='login-image' />
            </div>

            <div className="form">
                <Form onSubmit={handleSubmit} >

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="email">Email address</Form.Label>
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Ready to Exchange Emails?"
                        />
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
                    <h6 style={{cursor: "pointer", color: "navy"}} onClick={() => navigate("/login")} >Already have an Account?</h6>
                    <Button className='mt-4' variant="primary" type="submit">
                        Register
                    </Button>
                </Form>

                <div className='mb-3 d-flex flex-column '>
                    <h2 className="p-2 mt-5 mb-3">Or Save Your Time?</h2>
                    <div className='mx-auto'>
                        <GoogleButton
                            onClick={firebase.signInWithGoogle}
                        />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default RegisterPage
