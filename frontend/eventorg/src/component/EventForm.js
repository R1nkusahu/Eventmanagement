
import React, { useState } from 'react';
import axios from 'axios';
import styles from './EventForm.module.css';

const EventForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: ''
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (image) {
            data.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:3005/events', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response && response.data) {
                alert('Event created successfully');
            } else {
                console.error('Unexpected response structure:', response);
                alert('Error creating event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Error creating event');
        }
    };

    return (
        <div className={styles.eventFormContainer}>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit} className={styles.eventForm}>
                <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} required />
                <input type="date" name="date" placeholder="Event Date" value={formData.date} onChange={handleChange} required />
                <input type="time" name="time" placeholder="Event Time" value={formData.time} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Event Location" value={formData.location} onChange={handleChange} required />
                <input type="text" name="price" placeholder="Ticket Price" value={formData.price} onChange={handleChange} required />
                <input type="file" name="image" onChange={handleImageChange} />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;
