
// use client
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import './style/booking.css';

const Booking: FC = () => {
  const [bookings, setBookings] = useState<any[]>([]); // Specify the type of 'bookings'

  useEffect(() => {
    axios.get('http://localhost:8080/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the bookings!", error);
      });
  }, []);

  return (
    <div className="booking">
      <div className="card">
        <h3>Booking</h3>
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>{JSON.stringify(booking)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Booking;
