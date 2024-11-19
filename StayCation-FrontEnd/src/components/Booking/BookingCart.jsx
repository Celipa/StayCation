import React from 'react';
import { BookingItem } from "./BookingItem";
import { Link } from "react-router-dom";
import { useBooking } from "../../contexts/bookingContext";
import './BookingCart.css';

export const BookingCart = ({ isCheckoutPage, setIsOpen, className, onCheckout }) => {

  const { bookings, totalPrice, clearBookings } = useBooking();

  return (
    <div className="cart">
      <div>
        { bookings.length < 1 && (
          <div className="cart-empty">
            <p>Your booking cart is empty</p>
          </div>
        )}
        <div className='Item'>
        { bookings.map(item => (
          <BookingItem key={`booking_${item.property._id}`} item={item} className={className} />
        ))}
        </div>
      </div>
      <div className={`cart-footer ${className}`}>
        <div className={`checkout-summery-box ${className}`}>
          <p className={`total-text ${className}`}>Totala Priset: <span className='total-price'>{ totalPrice }:-</span> </p>
          <p className={`total-text ${className}`}>Antal Dagar: <span className='total-price'>{ bookings.length }</span> </p>
          <p className='total-text'>Total Quantity: <span className='total-price'>{ bookings.reduce((total, item) => total + item.quantity, 0) }</span> </p>
          <div className='checkout-stuff'>
          { isCheckoutPage
            ? (
              <>
                <button onClick={clearBookings} className="cart-button">Clear Bookings</button>
                {isCheckoutPage && (
                <button onClick={onCheckout} className="place-order-button">
                  Boka Nu
                </button>
                )}
              </>
            )
            : <Link onClick={() => setIsOpen(false)} to="/checkout" className={`checkout-summery-box ${className}`}>Checkout</Link>
          }
          
        </div>
        </div>
      </div>
    </div>
  );
};