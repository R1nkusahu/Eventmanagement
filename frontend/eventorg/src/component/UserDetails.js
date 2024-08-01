import React, { useState } from 'react';
import styles from './Userdetals.module.css'
import EventList from './EventList';
import {Link} from 'react-router-dom'



const UserDetails = ({ userData }) => {
   
    return (
        <>
        <div className={styles.profileContainer}>
            <div className={styles.welcomeMessage}>
                <h1>Hello, {userData.firstname}!</h1>
            </div>
            <div className={styles.card}>
                <img 
                    src="https://via.placeholder.com/150" 
                    alt="Profile" 
                    className={styles.profileImage}
                />
                <div className={styles.details}>
                    <p className={styles.detail}>{`${userData.firstname} ${userData.lastname}`}</p>
                    <p className={styles.detail}>Email: {userData.email}</p>
                </div>
            </div>
        </div>
        
        </>
    );
};

export default UserDetails;
