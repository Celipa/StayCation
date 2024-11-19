import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/BookingsPage.css";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = () => !!localStorage.getItem('token');

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/bookings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          throw new Error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="BookingsPage">
      <h1>Bookings Page</h1>
      {bookings.map((booking, index) => (
        <div key={index} className="booking">
          <h2>Booking Number: {booking._id}</h2>
          <ul>
            <li>
              <h3>{booking.property.name}</h3>
              <p>Price per Night: {booking.property.pricePerNight}</p>
              <p>Number of Nights: {booking.nights}</p>
              <p>Total Price: {booking.totalPrice} :-</p>
              <p>Check-In Date: {new Date(booking.checkIn).toLocaleDateString()}</p>
              <p>Check-Out Date: {new Date(booking.checkOut).toLocaleDateString()}</p>
            </li>
          </ul>
          <p className="total">Total Price: {booking.totalPrice} :-</p>
          <p className="total-items">Total Nights: {booking.nights}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingsPage;