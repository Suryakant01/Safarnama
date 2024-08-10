import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase.context';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";

const DestinationSection = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [url, setURL] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        setIsImageLoaded(false);  // Reset image loading status when imageURL changes
        firebase.getImageURL(props.imageURL).then((url) => {
            setURL(url);
        });
    }, [firebase, props.imageURL]);

    return (
        <>        
            <Card className='h-100'>
                <div
                    style={{
                        height: '200px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: '#f0f0f0',  // Background color for placeholder
                    }}
                >
                    {/* Placeholder image or loading indicator */}
                    {!isImageLoaded && (
                        <div
                            style={{
                                backgroundColor: '#898989',
                                height: '100%',
                                width: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }}
                        />
                    )}

                    {/* Actual image with smooth transition */}
                    <Card.Img
                        variant="top"
                        src={url}
                        alt={props.state}
                        onLoad={() => setIsImageLoaded(true)}
                        style={{
                            height: '200px',
                            objectFit: 'cover',
                            opacity: isImageLoaded ? 1 : 0,
                            transition: 'opacity 0.4s ease-in-out',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                        }}
                    />
                </div>
                <Card.Body>
                    <Card.Title>{props.state}</Card.Title>
                    <Button variant="primary" onClick={() => navigate(props.link)}>See More</Button>
                </Card.Body>
            </Card>
        </>
    );
};

export default DestinationSection;
