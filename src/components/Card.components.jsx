import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase.context';
import { useEffect, useState } from 'react';

const Cards = (props) => {
    const firebase = useFirebase();

    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setURL(url))
    }, [firebase])

    console.log("props", props)
    return (

        <Card className='container mr-0 pr-0' style={{ width: '18rem', }}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>                
                <Card.Text>{props.name}</Card.Text>
                <Card.Footer className="text-muted">{props.writtenOnDate}</Card.Footer>
                <Button variant="primary">Visit</Button>

            </Card.Body>
        </Card>
    );
}

export default Cards;