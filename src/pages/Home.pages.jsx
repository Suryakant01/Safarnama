import { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase.context';
import HeroSection from '../components/HeroSection.components';
import DestinationSection from '../components/Destination.componenets';
import ImageGallery from '../components/ImageGallery.components';
import Write from '../components/Write.comonent';
import SkeletonLoader from '../components/SkeletonLoader.components';
import { CardGroup, Row, Col, Button } from 'react-bootstrap';

const HomePage = () => {
    const firebase = useFirebase();

    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [visibleArticles, setVisibleArticles] = useState(6); // State to control the number of displayed articles

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        firebase.getArticles().then((articles) => {
            setArticles(articles.docs);

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
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                const newIndex = { ...prevIndex };
                Object.keys(newIndex).forEach((state) => {
                    const stateArticles = articles.filter((article) => article.data().state === state);
                    if (stateArticles.length > 0) {
                        newIndex[state] = (newIndex[state] + 1) % stateArticles.length;
                    }
                });
                return newIndex;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [articles]);

    const loadMoreArticles = () => {
        setVisibleArticles((prev) => prev + 3); // Load 3 more articles
    };

    return (
        <>
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
                            {
                                Array.from(
                                    new Map(
                                        articles.map((article) => [
                                            article.data().state,
                                            article
                                        ])
                                    ).values()
                                )
                                .slice(0, visibleArticles) // Show only the number of articles specified by `visibleArticles`
                                .map((article) => {
                                    const state = article.data().state;
                                    const stateArticles = articles.filter((a) => a.data().state === state);
                                    const currentArticle = stateArticles[currentImageIndex[state]];
                                    return (
                                        <Col key={currentArticle.id} sm={12} md={6} lg={4} className='mb-4'>
                                            <DestinationSection
                                                link={`/blogs/${currentArticle.data().state}`}
                                                image={currentArticle.data().imageURL}
                                                {...currentArticle.data()}
                                            />
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </CardGroup>

                    {visibleArticles < articles.length && (
                        <div className='text-center my-4'>
                            <Button onClick={loadMoreArticles}>Load More</Button>
                        </div>
                    )}
                </>
            )}

            <ImageGallery />
            <Write />
        </>
    );
};

export default HomePage;
