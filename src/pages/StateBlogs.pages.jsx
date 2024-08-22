import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Cards from '../components/Card.components';
import { useFirebase } from '../context/firebase.context';
import { CardGroup, Row, Col } from "react-bootstrap";
import SkeletonLoader from '../components/SkeletonLoader.components';

const StateBlogs = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [stateBlogs, setStateBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading

    useEffect(() => {
        firebase.getStateBlogs(params.states)
            .then((stateBlogs) => {
                setStateBlogs(stateBlogs.docs);
                setLoading(false); // Set loading to false once data is fetched
            });
    }, [firebase, params.states]);

    return (
        <>
            <h1 className="text-center my-4">All Blogs of {params.states}</h1>
            <CardGroup className="container">
                <Row className="container">
                    {loading
                        ? [...Array(6)].map((_, index) => (
                            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                                <SkeletonLoader />
                            </Col>
                        ))
                        : stateBlogs.map((stateBlog) => (
                            <Col key={stateBlog.id} sm={12} md={6} lg={4} className="mb-4">
                                <Cards 
                                    link={`${stateBlog.id}`} 
                                    image={stateBlog.data().imageURL} 
                                    {...stateBlog.data()} 
                                    className="h-100"
                                />
                            </Col>
                        ))
                    }
                </Row>
            </CardGroup>
        </>
    );
};

export default StateBlogs;
