import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

import brandImage from "../Assests/flight.png";


const MyNavbar = () => {

    return (

        <Navbar style={{ backgroundColor: '#112D58' }} data-bs-theme="dark" sticky="top" collapseOnSelect expand="md">
            <Container className="d-flex justify-content-between">
                <Navbar.Brand href="/"><img
                    src={brandImage}
                    height="30"
                    className="d-inline-block align-top my-100px"
                    alt="safarnama"
                />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto ">
                        <Nav.Link href="/">Destination</Nav.Link>
                        <Nav.Link href="/">Gallery</Nav.Link>
                        <Nav.Link href="/">Write</Nav.Link>
                    </Nav>
                        <Button variant="outline-light" style={{height: "38px"}}>Login/Singin</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar >


    )

}

export default MyNavbar;