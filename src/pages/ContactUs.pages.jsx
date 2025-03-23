import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import "../components/CSS/ContactUs.css";

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = encodeURIComponent(`New contact form submission from ${name}`);
        const body = encodeURIComponent(`Message: ${message}\n\nFrom: ${name}\nEmail: ${email}`);
        const mailtoLink = `mailto:satyya1634@gmail.com?subject=${subject}&body=${body}`;
        console.log(mailtoLink); // Debugging line
        window.location.href = mailtoLink;
    };

    return (
        <Container className="contact-us">
            <h1 className="text-center mb-5">Contact Us</h1>

            <Form className='mb-5' onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>

            <Row>
                <Col md={6} className="contact-person">
                    <div className="contact-card">
                        <img src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2F6b1ea5b6-806c-4613-a751-26008c1ec62c.jpeg?alt=media&token=409b86e0-bd99-4bde-80c3-09b1ce5d9ec3" alt="Person 1" className="contact-photo" />
                        <div className="contact-details">
                            <h4>Suryakant</h4>
                            <div className="social-icons">
                                <a href="https://x.com/_iamsatyam_" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} /></a>
                                <a href="https://www.linkedin.com/in/suryakant-yadav-6192a224a" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} /></a>
                                <a href="https://github.com/Suryakant01" target="_blank" rel="noopener noreferrer"><FaGithub size={30} /></a>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={6} className="contact-person">
                    <div className="contact-card">
                        <img src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FigCBxrc3_400x400.jpg?alt=media&token=6f270e9c-c01c-4f18-8fb2-235ed8686645" alt="Person 2" className="contact-photo" />
                        <div className="contact-details">
                            <h4>Shubhi</h4>
                            <div className="social-icons">
                                <a href="https://x.com/_" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} /></a>
                                <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} /></a>
                                <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><FaGithub size={30} /></a>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactUs;
