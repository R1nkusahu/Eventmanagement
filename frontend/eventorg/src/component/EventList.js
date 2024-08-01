


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './EventCard.module.css';

const EventCard = ({ event, onBuyTicket }) => {
    return (
        <div className={styles.card}>
            <div>
                <img src={`http://localhost:3005/${event.image}`} alt={event.title} className={styles.eventImage} />
            </div>
            <div className={styles.right}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Price:</strong> ₹{event.price}</p>
                <button onClick={() => onBuyTicket(event.id)} className={styles.button}>Buy Ticket</button>
            </div>
        </div>
    );
};

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3005/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleBuyTicket = async (eventId) => {
        try {
            console.log('Creating order for event:', eventId);
            const response = await axios.post('http://localhost:3005/create-order', { eventId });
            const order = response.data;
            console.log('Order created:', order);

            navigate('/payment', { state: { order, user } });
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
            alert('Oops! Something went wrong while creating the order.');
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLocationChange = (e) => {
        setFilterLocation(e.target.value);
    };

    const handleDateChange = (e) => {
        setFilterDate(e.target.value);
    };

    const filteredEvents = events.filter(event => {
        const matchesSearchTerm = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = event.location.toLowerCase().includes(filterLocation.toLowerCase());
        const matchesDate = filterDate ? event.date === filterDate : true;
        return matchesSearchTerm && matchesLocation && matchesDate;
    });

    const user = {
        id: 1,
        name: 'Your Name',
        email: 'your.email@example.com',
        contact: '1234567890'
    };

    return (
        <div className={styles.eventList}>
            <h2>All Events</h2>
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search by event name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchBar}
                />
                <input
                    type="text"
                    placeholder="Filter by location"
                    value={filterLocation}
                    onChange={handleLocationChange}
                    className={styles.filterInput}
                />
                <input
                    type="date"
                    value={filterDate}
                    onChange={handleDateChange}
                    className={styles.filterInput}
                />
            </div><div className={styles.crd}>
            {filteredEvents.length === 0 ? (
                <p>No events available.</p>
            ) : (
                filteredEvents.map(event => (
                 <EventCard key={event.id} event={event} onBuyTicket={handleBuyTicket} />  
                ))
            )}</div>
        </div>
    );
};

export default EventList;
