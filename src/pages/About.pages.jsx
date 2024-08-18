import React from "react";
import AboutComponent from "../components/About.component";
import { Container, Row, Col } from "react-bootstrap";

function About() {
    return (
        <div className="container">

            <AboutComponent />
            <Container className="bg">
                <row>
                    <h1>About Us</h1>
                    <p>
                        Welcome to Banajara, your ultimate travel companion! At Banajara, we
                        believe that every journey is made richer by the stories and
                        experiences of those who have walked the path before. Our platform
                        allows you to search for your dream travel destinations and discover
                        insightful blogs written by seasoned travelers. Whether you're
                        looking for hidden gems, practical tips, or simply inspiration for
                        your next adventure, Banajara connects you with a community of
                        explorers who share their firsthand experiences. Enhance your travel
                        plans with authentic insights and make your journeys unforgettable
                        with Banajara.
                    </p>
                </row>
            </Container>


        </div>
    );
}

export default About;
