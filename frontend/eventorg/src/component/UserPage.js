

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetails from './UserDetails';
import EventList from './EventList';
import AdminDashBoard from './AdminDashBoard';
import Contactus from './Contactus';
import UserSidebar from './UserSidebar';
import styles from './UserPage.module.css';

const UserPage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        console.log('User data from localStorage:', user);
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                if (parsedUser && parsedUser.id) {
                    setUserData(parsedUser);
                } else {
                    console.error("Invalid user data:", parsedUser);
                    navigate('/login');  
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                navigate('/login'); 
            }
        } else {
            navigate('/login'); 
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <UserSidebar userData={userData} onLogout={handleLogout} />
            <div className={styles.content}>
                <UserDetails userData={userData} />
                
                
                {userData.isAdmin && (
                    <div>
                        <h2>Admin Dashboard</h2>
                        <AdminDashBoard />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPage;
