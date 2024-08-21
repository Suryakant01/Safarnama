import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase.context';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cards = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setURL(url))
    }, [firebase, props.imageURL])

    // console.log("props", props)
    return (

        <Card className='h-100' style={{ width: '18rem', }}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{props.place}</Card.Title>                
                <Card.Text>Experienced By:- {props.name}</Card.Text>
                <Card.Footer className="text-muted">{props.writtenOnDate}</Card.Footer>
                <Button variant="primary" onClick={() => navigate(props.link)}>Visit</Button>

            </Card.Body>
        </Card>
    );
}

export default Cards;