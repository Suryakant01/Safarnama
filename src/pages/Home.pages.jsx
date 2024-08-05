import {React, useEffect, useState} from 'react'

import HeroSection from '../components/HeroSection.components'
import DestinationSection from '../components/Destination.componenets'
import ImageGallery from '../components/ImageGallery.components'
import Write from '../components/Write.comonent'
import SkeletonLoader from '../components/SkeletonLoader.components'


const HomePage = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a data fetching
        setTimeout(() => {
            fetchUserData();
        }, 2000);
    }, []);

    const fetchUserData = () => {
        setLoading(false);
    };

    return (
        <div>
            <HeroSection 
                mediaSource="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FtravelVideo.mp4?alt=media&token=253087a6-9e38-4acb-ba81-74617f958810"
                mediaType="video"
                title="Explore. Dream. Discover"
                subtitle="Uncovering Hidden Gems Around the World"
                buttonText="Start Exploring"

            />
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
                    <DestinationSection />                    
                    )
            }
            
            <ImageGallery />
            <Write />
        </div>
    )
}

export default HomePage
