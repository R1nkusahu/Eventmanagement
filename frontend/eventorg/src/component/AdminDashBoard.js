
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const AdminDashBoard = () => {
    const [events, setEvents] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: '',
        image: ''
    });
    const [selectedMenu, setSelectedMenu] = useState('eventList');

    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
        fetchContacts();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3005/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:3005/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
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
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: event.date,
            time: event.time,
            location: event.location,
            price: event.price,
            image: event.image,
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await axios.put(`http://localhost:3005/events/${editingEvent.id}`, formData);
                setEditingEvent(null);
            }
            fetchEvents(); 
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleCreateEvent = () => {
        navigate('/event/form');
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case 'createEvent':
                return (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <h3>{editingEvent ? 'Edit Event' : 'Create Event'}</h3>
                        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                        <input type="date" name="date" placeholder="Date" value={formData.date} onChange={handleChange} required />
                        <input type="time" name="time" placeholder="Time" value={formData.time} onChange={handleChange} required />
                        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                        <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                        <input type="text" name="image" placeholder="Image" value={formData.image} onChange={handleChange} required />
                        <button type="submit">Save</button>
                        {editingEvent && <button type="button" onClick={() => setEditingEvent(null)}>Cancel</button>}
                    </form>
                );
            case 'eventList':
                return (
                    <>
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
                                    <p><strong>Price:</strong> ₹{event.price}</p>
                                    <p><strong>Image:</strong> {event.image}</p>
                                    <button onClick={() => handleEdit(event)}>Edit</button>
                                    <button onClick={() => handleDelete(event.id)}>Delete</button>
                                </div>
                            ))
                        )}
                    </>
                );
            case 'customersData':
                return (
                    <>
                        <h3>Contact Us Submissions</h3>
                        {contacts.length === 0 ? (
                            <p>No contact submissions available.</p>
                        ) : (
                            contacts.map(contact => (
                                <div key={contact.id} className={styles.card}>
                                    <h3>{contact.name}</h3>
                                    <p><strong>Email:</strong> {contact.email}</p>
                                    <p><strong>Message:</strong> {contact.message}</p>
                                    <p><strong>Submitted at:</strong> {new Date(contact.created_at).toLocaleString()}</p>
                                </div>
                            ))
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <ul>
                    <li className={styles.lis} onClick={() => setSelectedMenu('createEvent')}>Create Event</li>
                    <li  className={styles.lis} onClick={() => setSelectedMenu('eventList')}>Event List</li>
                    <li  className={styles.lis} onClick={() => setSelectedMenu('customersData')}>Customers Data</li>
                </ul>
            </div>
            <div className={styles.content}>
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashBoard;
