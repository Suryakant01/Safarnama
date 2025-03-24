import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase.context';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cards = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [url, setURL] = useState(null);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        // Fetch image URL
        firebase.getImageURL(props.imageURL).then((url) => setURL(url));

        // Set up real-time listener for likes count
        const unsubscribe = firebase.getArticleLikes(props.id, (currentLikes) => {
            setLikes(currentLikes);
        });

        // Clean up the listener on unmount
        return () => unsubscribe();
    }, [firebase, props.imageURL, props.id]);

    const handleLike = () => {
        firebase.likeArticle(props.id);
    };

    return (
        <Card className='h-100' style={{ width: '18rem' }}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{props.place}</Card.Title>
                <Card.Text>Experienced By: {props.name}</Card.Text>
                <Card.Footer className="text-muted">{props.writtenOnDate}</Card.Footer>

                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <Button variant="primary" onClick={() => navigate(props.link)}>Visit</Button>
                    <div className="d-flex align-items-center">
                        <div onClick={handleLike}>
                            <img
                                style={{ height: "20px", width: "20px", marginRight: "10px", cursor: "pointer" }}
                                src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FLikeEmptyy.png?alt=media&token=9f1f453f-6eca-4525-b788-30169be76066"
                                alt="Like"
                            />
                            <span>{likes}</span> {/* Display the likes count */}
                        </div>
                        <div onClick={() => firebase.saveArticle(props.id)}>
                            <img
                                style={{ height: "20px", width: "20px", cursor: "pointer" }}
                                src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FbookmarkEmpty.png?alt=media&token=789c03dd-f37c-4e49-abb9-ccae7eb8c7d5"
                                alt="Save"
                            />
                        </div>
                    </div>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default Cards;
 