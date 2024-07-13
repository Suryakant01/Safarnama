import React from 'react'

import HeroSection from '../components/HeroSection.components'
import DestinationSection from '../components/Destination.componenets'
import ImageGallery from '../components/ImageGallery.components'


const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <DestinationSection />
            <ImageGallery />
        </div>
    )
}

export default HomePage
