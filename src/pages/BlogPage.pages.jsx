import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/firebase.context';
import { Container, Image, Row, Col } from 'react-bootstrap';

const BlogPage = () => {
    const params = useParams();
    const firebase = useFirebase();
    const [blog, setBlog] = useState(null);

    console.log(params)
    useEffect(() => {
        
        firebase.getPlaceBlog(params.place).then((doc) => {
            if (doc.exists) {
                setBlog(doc.data());
            }
        });
    }, [firebase, params.place]);

    if (!blog) {
        return <p>Loading...</p>; // Show a loading message while fetching the blog
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={8}>
                    <h1 className="mt-5" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                        {blog.place}
                    </h1>

                    <div className="d-flex align-items-center my-4">
                        <Image
                            src={blog.profilPic}
                            roundedCircle
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            alt={blog.name}
                        />
                        <div className="ms-3">
                            <h5 style={{ margin: 0 }}>{blog.name}</h5>
                            <p style={{ margin: 0, color: 'gray' }}>{new Date(blog.writtenOnDate).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <Image
                        src={blog.writtenOnDate}
                        fluid
                        style={{ width: '100%', height: 'auto', marginBottom: '2rem', borderRadius: '10px' }}
                        alt={blog.title}
                    />

                    <article style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                        {blog.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} style={{ marginBottom: '1.5rem' }}>
                                {paragraph}
                            </p>
                        ))}
                    </article>
                </Col>
            </Row>
        </Container>
    );
};

export default BlogPage;
