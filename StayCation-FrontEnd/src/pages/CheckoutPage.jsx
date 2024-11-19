import React, { useContext } from 'react' // import useContext
import { ShoppingCart } from "../components/ShoppingCart"
import { useCart } from "../contexts/cartContext"
import { useNavigate } from 'react-router-dom'
import './css/CheckoutPage.css'
import UserContext from '../contexts/userContext';

function CheckoutPage (){

  const { user, userId } = useContext(UserContext);
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  console.log(cart);
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const token = localStorage.getItem('token');
  console.log(token);
  const checkout = async () => {
        if (!!userId) {
          console.error('user ID is undefined');
          return;
        }

    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
        body: JSON.stringify({
          products: cart.map((item) => ({
            user: userId,
            productId: item.product._id,
            quantity: item.quantity,
          })),
        }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`Error: ${data.message}`); // Use server response for error message
      }
  
      const data = await response.json();
      console.log(data); // log the response data
      alert('Your order has been completed');
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="Checkout">
      <div className="CheckoutPage">
        <ShoppingCart isCheckoutPage onCheckout={checkout} />
        {/* <div className="CheckoutSummery">
        <div className="CheckoutSummery-container">
        <h1>Summery:</h1>
        <p>Number of items: {cart.length}</p>
        <p>Total Quantity: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
        <p>Total Price: {totalPrice} :-</p>
        <p>Inkl. Vat</p>
        </div>
      </div> */}
      </div>
    </div>
  )
}
export default CheckoutPage