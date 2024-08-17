import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../components/CSS/WriteSection.css';

gsap.registerPlugin(ScrollTrigger);

const Write = () => {
    const imageRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(imageRef.current, 
            { opacity: 0, y: 50 }, // Initial state
            { 
                opacity: 1, 
                y: 0, 
                duration: 2, // Adjust duration for longer animation
                ease: 'power2.inOut', // Adjust easing for smoother or more dynamic effect
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top 85%', // Adjust to trigger earlier or later
                    end: 'top 40%',   // Adjust to control when the animation ends
                    scrub: 1 // Adjust scrub value for more/less smoothness
                }
            }
        );
    }, []);

    return (
        <div className='write-blog-container'>
            <div className='text-section'>
                <h1>Want to tell about your journey??</h1>
                <Link to="/blog">
                    <button className='write-blog-button'>Write Blog &rarr;</button>
                </Link>
            </div>
            <div className='image-section'>
                <img 
                    ref={imageRef} 
                    src={`${process.env.PUBLIC_URL}/images/write-blog.png`} 
                    alt="Write Blog Illustration" 
                    className='write-blog-image' 
                />
            </div>
        </div>
    );
}

export default Write;
