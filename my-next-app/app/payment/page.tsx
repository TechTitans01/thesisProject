                                                  
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import '../styles/payment.css';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/authcontex/Authcontex';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const PaymentForm = ( { userId, bookingId }:any) => {
  const stripe :any= useStripe();
  const elements = useElements();

  const { user } = useAuth();
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const {token}=useAuth()
  const { logOut } = useAuth();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
};


  const handleSendSMS = async () => {
    try {
      const response = await axios.post('http://localhost:8080/send-sms', {
        to: "+21655600939",
        text: "congratulation your payment successfully"
      });
      alert('SMS sent successfully!');
    } catch (error) {
      console.error('Failed to send SMS:', error);
      alert('Failed to send SMS');
    }
  };
  

  const handleSubmit = () => {
    setLoading(true);
  
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
  
    axios
      .post('http://localhost:8080/api/payments/create', {
        amount: 1000,
        currency: 'usd',
        userId: user.id,
        bookingId: bookingId,
        email: email,
        country: country,
        nameCard:name
      })
      .then((response) => {
        const { clientSecret } = response.data;
  
        return stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: name,
              email: email,
              address: {
                country: country,
              },
            },
          },
        });
      })
      .then((result) => {
        if (result.error) {
          setError(result.error.message);
          setLoading(false);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            alert('Payment successful!');
            handleSendSMS()
            console.log(result)
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };
  return (<>
  <nav id="navBar" className='navbar-white'>
    <Image className="logo" src="/img/logotr.png" width={120} height={120} alt="dtg" quality={75} priority={false}/>
    <ul className='nav-links'>
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/contactus" className="active">Contact Us</a></li>
      
    </ul>
    {!token ? (
            <a href="/auth" className="register-btn">
             
              Register Now
            </a>
          ) : (
            <div className="toggle-container">
              <div className="toggle-option active">
                <img
                  className="noti"
                  src="https://th.bing.com/th/id/OIP.EkL3E_EYbt08OV84-Dm2GwAAAA?rs=1&pid=ImgDetMain"
                  alt="notification"
                />
              </div>
              <div className="toggle-option" onClick={toggleDropdown}>
                <img
                  className="usee"
                  src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
                  alt="User"
                />
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <a href="/editprofile">Edit Profile</a>
                    </li>
                   
                    <li>
                      <a href="/auth" onClick={()=>{logOut()}}>Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
    </nav>


    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Payment</h2>
        <div className="payment-form" >
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="email@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber" className="form-label">
              Card Number
            </label>
            <CardElement className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name on Card
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Country</label>
            <select id="country" className="form-inputdrop" onChange={(e) => setCountry(e.target.value)} value={country}>
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="BR">Brazil</option>
              <option value="JP">Japan</option>
              <option value="IT">Tunisie</option>
            </select>
          </div>
          <button type="submit" className="payment-button" disabled={!stripe || loading} onClick={()=>{handleSubmit()}}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
    </> );
};

const PaymentComponent = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentComponent;
