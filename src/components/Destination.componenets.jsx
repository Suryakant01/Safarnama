import {React, useEffect, useState} from 'react'
import { useFirebase } from '../context/firebase.context';
import { useNavigate } from 'react-router-dom';
import { Card, CardGroup, Row, Col, Button } from "react-bootstrap";

const DestinationSection = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setURL(url))
    }, [firebase, props.imageURL])

    return (
        <>        
            <Card className='h-100' >
            <Card.Img variant="top" src={url} style={{ height: '200px', objectFit: 'cover' }} 
                    alt={props.state}/>
            <Card.Body>
                <Card.Title>{props.state}</Card.Title>
                <Button variant="primary" onClick={() => navigate(props.link)} >See More</Button>
            </Card.Body>
        </Card>

        </>
    )
}

export default DestinationSection
