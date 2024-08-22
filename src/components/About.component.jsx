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
            src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FCosouselImg4.jpg?alt=media&token=f46399f4-f666-4095-a43f-76902aaa7d87"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={imageStyle}
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FCorouselImg6.jpg?alt=media&token=b41fab60-491d-48e9-94ae-2aeb453a1a35"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={imageStyle}
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FCorouselImg2.jpg?alt=media&token=6ebf75d6-0439-4582-83bf-4ed968d11ee5"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={imageStyle}
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FCorouselImg1.jpg?alt=media&token=f98f6fcd-15b8-4189-942e-e4fe9f645f4f"
            alt="Fourth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={imageStyle}
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FCorouselImg3.jpg?alt=media&token=8a981992-280d-48fe-bb97-0b17abac236e"
            alt="Fifth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default AboutComponent;
