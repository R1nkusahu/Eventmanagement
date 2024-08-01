

import React, { useState } from 'react';
import axios from 'axios';
import styles from './Adminlogreg.module.css';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3005/admin/register', formData);
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response?.data || 'An error occurred during registration');
        }
    };

    return (
        <div className={styles.container}>
            <h2>Admin Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default AdminRegister;
