import React, { useState, useEffect } from 'react';
import './CSS/Preloader.css';  // We'll define the CSS styles next

const Preloader = () => {
    const [showText, setShowText] = useState(false);

    // Toggle between showing image and text
    useEffect(() => {
        const interval = setInterval(() => {
            setShowText((prevShowText) => !prevShowText);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);  // Cleanup interval on unmount
    }, []);

    return (
        <div className="preloader-container">
            {/* Display either the image or the text "myth" based on state */}
            {showText ? (
                <div className="myth-text fade-in-out">myth</div>
            ) : (
                <div className="photo fade-in-out">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/safarnama-c075f.appspot.com/o/Assets%2F6b1ea5b6-806c-4613-a751-26008c1ec62c.jpeg?alt=media&token=409b86e0-bd99-4bde-80c3-09b1ce5d9ec3" // Replace with your image URL
                        alt="Mine"
                        className="preloader-photo"
                    />
                </div>
            )}
        </div>
    );
};

export default Preloader;
