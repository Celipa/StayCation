import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [property, setProperty] = useState('');
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bookings', {
        property,
        guests,
        nights,
        totalPrice,
        checkIn,
        checkOut
      });
      console.log('Booking created:', response.data);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form fields for property, guests, nights, totalPrice */}
      <label>
        Check-In Date:
        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
      </label>
      <label>
        Check-Out Date:
        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
      </label>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;