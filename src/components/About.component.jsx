import React from 'react';
import { Carousel } from 'react-bootstrap';

const AboutComponent = () => {
  const carouselStyle = {
    height: '100vh', // Set your desired height here
    overflow: 'hidden'
  };

  const imageStyle = {
    height: '100vh',
     // Ensure the image covers the carousel height
  };

  return (
    <div className='d-block w-100'>
      <Carousel style={carouselStyle} interval={3000} fade={true}>
        <Carousel.Item>
          <img
            style={imageStyle}
            className="d-block w-100"
            src="/images/CosouselImg4.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={imageStyle}
            className="d-block w-100"
            src="/images/CorouselImg6.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={imageStyle}
            className="d-block w-100"
            src="/images/CorouselImg2.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={imageStyle}
            className="d-block w-100"
            src="/images/CorouselImg1.jpg"
            alt="Fourth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={imageStyle}
            className="d-block w-100"
            src="/images/CorouselImg3.jpg"
            alt="Fifth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default AboutComponent;
