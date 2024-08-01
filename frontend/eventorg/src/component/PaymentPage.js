
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
    const location = useLocation();
    const { order, user } = location.state || {};
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => {
                    resolve(true);
                };
                script.onerror = () => {
                    resolve(false);
                };
                document.body.appendChild(script);
            });
        };

        const initiatePayment = async () => {
            if (!order || !user) {
                console.error('Order or user information is missing');
                return;
            }

            const scriptLoaded = await loadRazorpayScript();

            if (!scriptLoaded) {
                console.error('Razorpay SDK failed to load');
                return;
            }

            const options = {
                key: 'rzp_test_u7pnqOtOeC2KTz', 
                amount: order.amount,
                currency: order.currency,
                name: 'Event Booking',
                description: 'Book your event',
                order_id: order.id,
                handler: async function (response) {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    setPaymentStatus('success');

                   
                    const bookedCustomerData = {
                        eventId: order.receipt.split('_')[1], 
                        userId: user.id,
                        userName: user.name,
                        userEmail: user.email,
                        userContact: user.contact,
                        paymentId: response.razorpay_payment_id
                    };

                    try {
                        await axios.post('http://localhost:3005/booked-customers', bookedCustomerData);
                    } catch (error) {
                        console.error('Error saving booked customer data:', error);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.contact
                },
                theme: {
                    color: '#3399cc'
                },
                modal: {
                    ondismiss: function() {
                        setPaymentStatus('dismissed');
                    }
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        };

        initiatePayment();
    }, [order, user]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {paymentStatus === 'success' ? (
                <h2>Payment Successful!</h2>
            ) : (
                <h2>Processing Payment...</h2>
            )}
        </div>
    );
};

export default PaymentPage;
