import React from 'react'
import { Button, Container } from 'react-bootstrap'
import "./HeroSection.css"

const HeroSection = () => {
    const videoSource = "https://firebasestorage.googleapis.com/v0/b/bookify-59edc.appspot.com/o/Assests%2F3125396-uhd_3840_2160_25fps.mp4?alt=media&token=280f459a-5441-4577-a60d-dadc2d8d09a0";

    return (

        <div className="hero-container">
            {/* <div style={{ position: "relative" }}> */}
                <video className="hero-video" autoPlay loop muted>
                    <source src={videoSource} type='video/mp4' />
                </video>
            {/* </div> */}
            <div className="hero-content">
                <Container className="text-center" style={{ position: "relative", zIndex: "1" }}>
                    <h1 className="hero-title" style={{ fontWeight: "bold" }}>Explore. Dream. Discover</h1>
                    <h4 className="hero-subtitle">Uncovering Hidden Gems Around the World</h4>
                    <Button variant="outline-light" style={{  borderRadius: "20px" }}>Start Exploring &#8594;</Button>
                </Container>
            </div>
        </div>
    )
}

export default HeroSection
