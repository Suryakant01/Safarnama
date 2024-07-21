import React from 'react'

import HeroSection from '../components/HeroSection.components'
import DestinationSection from '../components/Destination.componenets'
import ImageGallery from '../components/ImageGallery.components'
import Write from '../components/Write.comonent'

import { useFirebase } from '../context/firebase.context'


const HomePage = () => {

    const firebase = useFirebase();
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
