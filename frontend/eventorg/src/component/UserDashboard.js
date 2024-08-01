
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminDashboard.module.css';

const AdminDashBoard = () => {
    const [events, setEvents] = useState([]);
    const [bookedCustomers, setBookedCustomers] = useState([]);

    useEffect(() => {
        fetchEvents();
        fetchBookedCustomers();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3005/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchBookedCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:3005/booked-customers');
            setBookedCustomers(response.data);
        } catch (error) {
            console.error('Error fetching booked customers:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3005/events/${id}`);
            fetchEvents(); 
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleEdit = (event) => {
    };

    return (
        <div className={styles.dashboard}>
            <h2>Admin Dashboard</h2>
            <div className={styles.section}>
                <h3>Events</h3>
                {events.length === 0 ? (
                    <p>No events available.</p>
                ) : (
                    events.map(event => (
                        <div key={event.id} className={styles.card}>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {event.time}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Ticketing:</strong> {event.ticketing}</p>
                            <p><strong>Price:</strong> ₹{event.price}</p>
                            <p><strong>Image:</strong> {event.image}</p>
                            <button onClick={() => handleEdit(event)}>Edit</button>
                            <button onClick={() => handleDelete(event.id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
            <div className={styles.section}>
                <h3>Booked Customers</h3>
                {bookedCustomers.length === 0 ? (
                    <p>No booked customers available.</p>
                ) : (
                    bookedCustomers.map(customer => (
                        <div key={customer.id} className={styles.card}>
                            <p><strong>Name:</strong> {customer.user_name}</p>
                            <p><strong>Email:</strong> {customer.user_email}</p>
                            <p><strong>Contact:</strong> {customer.user_contact}</p>
                            <p><strong>Event ID:</strong> {customer.event_id}</p>
                            <p><strong>Payment ID:</strong> {customer.payment_id}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDashBoard;
