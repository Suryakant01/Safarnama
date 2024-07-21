import React from 'react'

import HeroSection from '../components/HeroSection.components'
import DestinationSection from '../components/Destination.componenets'
import ImageGallery from '../components/ImageGallery.components'
import Write from '../components/Write.comonent'


const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <DestinationSection />
            <ImageGallery />
            <Write />
        </div>
    )
}

export default HomePage
