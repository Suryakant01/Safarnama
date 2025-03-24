import React, { useState } from "react";
import { useFirebase } from "../context/firebase.context";
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for conditional rendering
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
import brandImage from "../Assests/flight.png";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false); // State to handle hover

    const navigateToLoginPage = () => {
        navigate("/login");
    };

    return (
        <Navbar style={{ backgroundColor: '#112D58' }} data-bs-theme="dark" sticky="top" collapseOnSelect expand="md">
            <Container className="d-flex justify-content-between">
                <Navbar.Brand href="/">
                    {/* Motion div to wrap logo for animation */}
                    <motion.div
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <AnimatePresence>
                            {!isHovered ? (
                                <motion.img
                                    src={brandImage}
                                    height="30"
                                    className="d-inline-block align-top my-100px"
                                    alt="safarnama"
                                    initial={{ scale: 1, rotate: 0, opacity: 1 }}
                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                    whileHover={{ scale: 1.2, rotate: 360, opacity: 0 }} // Reduce opacity to transition to text
                                    exit={{ opacity: 0, scale: 0.8 }} // Smoothly fade out
                                    transition={{
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 30,
                                        duration: 0.5
                                    }}
                                    key="logo"
                                />
                            ) : (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ fontSize: '24px',  color: '#FFFFFF' }}
                                    key="text"
                                >
                                    Myth
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="/" style={{ fontWeight: "bold" }}>Home</Nav.Link>
                        <Nav.Link href="/destination" style={{ fontWeight: "bold" }}>Destination</Nav.Link>
                        <Nav.Link href="/gallery" style={{ fontWeight: "bold" }}>Gallery</Nav.Link>
                        <Nav.Link href="/blog" style={{ fontWeight: "bold" }}>Write</Nav.Link>
                        <Nav.Link href="/about" style={{ fontWeight: "bold" }}>About</Nav.Link>

                        <Nav.Link href="/contact-us" style={{ fontWeight: "bold" }}>Contact Us</Nav.Link>
                        <Nav.Link href="saved-blogs" style={{ fontWeight: "bold" }}>My Preciouss</Nav.Link>

                    </Nav>

                    {firebase.isLoggedIn ? (
                        <Button onClick={firebase.logout} variant="outline-light" style={{ height: "38px", fontWeight: "bold", borderRadius: "20px" }}>
                            Logout
                        </Button>
                    ) : (
                        <Button onClick={navigateToLoginPage} variant="outline-light" style={{ height: "38px", fontWeight: "bold", borderRadius: "20px" }}>
                            Login
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
