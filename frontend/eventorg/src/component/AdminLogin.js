

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Adminlogreg.module.css';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3005/admin/login', formData);
            setMessage(response.data);
            navigate('/admin/dashboard');
        } catch (error) {
            setMessage(error.response?.data || 'An error occurred during login');
        }
    };

    return (
        <div className={styles.container}>
            <h2>Admin Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
