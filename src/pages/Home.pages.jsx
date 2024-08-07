import {React, useEffect, useState} from 'react'
import { useFirebase } from "../context/firebase.context"
import HeroSection from '../components/HeroSection.components'
import DestinationSection from '../components/Destination.componenets'
import Cards from '../components/Card.components'
import ImageGallery from '../components/ImageGallery.components'
import Write from '../components/Write.comonent'
import SkeletonLoader from '../components/SkeletonLoader.components'

import { CardGroup, Row, Col } from "react-bootstrap";


const HomePage = () => {

    const firebase = useFirebase();

    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([])


    useEffect(() => {
        // Simulate a data fetching
        setTimeout(() => {
            fetchUserData();
        }, 2500);
    }, []);

    const fetchUserData = () => {
        setLoading(false);
    };

    useEffect(() => {
        firebase.getArticles().then((articles) => setArticles(articles.docs))
    }, [firebase])
    
    // console.log(articles.data())
    return (
        <div>
            <HeroSection/>
            {loading ?
                ( <>
                    {
                        [...Array(6)].map((_, index) => (
                        <SkeletonLoader key={index} />
                        ))
                    }
                </>
                )
                :
                (
                    <CardGroup>
                        <h1 className='container mb-5' style={{ fontWeight: "bold" }}>DESTINATION</h1>
                        <Row>

                        
                            {articles.map((articles, index) => (
                                <Col key={articles.id} sm={12} md={6} lg={4} className="mb-4">
                                    <DestinationSection key={articles.id} title={articles.data().state} image={articles.data().imageURL} {...articles.data()} />
                                </Col>
                            ))}
                            </Row>
                    </CardGroup>                                    
                )
            }
            
            <ImageGallery/>
            <Write />
        </div>
    )
}

export default HomePage
