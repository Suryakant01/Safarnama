import React, { useState } from 'react';
import '../components/CSS/Form.css';

const Form = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [place, setPlace] = useState('');
    const [state, setState] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState('');

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name,
            age,
            place,
            state,
            blogContent,
            images,
            category,
        });
    };

    return (
        <form className='blog-form' onSubmit={handleSubmit}>
        <h2>
        Share your Experience for making others journey incredible
        </h2>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
            <input type='number' value={age} onChange={(e) => setAge(e.target.value)} placeholder='Age' required />
            <input type='text' value={place} onChange={(e) => setPlace(e.target.value)} placeholder='Place' required />
            <input type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder='State' required />
            <textarea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} placeholder='Your Journey' required />
            <input type='file' onChange={handleImageChange} placeholder='Your Journey' multiple  />
            <button type='submit'>Submit Blog</button>
        </form>
    );
};

export default Form;