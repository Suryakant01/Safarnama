// TravelCarousel.js
import React from 'react';
import { Carousel} from 'react-bootstrap';
import "../components/CSS/About.css"

const AboutComponent = () => {

  return (
    <div className='d-block w-100'>
        <Carousel interval={3000} fade={true}>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/images/CosouselImg4.jpg"
        alt="First slide"
      />
   
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/images/CorouselImg6.jpg"
        alt="Second slide"
      />
     
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/images/CorouselImg2.jpg"
        alt="Third slide"
      />
  
       
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/images/CorouselImg1.jpg"
        alt="Third slide"
      />
  
       
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/images/CorouselImg3.jpg"
        alt="Third slide"
      />
  
       
    </Carousel.Item>
  </Carousel>
    </div>
  );
};

export default AboutComponent;
