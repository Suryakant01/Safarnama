import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from "../context/firebase.context"
import { useEffect, useState } from 'react';

const Cards = (props) => {
    const firebase = useFirebase();

    const [articles, setArticles] = useState([])

    useEffect(() => {
        firebase.getArticles().then((articles) => setArticles(articles.docs) )
    }, [firebase])

    articles.map((articles, index) => {
        console.log(articles.data())
    })
    const time = Date.UTC(2024,9,23)
    console.log("time", time)

    console.log("articles stored data", articles)
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