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
        }, 5000);
    }, []);

    const fetchUserData = () => {
        setLoading(false);
    };

    return (
        <div>
            <HeroSection />
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
