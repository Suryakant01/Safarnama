import React from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import "../components/CSS/ContactUs.css"

const ContactUs = () => {
    return (
        <Container className="contact-us">
            <h1 className="text-center mb-5">Contact Us</h1>

            {/* Contact Form */}
            <Form className="mb-5">
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>

            {/* Contact Sections */}
            <Row>
                <Col md={6} className="contact-person">
                    <div className="contact-card">
                        <img src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2F79011dcca5aaa78c13b0e0c9245e0aa0%201.png?alt=media&token=90e817e9-a05f-46d8-8816-5cc44d2f3334" alt="Person 1" className="contact-photo" />
                        <div className="contact-details">
                            <h4>Person 1</h4>
                            <div className="social-icons">
                                <a href="https://twitter.com/person1"><FaTwitter size={30} /></a>
                                <a href="https://linkedin.com/in/person1"><FaLinkedin size={30} /></a>
                                <a href="https://github.com/person1"><FaGithub size={30} /></a>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={6} className="contact-person">
                    <div className="contact-card">
                        <img src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2F79011dcca5aaa78c13b0e0c9245e0aa0%201.png?alt=media&token=90e817e9-a05f-46d8-8816-5cc44d2f3334" alt="Person 2" className="contact-photo" />
                        <div className="contact-details">
                            <h4>Person 2</h4>
                            <div className="social-icons">
                                <a href="https://twitter.com/person2"><FaTwitter size={30} /></a>
                                <a href="https://linkedin.com/in/person2"><FaLinkedin size={30} /></a>
                                <a href="https://github.com/person2"><FaGithub size={30} /></a>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactUs;
