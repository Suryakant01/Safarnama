// src/Gallery.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../components/CSS/Gallery.css';

const Gallery = () => {
    return (
        <Container className="mt-4">
            <div className="text-center mb-4">
                <h1>Explore INDIA from our Gallery</h1>
            </div>
            <h2>Image Gallery</h2>
            <div>line ki image hogi yha</div>
            <Row>
                <Col md={4} className="mb-4">
                    <img src="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" alt="Image-1" className="img-fluid" />
                </Col>
                <Col md={4} className="mb-4">
                    <img src="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" alt="Image-2" className="img-fluid" />
                </Col>
                <Col md={4} className="mb-4">
                    <img src="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" alt="Image-3" className="img-fluid" />
                </Col>
            </Row>
            <Row>
                <Col md={4} className="mb-4">
                    <img src="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" alt="Image-4" className="img-fluid" />
                </Col>
                <Col md={4} className="mb-4">
                    <img src="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" alt="Image-5" className="img-fluid" />
                </Col>
                <Col md={4} className="mb-4">
                    <img src="https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/uploads%2Fbooks%2FcoverPic%2F1719687831942-IMG20240104065917.jpg?alt=media&token=ab9a1196-203a-44ce-843e-2b0fe6834b9e" alt="Image-6" className="img-fluid" />
                </Col>
            </Row>
        </Container>
    );
};

export default Gallery;
