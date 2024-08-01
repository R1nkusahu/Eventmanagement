
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import styles from './Login.module.css';

const clientId = '560949330833-r8uiqgj9mprt8g59opjbveacl2kh0bhj.apps.googleusercontent.com';  

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
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
            const response = await axios.post('http://localhost:3005/login', formData);
            console.log("Login response:", response.data);
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/user');
            } else {
                console.error("Invalid user data in response:", response.data);
                alert("Invalid user data");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response ? error.response.data : 'Error logging in');
        }
    };

    const onGoogleSuccess = async (response) => {
        console.log('Google Login Success:', response);
        try {
            const res = await axios.post('http://localhost:3005/auth/google/callback', {
                token: response.credential,
            });
            console.log('Server response:', res);
            if (res.data.user) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/user');
            } else {
                console.error("Invalid user data in response:", res.data);
                alert("Invalid user data");
            }
        } catch (err) {
            console.error('Server error:', err);
        }
    };

    const onGoogleError = () => {
        console.log('Google Login failed');
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Login:</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>Login</button>
                </form>
                <div className={styles.orDivider}>or</div>
               <button><GoogleLogin
                    onSuccess={onGoogleSuccess}
                    onError={onGoogleError}
                /></button> 
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
