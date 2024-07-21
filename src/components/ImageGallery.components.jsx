import React from 'react';
import '../components/CSS/ImageGallery.css';

const ImageGallery = () => {
    return (
        <div className="image-gallery-container">

            <div className="images">
            <img src={`${process.env.PUBLIC_URL}/images/Image1.jpeg`} alt="taj mahal" className="image1" />
        <img src={`${process.env.PUBLIC_URL}/images/Image2.jpeg`} alt="hawa mahal" className="image2" />
        <img src={`${process.env.PUBLIC_URL}/images/Image3.jpeg`} alt="kerala" className="image3" />

            </div>

            <div className="text-section">

                <h2>IMAGE GALLERY</h2>
                <p>Something about the image gallery in 2-3 lines</p>
                <button className="view-gallery-button">VIEW IMAGE GALLERY &rarr;</button>

            </div>

        </div>
    );
};

export default ImageGallery;
