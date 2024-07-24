import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Cards = (props) => {
    return (
        <Card className='container mr-0 pr-0' style={{ width: '18rem',}}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                
                <Button variant="primary">Visit</Button>

            </Card.Body>
        </Card>
    );
}

export default Cards;