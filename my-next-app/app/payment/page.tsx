"use client";

import React, { useState } from 'react';
import '../styles/payment.css';

export default function PaymentComponent() {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your payment logic here
    console.log('Payment details:', {
      cardNumber,
      expirationDate,
      cvv,
      name,
    });
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Payment</h2>
        <form className="payment-form" onSubmit={handleSubmit}>
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
            <div className="card-number-input">
              <input
                type="text"
                id="cardNumber"
                className="form-input"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
              <div className="card-logos">
                <img src="https://www.svgrepo.com/show/328144/visa.svg" alt="Visa" />
                <img src="https://cdn.icon-icons.com/icons2/1186/PNG/512/1490135018-mastercard_82253.png" alt="Mastercard" />
                <img src="https://static.vecteezy.com/system/resources/previews/009/469/637/original/paypal-payment-icon-editorial-logo-free-vector.jpg" alt="American Express" />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expirationDate" className="form-label">
                Expiration Date
              </label>
              <input
                type="text"
                id="expirationDate"
                className="form-input"
                placeholder="MM/YY"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="form-input"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name on Card
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Country</label>
            <select id="country" className="form-inputdrop">
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
              <option value="TUN">Tunisie</option>
            </select>
          </div>
          <button type="submit" className="payment-button">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}