
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CreateOrder.module.css';

const CreateOrder = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/events/${eventId}`);
                setEvent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch event details:', error);
                setError('Failed to fetch event details');
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:3005/create-order', { eventId });
            const order = response.data;

            const options = {
                key: 'rzp_test_u7pnqOtOeC2KTz', 
                amount: order.amount,
                currency: order.currency,
                name: 'Event Booking',
                description: 'Book your event',
                order_id: order.id,
                handler: function (response) {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    navigate('/success'); 
                },
                prefill: {
                    name: 'Your Name',
                    email: 'Your Email',
                    contact: 'Your Phone Number'
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error('Error creating Razorpay order:', error);
            setError('Error creating Razorpay order');
        }
    };

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.createOrder}>
            <h2>Buy Ticket</h2>
            <div className={styles.eventDetails}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Ticketing:</strong> {event.ticketing}</p>
                <p><strong>Price:</strong> ₹{event.price}</p>
                <button onClick={handlePayment}>Proceed to Payment</button>
            </div>
        </div>
    );
};

export default CreateOrder;
