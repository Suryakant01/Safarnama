import React, { useEffect, useState } from 'react';
import { useFirebase } from "../context/firebase.context.jsx";
import { useNavigate } from 'react-router-dom';
import  Notification  from "./Notifications.components.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import '../components/CSS/Form.css';

const Form = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [state, setState] = useState('');
    const [article, setArticle] = useState('');
    const [destPic, setDestPic] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");


    const indianStates = [
        "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
        "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", 
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", 
        "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", 
        "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", 
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
        "Uttarakhand", "West Bengal"
    ];
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.setArticles(name, place, state, article, destPic)
            .then(() => {
                setNotificationMessage("Blog Added")
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000)
            })
            .catch(() => {
                setNotificationMessage("Sorry, Try Again")
                setShowNotification(true);
            })
    };

    console.log("loggin", firebase.isLoggedIn)
    useEffect(() => {
        if (!firebase.isLoggedIn) {
            setNotificationMessage("Please, Login First")
            // navigate("/login")
        }

    }, [firebase.isLoggedIn])

    return (
        <div className='container'>
            <Notification variant={"success"} show={showNotification} message={notificationMessage} onClose={() => setShowNotification(false)} />
            <form className='blog-form' onSubmit={handleSubmit}>
                <h2 className='fw-bolder'>
                    Share your Experience
                </h2>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='How should people know you?' required />
                <input type='text' value={place} onChange={(e) => setPlace(e.target.value)} placeholder='Beautiful Place You Travelled to..' required />
                
                <select className='selectState' value={state} onClick={() => {console.log(state)}} onChange={(e) => setState(e.target.value)} required>
                    <option value="" disabled>State it falls in..</option>
                    {indianStates.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>


                <textarea value={article} onChange={(e) => setArticle(e.target.value)} placeholder='Your Amazing experience!!!' required />
                
                <input type='file' id='file' onChange={(e) => setDestPic(e.target.files[0])} style={{ display: 'none' }} />
                <label htmlFor='file' className='custom-file-upload'>
                    Upload Travel Photos
                </label>
                {destPic && <span className='file-name'>{destPic.name}</span>}

                <button type='submit' className="share-button">Let the World Know 
                <FontAwesomeIcon icon={faShare} className="share-icon" />
                </button>
            </form>
        </div>
    );
};

export default Form;
