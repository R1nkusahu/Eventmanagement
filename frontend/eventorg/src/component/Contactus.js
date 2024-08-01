
import React, { useState } from 'react';
import axios from 'axios';
import styles from './ContactUs.module.css';

const Contactus = () => {
    const [contactDetails, setContactDetails] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3005/submit-contact', contactDetails);
            console.log('Contact submitted:', response.data);
            setContactDetails({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error submitting contact:', error);
        }
    };

    return (<>
        <div className={styles.contactUs}>
            <h2 className={styles.heading}>Contact Us</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div ><label className={styles.label}>
                    Name:
                    <input className={styles.input} type="text" name="name" value={contactDetails.name} onChange={handleChange} required />
                </label></div>  
               <div className={styles.formGroup}><label>
                    Email:
                    <input type="email" className={styles.input} name="email" value={contactDetails.email} onChange={handleChange} required />
                </label></div> 
                <div className={styles.formGroup}><label>
                    Message:
                    <textarea name="message" className={styles.textarea} value={contactDetails.message} onChange={handleChange} required />
                </label></div>
                <button type="submit"  className={styles.button}>Submit</button>
            </form>
         </div>
     
    </>
    );
};

export default Contactus;
