import { createContext, useContext, useState, useEffect } from "react";

export const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) throw new Error('useBooking cannot be used outside a BookingContextProvider');

  return context;
};

const getTotalPrice = (bookings) => {
  let total = 0;
  bookings.forEach(item => {
    total += item.property.pricePerNight * item.nights;
  });
  return total;
};

const getTotalNights = (bookings) => {
  let total = 0;
  bookings.forEach(item => {
    total += item.nights;
  });
  return total;
};

const BookingContextProvider = ({ children }) => {

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('bookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  const totalNights = getTotalNights(bookings);
  const totalPrice = getTotalPrice(bookings);

  const addToBookings = (property, guests, nights) => {
    const itemRef = bookings.find(item => item.property._id === property._id);
    const newBookings = [...bookings];
    if (itemRef) {
      itemRef.guests = guests;
      itemRef.nights = nights;
    } else {
      newBookings.push({ property, guests, nights });
    }
    setBookings(newBookings);
  };

  const removeBooking = (propertyId) => {
    const newBookings = bookings.filter(item => item.property._id !== propertyId);
    setBookings(newBookings);
    localStorage.setItem('bookings', JSON.stringify(newBookings)); // Save to localStorage
  };

  const clearBookings = () => {
    setBookings([]);
    localStorage.removeItem('bookings'); // Clear from localStorage
  };

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const value = {
    bookings,
    totalNights,
    totalPrice,
    addToBookings,
    removeBooking,
    clearBookings
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContextProvider;