// PaymentComponent.js
"use client";

import React, { useState } from 'react';
import '../styles/payment.css';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const PaymentForm = ( { userId, bookingId }:any) => {
  const stripe :any= useStripe();
  const elements = useElements();

  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');


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
        userId: userId,
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
  return (
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
              placeholder="example@mail.com"
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
  );
};

const PaymentComponent = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentComponent;
