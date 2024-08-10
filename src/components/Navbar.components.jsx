import React from "react";
import { useFirebase } from "../context/firebase.context";
import { motion } from 'framer-motion';
import NavLink from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Button } from "react-bootstrap";

import brandImage from "../Assests/flight.png";
import { useNavigate } from "react-router-dom";


const MyNavbar = () => {

    const firebase = useFirebase();
    const navigate = useNavigate()

    const navigateToLoginPage = () => {
        navigate("/login")
    }

    return (

        <Navbar style={{ backgroundColor: '#112D58' }} data-bs-theme="dark" sticky="top" collapseOnSelect expand="md">
            <Container className="d-flex justify-content-between">
                <Navbar.Brand href="/">
                    <motion.img
                        src={brandImage}
                        height="30"
                        className="d-inline-block align-top my-100px"
                        alt="safarnama"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{
                            scale: 0.8,
                            rotate: 360,
                            borderRadius: "100%"
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 30,
                        }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto ">
                        <Nav.Link href="/" style={{ fontWeight: "bold" }}>Home</Nav.Link>
                        <Nav.Link href="/destination" style={{ fontWeight: "bold" }}>Destination</Nav.Link>
                        <Nav.Link href="/gallery" style={{ fontWeight: "bold" }}>Gallery</Nav.Link>
                        <Nav.Link href="/blog" style={{ fontWeight: "bold" }}>Write</Nav.Link>
                        <Nav.Link href="/about" style={{ fontWeight: "bold" }}>About</Nav.Link>
                        <Nav.Link href="/contact" style={{ fontWeight: "bold" }}>Contact Us</Nav.Link>

                    </Nav>

                    {firebase.isLoggedIn ?
                        <Button onClick={firebase.logout} variant="outline-light" style={{ height: "38px", fontWeight: "bold", borderRadius: "20px" }}>
                            Logout
                        </Button>
                        :
                        <Button onClick={navigateToLoginPage} variant="outline-light" style={{ height: "38px", fontWeight: "bold", borderRadius: "20px" }}>
                            Login
                        </Button>
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar >


    )

}

export default MyNavbar;