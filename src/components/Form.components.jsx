import React, { useState } from 'react';
import { useFirebase } from "../context/firebase.context.jsx"
import '../components/CSS/Form.css';

const Form = ({ onSubmit }) => {

    const firebase = useFirebase();

    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [state, setState] = useState('');
    const [article, setArticle] = useState('');
    const [destPic, setDestPic] = useState([]);
    
    console.log("destPic",destPic)

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.setArticles(name, place, state, article, destPic)
            .then(()=> {
                console.log("Article added")
        })
    };

    return (
        <div className='container '>
            <form className='blog-form' onSubmit={handleSubmit}>
                <h2>
                    Share your Experience for making others journey incredible
                </h2>

                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />

                <input type='text' value={place} onChange={(e) => setPlace(e.target.value)} placeholder='Place' required />

                <input type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder='State' required />

                <textarea value={article} onChange={(e) => setArticle(e.target.value)} placeholder='Your Journey' required />
                
                <input type='file' onChange={(e) => setDestPic(e.target.value[0])} placeholder='Your Journey' multiple />

                <button type='submit'>Submit Blog</button>
            </form>
        </div>
    );
};

export default Form;