

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserSidebar.module.css';

const UserSidebar = ({ userData, onLogout }) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.userInfo}>
                <h2>{userData.name}</h2>
            </div>
            <div className={styles.sidebar}>
            <div className={styles.userInfo}>
                <h2>{userData.name}</h2>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><Link to="/eventsee" className={styles.link}>Events</Link></li>
                    <li><Link to="/events" className={styles.link}>Create Event</Link></li>
                    <li><Link to="/user" className={styles.link}>Profile</Link></li>
                    <li><Link to="/contact" className={styles.link}>Contact</Link></li>
                    <li><button onClick={onLogout} className={styles.link}>Logout</button></li>
                </ul>
            </nav>
        </div>
        </div>
    );
};

export default UserSidebar;
