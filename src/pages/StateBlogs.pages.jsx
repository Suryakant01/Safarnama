import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Cards from '../components/Card.components'
import { useFirebase } from '../context/firebase.context'
import { CardGroup, Row, Col } from "react-bootstrap";

const StateBlogs = (props) => {
    const params = useParams();
    const firebase = useFirebase();

    const [stateBlogs, setStateBlogs] = useState([])

    useEffect(() => {
        firebase.getStateBlogs(params.states)
            .then((stateBlogs) => setStateBlogs(stateBlogs.docs))
    }, [firebase, params.states])
    
    // console.log("params", params)
    // console.log("stateblogs", stateBlogs.docs)

    return (
        <>
            <h1>All Blogs of {params.states} </h1>
            <CardGroup className='container'>
                <Row className='container'>
                    {stateBlogs.map((stateBlogs) => (
                        <Col key={stateBlogs.id} sm={12} md={6} lg={4} className="mb-4">
                            <Cards link={`${stateBlogs.id}`} image={stateBlogs.data().imageURL} {...stateBlogs.data()} />
                        </Col>
                    ))}
                </Row>
            </CardGroup>
        </>
    )
}

export default StateBlogs
