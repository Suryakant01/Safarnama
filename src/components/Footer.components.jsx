import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
// import { FaIconName } from 'react-icons/fa';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';


const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#112D58', color: 'white', padding: '20px 0', position: 'relative', bottom: 0, width: '100%' }}>
            <Container>
                <Row className="text-center">
                    <Col md={4}>
                        <h5>Safarnama</h5>
                        <p>Your ultimate travel companion.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <hr></hr>
                        <Nav className="flex-column">
                            <Nav.Link href="/" style={{ color: 'white' }}>Home</Nav.Link>
                            <Nav.Link href="/destination" style={{ color: 'white' }}>Destinations</Nav.Link>
                            <Nav.Link href="/gallery" style={{ color: 'white' }}>Gallery</Nav.Link>
                            <Nav.Link href="/contact" style={{ color: 'white' }}>Contact Us</Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={4}>
                        <h5>Follow Us</h5>
                        <div>
                            <a href="https://github.com/Suryakant01/Safarnama" style={{ color: 'white', marginRight: '15px' }}><FaGithub size={30} /></a>
                            <a href="https://twitter.com" style={{ color: 'white', marginRight: '15px' }}><FaTwitter size={30} /></a>
                            <a href="https://linkedin.com" style={{ color: 'white' }}><FaLinkedin size={30} /></a>
                        </div>
                    </Col>
                </Row>
                <Row className="text-center mt-3">
                    <Col>
                        <p>&copy; {new Date().getFullYear()} Safarnama. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
