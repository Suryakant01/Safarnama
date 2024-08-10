import { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase.context';
import HeroSection from '../components/HeroSection.components';
import DestinationSection from '../components/Destination.componenets';
import Cards from '../components/Card.components';
import ImageGallery from '../components/ImageGallery.components';
import Write from '../components/Write.comonent';
import SkeletonLoader from '../components/SkeletonLoader.components';
import { CardGroup, Row, Col } from 'react-bootstrap';

const HomePage = () => {
    const firebase = useFirebase();

    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    useEffect(() => {

        //simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 2500);

        firebase.getArticles().then((articles) => {
            setArticles(articles.docs);

            // Initialize currentImageIndex with first image for each state
            const initialImageIndex = {};
            articles.docs.forEach((article) => {
                const state = article.data().state;
                if (!initialImageIndex[state]) {
                    initialImageIndex[state] = 0;
                }
            });
            setCurrentImageIndex(initialImageIndex);
        });
    }, [firebase]);

    useEffect(() => {
        // Automatically cycle through images every 5 seconds
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                const newIndex = { ...prevIndex };
                Object.keys(newIndex).forEach((state) => {
                    const stateArticles = articles.filter((article) => article.data().state === state);
                    newIndex[state] = (newIndex[state] + 1) % stateArticles.length;
                });
                return newIndex;
            });
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [articles]);

    return (
        <div>
            <HeroSection />
            {loading ? (
                <>
                    {[...Array(6)].map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))}
                </>
            ) : (
                <>
                    <h1 className='container mb-5' style={{ fontWeight: 'bold' }}>DESTINATION</h1>
                    <CardGroup className='container'>
                        <Row className='container'>
                            {Array.from(
                                new Map(
                                    articles.map((article) => [
                                        article.data().state,
                                        article
                                    ])
                                ).values()
                            ).map((article) => {
                                const state = article.data().state;
                                const stateArticles = articles.filter((a) => a.data().state === state);
                                const currentArticle = stateArticles[currentImageIndex[state]];

                                return (
                                    <Col key={currentArticle.id} sm={12} md={6} lg={4} className='mb-4'>
                                        <DestinationSection
                                            key={currentArticle.id}
                                            link={`/blogs/${currentArticle.data().state}`}
                                            image={currentArticle.data().imageURL}
                                            {...currentArticle.data()}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </CardGroup>
                </>
            )}

            <ImageGallery />
            <Write />
        </div>
    );
};

export default HomePage;
