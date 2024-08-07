import React from 'react';
import { Link } from 'react-router-dom';
import '../components/CSS/WriteSection.css';

const Write = () => {
    return (
        <div className='write-blog-container'>
            <div className='text-section'>
                <h1>Want to tell about your journey??</h1>
                <Link to="/blog">
                    <button className='write-blog-button'>Write Blog &rarr;</button>
                </Link>
            </div>
            <div className='image-section'>
                <img src={`${process.env.PUBLIC_URL}/images/write-blog.png`} alt="Write Blog Illustration" className='write-blog-image' />
            </div>
        </div>
    );
}

export default Write;
