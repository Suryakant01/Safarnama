import React, { useState } from 'react';
import { useFirebase } from "../context/firebase.context.jsx";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import {faShare} from '@fortawesome/free-solid-svg-icons'
import '../components/CSS/Form.css';

const Form = () => {
    const firebase = useFirebase();
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [state, setState] = useState('');
    const [article, setArticle] = useState('');
    const [destPic, setDestPic] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.setArticles(name, place, state, article, destPic)
            .then(() => {
                console.log("Article added");
            });
    };

    return (
        <div className='container'>
            <form className='blog-form' onSubmit={handleSubmit}>
                <h2 className='fw-bolder'>
                    Share your Experience
                </h2>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='How should people know you?' required />
                <input type='text' value={place} onChange={(e) => setPlace(e.target.value)} placeholder='Beautiful Place You Travelled to..' required />
                <input type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder='State it falls in..' required />
                <textarea value={article} onChange={(e) => setArticle(e.target.value)} placeholder='Your Amazing experience!!!' required />
                
                <input type='file' id='file' onChange={(e) => setDestPic(e.target.files[0])} style={{ display: 'none' }} />
                <label htmlFor='file' className='custom-file-upload'>
                    Upload Travel Photos
                </label>
                {destPic && <span className='file-name'>{destPic.name}</span>}

                <button type='submit' className="share-button">Let the World Know 
                
                </button>
            </form>
        </div>
    );
};

export default Form;
