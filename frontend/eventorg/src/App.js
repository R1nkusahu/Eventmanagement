
import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './component/Home';
import Userlogin from './component/Userlogin';
import Events from './component/Events';
import About from './component/About';
import Login from './component/Login';
import SignupPage from './component/SignupPage';
import UserPage from './component/UserPage';
import EventForm from './component/EventForm';
import Admin from './component/Admin';
import AdminLogin from './component/AdminLogin';
import AdminRegister from './component/AdminRegister';
import AdminDashboard from './component/AdminDashBoard';
import CreateOrder from './component/CreateOrder';
import PaymentPage from './component/PaymentPage';
import EventSee from './component/EventSee';
import Contactus from './component/Contactus';
import './App.css';
import Evecr from './component/Evecr';
import UserDetails from './component/UserDetails';
import Cards from './component/Cards';
import AllCards from './component/AllCards';

function navigate(url) {
  window.location.href = url;
}

async function auth() {
  const response = await fetch('http://127.0.0.1:3000/request', { method: 'post' });
  const data = await response.json();
  console.log(data);
  navigate(data.url);
}

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

function App() {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadScript = async () => {
      const loaded = await loadRazorpayScript();
      if (loaded) {
        setRazorpayLoaded(true);
      } else {
        console.error('Failed to load Razorpay SDK');
      }
    };
    loadScript();
  }, []);

  if (loading) {
    return <Evecr />;
  }

  if (!razorpayLoaded) {
    return <div>Loading Your payment screen</div>; 
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/events' element={<Events />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Eventsee' element={<EventSee />} />
          <Route path='/contact' element={<Contactus />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='/about' element={<AllCards />} />

          <Route path='/admin' element={<Admin />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/admin/register' element={<AdminRegister />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/event/form' element={<EventForm />} />
          <Route path='/create-order/:eventId' element={<CreateOrder />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
