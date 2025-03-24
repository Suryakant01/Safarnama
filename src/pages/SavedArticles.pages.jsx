import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase.context";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SavedArticles = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [savedArticles, setSavedArticles] = useState([]);
    const [articlesData, setArticlesData] = useState([]);

    useEffect(() => {
        if (firebase.user) {
            // Fetch saved article IDs
            const unsubscribe = firebase.getSavedArticles(firebase.user.uid, (articles) => {
                setSavedArticles(articles);
            });

            // Clean up the listener on component unmount
            return () => unsubscribe();
        }
    }, [firebase]);

    useEffect(() => {
        // Fetch full article details for saved article IDs
        const fetchArticleData = async () => {
            const articlePromises = savedArticles.map(async (articleID) => {
                const articleData = await firebase.getPlaceBlogId(articleID);
                return { id: articleID, ...articleData };
            });

            const articles = await Promise.all(articlePromises);
            setArticlesData(articles);
        };

        if (savedArticles.length > 0) {
            fetchArticleData();
        } else {
            setArticlesData([]); // Clear articlesData if no saved articles
        }
    }, [firebase, savedArticles]);

    return (
        <Container>
            <h1>Saved Articles</h1>
            <Row>
                {articlesData.length === 0 ? (
                    <p>No saved articles found.</p>
                ) : (
                    articlesData.map((article) => (
                        <Col key={article.id} md={4}>
                            <Card className="h-100" style={{ width: "18rem" }}>
                                <Card.Img variant="top" src={article.imageURL} alt={article.place} />
                                <Card.Body>
                                    <Card.Title>{article.place}</Card.Title>
                                    <Card.Text>Experienced By: {article.name}</Card.Text>
                                    <Card.Footer className="text-muted">{article.writtenOnDate}</Card.Footer>
                                    <Button variant="primary" onClick={() => navigate(`/article/${article.id}`)}>
                                        Read More
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default SavedArticles;
