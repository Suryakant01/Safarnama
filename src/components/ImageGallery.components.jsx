import React from 'react';
import { Link } from 'react-router-dom';
import '../components/CSS/ImageGallery.css';

const ImageGallery = () => {
    return (
        <div className="image-gallery-container">

            <div className="images">
            <img src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FImage1.jpeg?alt=media&token=93a96786-78d2-4ae0-b12a-c71d9e0ec128" alt="taj mahal" className="image1" />
        <img src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FImage2.jpeg?alt=media&token=0fe8f434-b704-4dd6-a6b6-68ad7c82c5e2" alt="hawa mahal" className="image2" />
        <img src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2FImage3.jpeg?alt=media&token=16097468-04f7-46f6-a882-11ce55c03a93" alt="kerala" className="image3" />

            </div>

            <div className="text-section">

                <h2>IMAGE GALLERY</h2>
                <p>Something about the image gallery in 2-3 lines</p>
                <Link to={"/gallery"}>
                <button className="view-gallery-button" >VIEW IMAGE GALLERY &rarr;</button>
                </Link>

            </div>

        </div>
    );
};

export default ImageGallery;
