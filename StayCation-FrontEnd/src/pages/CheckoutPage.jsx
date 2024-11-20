import React, { useContext } from 'react';
import { ShoppingCart } from "../components/ShoppingCart";
import { useCart } from "../contexts/cartContext";
import { useNavigate } from 'react-router-dom';
import './css/CheckoutPage.css';
import UserContext from '../contexts/userContext';

function CheckoutPage() {
  const { user, userId } = useContext(UserContext);
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const token = localStorage.getItem('token');

  const checkout = async () => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: userId,
          products: cart.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          })),
          totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      console.log('Order created successfully:', data);
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Error during checkout:', error.message);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <ShoppingCart />
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button onClick={checkout} className="checkout-button">Place Order</button>
      </div>
    </div>
  );
}

export default CheckoutPage;