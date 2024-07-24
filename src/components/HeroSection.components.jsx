import React from 'react'
import { Button, Container } from 'react-bootstrap'
import "../components/CSS/HeroSection.css"

const HeroSection = () => {
    const videoSource = "https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FtravelVideo.mp4?alt=media&token=253087a6-9e38-4acb-ba81-74617f958810";

    return (

        <div className="hero-container">
                <video className="hero-video" autoPlay loop muted>
                    <source src={videoSource} type='video/mp4' />
                </video>
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
