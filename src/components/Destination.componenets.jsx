import {React, useEffect, useState} from 'react'
import { useFirebase } from '../context/firebase.context';
import Cards from './Card.components'
import { Card, CardGroup, Row, Col, Button } from "react-bootstrap";

const DestinationSection = (props) => {
    const firebase = useFirebase();

    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setURL(url))
    }, [firebase, props.imageURL])

    return (
        <div className='container'>
            {/* <h1 className='mt-5 mb-5' style={{ fontWeight: "bold" }}>DESTINATION</h1> */}

            <Card className='container mr-0 pr-0' style={{ width: '18rem', }}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{props.state}</Card.Title>
                <Button variant="primary">See More</Button>

            </Card.Body>
        </Card>

            {/* <Button variant="outline-light" style={{ backgroundColor: "#112D58", height: "9vh", width: "27vh", fontWeight: "bold", borderRadius: "20px" }} className='mb-4 mt-4'>More Destination &#8594;</Button> */}
        </div>
    )
}

export default DestinationSection
