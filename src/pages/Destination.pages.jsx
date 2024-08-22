import { React, useState, useEffect } from 'react';
import { useFirebase } from "../context/firebase.context";
import { Container, CardGroup, Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import searchIcon from "../Assests/search.png";
import Cards from '../components/Card.components';
import SkeletonLoader from '../components/SkeletonLoader.components';

const DestinationPage = () => {
    const firebase = useFirebase();

    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [displayedArticles, setDisplayedArticles] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        // Simulate a data fetching
        setTimeout(() => {
            fetchUserData();
        }, 2500);
    }, []);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const articlesSnapshot = await firebase.getArticles();
            const articlesData = articlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setArticles(articlesData);
            setDisplayedArticles(articlesData.slice(0, 12)); // Show only 12 initially
        } catch (error) {
            console.error("Error fetching articles: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        const nextArticles = articles.slice(displayedArticles.length, displayedArticles.length + 3);
        setDisplayedArticles([...displayedArticles, ...nextArticles]);
        if (displayedArticles.length + nextArticles.length >= articles.length) {
            setShowMore(false); // Hide the button if no more articles are available
        }
    };

    const bgImg = "https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2F79011dcca5aaa78c13b0e0c9245e0aa0%201.png?alt=media&token=90e817e9-a05f-46d8-8816-5cc44d2f3334";

    const heroStyle = {
        background: `url(${bgImg}) no-repeat center center/cover`,
        color: 'black',
        height: '100vh',
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const textStyle = {
        textAlign: 'center'
    };

    return (
        <>
            <div style={heroStyle}>
                <Container className="d-flex flex-column justify-content-center align-items-center h-100">
                    <Row>
                        <Col style={textStyle}>
                            <h1 className="display-3" style={{ fontWeight: "bold" }}>SEARCH YOUR NEXT TRAVEL</h1>
                            <h1 className="display-3" style={{ fontWeight: "bold" }}>Destination</h1>

                            <InputGroup className="mb-3" size="lg" style={{ width: '840px' }}>
                                <Form.Control
                                    placeholder="Enter Your Destination"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    <img src={searchIcon} alt="Search" style={{ width: '28px', height: '28px' }} />
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </div>

            {loading ? (
                <>
                    {[...Array(12)].map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))}
                </>
            ) : (
                <>
                    <CardGroup>
                        <Row>
                            {displayedArticles.map(article => (
                                <Col key={article.id} sm={12} md={6} lg={4} className="mb-4">
                                    <Cards
                                        title={article.state}
                                        image={article.imageURL}
                                        {...article}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </CardGroup>

                    {articles.length > displayedArticles.length && (
                        <div className="text-center mb-4">
                            <Button onClick={handleLoadMore} variant="primary">
                                Load More
                            </Button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default DestinationPage;
